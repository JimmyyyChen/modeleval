// 获取某个模型在某个数据集上的最高得分
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    try {
        const json = await request.json();
        const modelId = json.modelId;
        const datasetId = json.datasetId;
        // 在Score数据库中寻找modelId字段、datasetId字段对应的得分最高的记录
        const score = await prisma.score.findFirst({
            where: {
                mainModelId: modelId,
                datasetId: datasetId,
                // scoreType应该为0或者1
                scoreType: {
                    in: [0, 1],
                }
            },
            orderBy: {
                score: "desc",
            },
        });
        // 返回得分
        return new NextResponse(JSON.stringify(score.score), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}