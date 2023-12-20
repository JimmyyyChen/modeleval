import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, response) {
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
        let score = {}; // 返回值
        const modelIds = Object.keys(json.judge)
        for (let i=0;i<modelIds.length;i++){ // 遍历该主观任务的所有被评测模型
            const modelId = modelIds[i];
            const scoreId = task.modelscoreIdjson[modelId];
            const scoreItem = await prisma.score.findUnique({ 
                where:{
                    id: scoreId,
                }
            });
            // 如果模型在该条数据上的回答是正确的，则正确题目数+1
            if (json.judge[modelId] == true) {
                scoreItem.correctCount += 1;
            }
            scoreItem.progress += 1;
            if (scoreItem.progress == scoreItem.totalCount) {  // 如果已经全部判定完毕 
                scoreItem.score = scoreItem.correctCount / scoreItem.totalCount;
                score[modelId] = scoreItem.score;
                // 更新task数据库中对应的字段
                task.scoresjson[modelId] = scoreItem.score;
                // 更新score数据库中的score字段
                const _ = await prisma.score.update({
                    where:{
                        id:scoreItem.id,
                    },
                    data:{
                        score: scoreItem.score,
                    }
                });
            }
            // 更新回score数据库
            const updated_score = await prisma.score.update({
                where:{
                    id:scoreItem.id,
                },
                data:{
                    progress: scoreItem.progress,
                    correctCount: scoreItem.correctCount,
                }
            });
        }
        // 如果全部测评完，再更新task数据库
        if (_progress + 1 == _totalCount) {
            const updated_task = await prisma.task.update({
                where: {
                    id: task.id
                },
                data:{
                    scoresjson: task.scoresjson,
                }
            });
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
    }   catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}