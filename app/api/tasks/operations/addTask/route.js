// 添加新的测评任务
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const json = await request.json();
        const modelIds = json.modelIds;
        let modelList = []; // 所有模型组成的列表
        for (let key in modelIds) {
            const modelId = modelIds[key];
            const model = await prisma.model.findUnique({
                where: {
                    modelid: modelId,
                },
                include: {
                    label_list: true,
                },
            });
            modelList.push(model);
        }
        const task = await prisma.task.create({
            data: {
                userId: json.userId,
                taskName: json.taskName,
                questionType: json.questionType,
                modelIds: json.modelIds,
                models: {
                    connect: modelList.map((singlemodel) => ({
                        modelid: singlemodel.modelid,
                    })),
                },
                dataset: {
                    connect: {
                        id: json.datasetId,
                    },
                },
            },
        });

        const totalCount = await calculateTotalCount(json.datasetId);
        // 为每个模型在Score数据库中创建一个模型-数据集-测评类型的对象
        for (let i = 0; i < modelList.length; i++) {
            const score = await prisma.score.create({
                data: {
                    taskId: task.id,
                    scoreType: json.questionType,
                    modelId: modelList[i].modelid,
                    datasetId: json.datasetId,
                    correctCount: 0,
                    totalCount: totalCount,
                },
            });
            // 再将这个条目的id加入到task的modelscoreIdjson中
            task.modelscoreIdjson[modelList[i].modelid] = score.id;
        }

        // 更新task的modelscoreIdjson和总条目数totalCount
        const updated_task = await prisma.task.update({
            where: {
                id: task.id,
            },
            data: {
                modelscoreIdjson: task.modelscoreIdjson,
                // totalCount: totalCount,
            },
        });

        return new NextResponse(JSON.stringify(updated_task), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 计算数据集datasetId中的数据条目数
async function calculateTotalCount(datasetId) {
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
    else {
        totalCount = dataset.ShortAnswerQuestions.length;
    }
    console.log(totalCount);
    return totalCount;
}