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
        const taskOne = await prisma.task.findUnique({
            where: {
                id: adversarialTask.taskOneId,
            },
        });
        const taskTwo = await prisma.task.findUnique({
            where: {
                id: adversarialTask.taskTwoId,
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
        const modelOne = await prisma.model.findUnique({
            where: {
                modelid: Object.values(taskOne.modelIds)[0],
            },
        });
        const modelTwo = await prisma.model.findUnique({
            where: {
                modelid: Object.values(taskTwo.modelIds)[0],
            },
        });
        const nowShortAnswerQuestion = dataset.ShortAnswerQuestions[taskOne.progress];
        const answerOne = await getModelAnswer(modelOne.modelName, nowShortAnswerQuestion.question);
        // 更新answerJson，将新的答案添加进去
        let answerjsonOne = taskOne.answerjson;
        // 如果是第一次运行，需要建立一个空的json
        if (Object.keys(answerjsonOne).length == 0) {
            answerjsonOne[modelOne.modelid] = {};
        }
        console.log(modelOne.modelid)
        console.log(answerjsonOne);
        answerjsonOne[modelOne.modelid][parseInt(taskOne.progress)] = answerOne;
        taskOne.progress += 1;

        const answerTwo = await getModelAnswer(modelTwo.modelName, nowShortAnswerQuestion.question);
        let answerjsonTwo = taskTwo.answerjson;
        // 如果是第一次运行，需要建立一个空的json
        if (Object.keys(answerjsonTwo).length == 0) {
            answerjsonTwo[modelTwo.modelid] = {};
        }
        answerjsonTwo[modelTwo.modelid][parseInt(taskTwo.progress)] = answerTwo;
        taskTwo.progress += 1;

        console.log(answerOne);
        console.log(answerTwo);
        // 更新taskOne和taskTwo在task数据库中的信息，然后将模型的回答组成json返回给前端
        const nouseOne = await prisma.task.update({
            where: {
                id: taskOne.id,
            },
            data: {
                progress: taskOne.progress,
                answerjson: answerjsonOne,
            },
        });
        const nouseTwo = await prisma.task.update({
            where: {
                id: taskTwo.id,
            },
            data: {
                progress: taskTwo.progress,
                answerjson: answerjsonTwo,
            },
        });
        // 返回的键值对中,键是模型的Id,值是模型的回答
        let modeloneid = modelOne.modelid;
        let modeltwoid = modelTwo.modelid;
        const responseAnswer = {
            [modeloneid]: answerOne,
            [modeltwoid]: answerTwo,
        };
        return new NextResponse(JSON.stringify(responseAnswer), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}