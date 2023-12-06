// 添加新的测评任务
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    try {
        const json = await request.json();
        const datasetId = json.datasetId;
        // 获取数据库中datasetId对应的dataset对象
        const dataset = await prisma.dataset.findUnique({
            where: {
                id: datasetId,
            },
        });
        json.dataset = dataset; // 原request中没有dataset, 而task表需要dataset这个字段
        // 获取数据库中与json的modelIds对应的所有模型对象
        const modelIds = json.modelIds;
        let models = [];
        for (let i=0;i < modelIds.length;i++) {
            const model = await prisma.model.findUnique({
                where: {
                    modelid: modelIds[i],
                },
            });
            models.push(model);
        }
        json.models = models; // 原request中没有models, 而task表需要models这个字段
        // 添加一个null的endTime
        json.endTime = null;
        // 添加一个not started的状态state
        json.state = 0
        // 添加一个progress进度为0
        json.progress = 0.0;
        
        const testing = await prisma.task.create({
            data: json,
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