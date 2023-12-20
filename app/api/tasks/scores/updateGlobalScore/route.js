// 更新模型的平均得分（Model中的字段ScoreObj和ScoreSub）
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const json = await request.json();
        const modelIdJson = json.modelIds;
        const model = await prisma.model.findMany({
            where: {
                modelid: {
                    in: Object.values(modelIdJson),
                }
            },
        });
        let ReturnScoreObj = {};
        let ReturnScoreSub = {};
        for (let i = 0;i<model.length;i++) {
            // 查找该模型在Score数据库中的所有记录
            // 1 更新客观题得分ScoreObj
            let score_obj;
            const scoreObjs = await prisma.score.findMany({
                where: {
                    mainModelId: model[i].modelid,
                    scoreType: 0,
                    progress: { // 要求评测任务已经开始（可以未完成）
                        not: 0,
                    }
                },
            });
            if (scoreObjs.length == 0) { // 代表该模型没有已经完成的客观题评测
                ReturnScoreObj[model[i].modelid] = 0;
            }
            else {
                let correctCount = 0;
                let totalCount = 0;
                for (let j = 0; j < scoreObjs.length; j++) {
                    const scoreObj = scoreObjs[j];
                    correctCount += scoreObj.correctCount;
                    totalCount += scoreObj.progress;
                }
                score_obj = correctCount / totalCount;
                ReturnScoreObj[model[i].modelid] = score_obj;
            }

            // 2. 更新主观题得分ScoreSub
            let score_sub;
            const scoreSubs = await prisma.score.findMany({
                where: {
                    mainModelId: model[i].modelid,
                    scoreType: 1,
                    progress: { // 要求评测任务已经开始（可以未完成）
                        not: 0,
                    }
                },
            });
            if (scoreSubs.length == 0) {
                ReturnScoreSub[model[i].modelid] = 0;
            }
            else {
                let correctCount = 0;
                let totalCount = 0;
                for (let j = 0; j < scoreSubs.length; j++) {
                    const scoreSub = scoreSubs[j];
                    correctCount += scoreSub.correctCount;
                    totalCount += scoreSub.progress;
                }
                score_sub = correctCount / totalCount;
                ReturnScoreSub[model[i].modelid] = score_sub;
            }

            // 3. 在模型数据库中更新得分
            await prisma.model.update({
                where: {
                    modelid: model[i].modelid,
                },
                data: {
                    ScoreObj: score_obj,
                    ScoreSub: score_sub,
                },
            });
        }
        const returnValue = {
            "ScoreObj": ReturnScoreObj,
            "ScoreSub": ReturnScoreSub,
        }
        return new NextResponse(JSON.stringify(returnValue), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}