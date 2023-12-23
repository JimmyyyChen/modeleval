import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        const json = await request.json();
        const task = await prisma.task.findUnique({
            where: {
                id: json.id,
            },
            include : {
                dataset: {
                    include: {
                        ShortAnswerQuestions: true,
                    },
                },
            }
        });
        let score = {};
        const _totalCount = task.dataset.ShortAnswerQuestions.length;
        const _progress = json.index;
        const modelIdList = Object.values(task.modelIds);
        // 遍历该任务中的每个模型，依次更新对应score的条目
        for (let i=0;i<modelIdList.length;i++){
            const modelId = modelIdList[i];
            const scoreId = task.modelscoreIdjson[modelId];
            const scoreItem = await prisma.score.findUnique({
                where: {
                    id: scoreId, 
                }
            });
            const rankInList = json.rank.indexOf(modelId); // 在用户传入的rank中寻找模型排在第几位
            const scorePerRound = json.rank.length - rankInList - 1; // 计算模型在本轮投票中赢得的分数
            // 需要检测这条数据是否已经被计算过分数
            if (task.answerjson[modelId]["answers"][json.index]["rank"] == undefined) {
                scoreItem.correctCount += scorePerRound
                task.answerjson[modelId]["answers"][json.index]["rank"] = rankInList + 1;
                scoreItem.progress += 1;
            }
            else {
                const previousRank = task.answerjson[modelId]["answers"][json.index]["rank"];
                const previousScorePerRound = json.rank.length - previousRank;
                scoreItem.correctCount -= previousScorePerRound;
                scoreItem.correctCount += scorePerRound;
                task.answerjson[modelId]["answers"][json.index]["rank"] = rankInList + 1;
            }

            if (scoreItem.progress == scoreItem.totalCount) { // 说明当前是对抗性评测最后一套数据，该计算得分了
                scoreItem.score = scoreItem.correctCount / (scoreItem.totalCount * (modelIdList.length-1) )
                score[modelId] = scoreItem.score; // 返回变量
                task.scoresjson[modelId] = scoreItem.score; // 更新task中对应的score
                // 更新score中的score字段
                await prisma.score.update({
                    where: {
                        id: scoreItem.id,
                    },
                    data: {
                        score : scoreItem.score,
                    }
                });
            }
            // 更新score中的条目
            await prisma.score.update({
                where: {
                    id: scoreItem.id,
                },
                data: {
                    correctCount: scoreItem.correctCount, 
                    progress: scoreItem.progress, 
                }
            });
            // 更新task中的常规条目
            await prisma.task.update({
                where: {
                    id: task.id,
                },
                data: {
                    answerjson: task.answerjson,
                    scoresjson: task.scoresjson,
                }
            });
        }
        
        const returnValue = {
            "totalCount": _totalCount,
            "progress": _progress,
            "score": task.scoresjson,
        }
        return new NextResponse(JSON.stringify(returnValue), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}