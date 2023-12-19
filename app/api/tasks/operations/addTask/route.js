// 添加新的测评任务
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { calculateTotalCount } from "../../adversarial/addAd/route";

export async function POST(request) {
    try {
        const json = await request.json();
        const modelIds = json.modelIds;
        let modelLists = []; // 所有模型组成的列表
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
            modelLists.push(model);
        }
        const task = await prisma.task.create({
            data: {
                userId: json.userId,
                taskName: json.taskName,
                questionType: json.questionType,
                modelIds: json.modelIds,
                models: {
                    connect: modelLists.map((singlemodel) => ({
                        modelid: singlemodel.modelid,
                    })),
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
        const totalCount = await calculateTotalCount(json.datasetId);
        // 为每个模型在Score数据库中创建一个模型-数据集-测评类型的对象
        for (let i = 0; i < modelLists.length; i++) {
            const score = await prisma.score.create({
                data: {
                    taskId: task.id,
                    scoreType: json.questionType,
                    mainModelId: modelLists[i].modelid,
                    datasetId: json.datasetId,
                    correctCount: 0,
                    totalCount: totalCount,
                },
            });
        }
        return new NextResponse(JSON.stringify(task), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}