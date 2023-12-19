// 开始评测任务
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getModelAnswer } from "../../../api";

export async function POST(request, { params }) {
    try {
        const adId = parseInt(params.id);
        const adversarialTask = await prisma.adversarial.findUnique({
            where: {
                id: adId,
            },
        });
        // 找到对抗性任务下的所有Task中对应的任务
        let allTasks = await prisma.task.findMany({
            where: {
                id: {
                    in: Object.values(adversarialTask.taskJson),
                },
            },
            include : {
                dataset: {
                    include: {
                        ShortAnswerQuestions: true,
                    },
                },
            },
        });
        const dataset = await prisma.dataset.findUnique({
            where: {
                id: adversarialTask.datasetId,
            },
            include : {
                ShortAnswerQuestions: true,
            },
        });
        // 如果数据集已经全部回答完成，直接返回
        if (allTasks[0].progress == dataset.ShortAnswerQuestions.length) {
            return new NextResponse("该对抗性评测已经完成", {
                status: 201,
                headers: { "Content-Type": "application/json" },
            });
        }
        // 根据allTasks中每个task的信息，列出模型列表
        let modelList = [];
        for (let i = 0; i < allTasks.length; i++) {
            const models = await prisma.model.findUnique({
                where: {
                    modelid: Object.values(allTasks[i].modelIds)[0],
                },
            });
            modelList.push(models);
        }
        // 依次对每个任务进行一次测评
        for (let j = 0; j< allTasks.length; j++) {
            const nowShortAnswerQuestion = dataset.ShortAnswerQuestions[allTasks[j].progress];
            const modelAnswer = await getModelAnswer(modelList[j].modelName, nowShortAnswerQuestion.question);
            // 更新answerJson，将新的答案添加进去
            let answerjson = allTasks[j].answerjson;
            // 如果是第一次运行，需要建立一个空的json
            if (Object.keys(answerjson).length == 0) {
                answerjson[modelList[j].modelid] = {};
            }
            answerjson[modelList[j].modelid][parseInt(allTasks[j].progress)] = modelAnswer;
            allTasks[j].progress += 1;
        }
        // 更新allTasks对象数组中所有对象在task数据库中的信息，然后将模型的回答组成json返回给前端
        for (let k = 0; k < allTasks.length; k++) {
            const nouseOne = await prisma.task.update({
                where: {
                    id: allTasks[k].id,
                },
                data: {
                    progress: allTasks[k].progress,
                    answerjson: allTasks[k].answerjson,
                },
            });
        }

        // 使用回调函数，创建一个Json对象，键是模型的Id,值是模型的回答
        const responseAnswer =  allTasks.reduce((obj, cur) => {
            obj[Object.values(cur.modelIds)[0]] = cur.answerjson[Object.values(cur.modelIds)[0]][cur.progress - 1];
            return obj;
        }, {});

        return new NextResponse(JSON.stringify(responseAnswer), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}