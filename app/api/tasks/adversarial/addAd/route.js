import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    try {
        const json = await request.json();
        const modelIdsJson = json.modelIds;
        // modelIdsJson是一个Json对象，包含多个模型的id（Json对象的值），需要讲Id解析出来
        const modelIds = Object.values(modelIdsJson);
        let taskId = [];
        // 遍历modelIds,为其中的每个模型都创建一个在数据集上的新任务，加入到Task数据库中，并将taskId保存
        for (let i = 0; i < modelIds.length; i++) {
            const task = await prisma.task.create({
                data: {
                    userId: json.userId,
                    taskName: json.taskName,
                    questionType: 2,
                    modelIds: {"0": modelIds[i]},
                    models: {
                        connect: {
                            modelid: modelIds[i],
                        },
                    },
                    dataset: {
                        connect: {
                            id: json.datasetId,
                        },
                    },
                    state: 0,
                    progress: 0.0,
                },
            });
            taskId.push(task.id);
        }
        // 将taskId中的所有值转换为Json对象的值，键为顺序数字字符串，以便存入数据库
        taskId = taskId.reduce((obj, cur, index) => {
            obj[index] = cur;
            return obj;
        }, {});
        console.log(taskId);

        const adversarialTask = await prisma.adversarial.create({
            data: {
                userId: json.userId,
                taskName: json.taskName,
                datasetId: json.datasetId,
                modelIds: modelIdsJson,
                taskJson: taskId
            }
        });
        
        // 每两个模型要创建一个Score对象，存储在数据库中
        for (let i = 0; i < modelIds.length; i++) {
            for (let j = i + 1; j < modelIds.length; j++) {
                const totalCount = await calculateTotalCount(json.datasetId);
                const score = await prisma.score.create({
                    data: {
                        adversarialId: adversarialTask.id,
                        scoreType:2,
                        mainModelId: modelIds[i],
                        datasetId: json.datasetId,
                        adModelId: modelIds[j],
                        correctCount: 0,
                        totalCount: totalCount,
                    },
                });
            }
        }

        return new NextResponse(JSON.stringify(adversarialTask), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 计算数据集datasetId中的数据条目数
export async function calculateTotalCount(datasetId) {
    const dataset = await prisma.dataset.findUnique({
        where: {
            id: datasetId,
        },
        include: {
            ChoiceQuestions: true,
            ShortAnswerQuestions: true,
        }
    });
    let totalCount = 0;
    if (dataset.questionType == 0) {
        totalCount = dataset.ChoiceQuestions.length;
    }
    else if (dataset.questionType == 1) {
        totalCount = dataset.ShortAnswerQuestions.length;
    }
    return totalCount;
}