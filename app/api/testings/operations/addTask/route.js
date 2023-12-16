// 添加新的测评任务
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const json = await request.json();
        // const datasetId = json.datasetId;
        // 获取数据库中datasetId对应的dataset对象
        // const dataset = await prisma.dataset.findUnique({
        //     where: {
        //         id: datasetId,
        //     },
        // });
        // json.dataset = dataset; // 原request中没有dataset, 而task表需要dataset这个字段
        // 获取数据库中与json的modelIds对应的所有模型对象, modelIds是一个Json对象，需要遍历json对象的键值对，键为序号，值为模型id
        const modelIds = json.modelIds;
        let modelLists = [];
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

        const testing = await prisma.task.create({
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
        return new NextResponse(JSON.stringify(testing), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}