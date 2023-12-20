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
        const _totalCount = task.dataset.ShortAnswerQuestions.length;
        const _progress = json.index;
        let score = {};
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
            scoreItem.correctCount += scorePerRound
            scoreItem.progress += 1;
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
            if (_progress + 1 == _totalCount ){
                prisma.task.update({
                    where: {
                        id: task.id
                    },
                    data:{
                        scoresjson: task.scoresjson,
                    }
                });
            }
        }
        
        const returnValue = {
            "totalCount": _totalCount,
            "progress": _progress,
            "score": score,
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