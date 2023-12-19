import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    try {
        const json = await request.json();
        const adId = json.adId;
        // 在Adversarial数据库中寻找adId字段对应的记录,并获取该对抗性任务所关联的datasetId
        const adversarialTask = await prisma.adversarial.findUnique({
            where: {
                id: adId,
            },
        });
        const datasetId = adversarialTask.datasetId;
        // 遍历rankList，每次更新Score数据库中对应记录的correcCount和totalCount
        const rankList = Object.values(json.adResult);
        for (let i = 0; i < rankList.length; i++) {
            let rank = rankList[i];
            for (let j = 0; j < rank.length; j++) {
                for (let k = 0; k < rank.length; k++) {
                    let scoreJK = await prisma.score.findMany({
                        where: {
                            datasetId: datasetId,
                            mainModelId: rank[j],
                            adModelId: rank[k],
                        },
                    });
                    // 因为main和ad的顺序问题，scoreJK可能为空；我们只寻找符合Score中对应记录的模型顺序的记录
                    if (scoreJK.length != 0) {
                        let correctCount = scoreJK[0].correctCount;
                        let totalCount = scoreJK[0].totalCount;
                        // 如果j的得分比k高，那么j的得分就加一
                        if (j < k) {
                            correctCount += 1;
                        }
                        // 总数加一
                        totalCount += 1;
                        // 更新数据库
                        await prisma.score.update({
                            where: {
                                id: scoreJK[0].id,
                            },
                            data: {
                                correctCount: correctCount,
                                totalCount: totalCount,
                            },
                        });
                    }
                }
            }
        }
        // 遍历每一条排名后，计算最终得分
        let adScores = {};
        const allAdScores = await prisma.score.findMany({
            where: {
                adversarialId: adId,
            },
        });
        for (let m = 0;m<Object.values(adversarialTask.modelIds).length;m++) {
            const modelId = Object.values(adversarialTask.modelIds)[m];
            let correctCount = 0;
            let totalCount = 0;
            for (let n = 0; n < allAdScores.length; n++) {
                const adScoreRecord = allAdScores[n];
                if (adScoreRecord.mainModelId == modelId) {
                    correctCount += adScoreRecord.correctCount;
                    totalCount += adScoreRecord.totalCount;
                }
                else if (adScoreRecord.adModelId == modelId) {
                    correctCount += adScoreRecord.totalCount - adScoreRecord.correctCount;
                    totalCount += adScoreRecord.totalCount;
                }
            }
            adScores[modelId] = correctCount / totalCount;
        }
        return new NextResponse(JSON.stringify(adScores), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}