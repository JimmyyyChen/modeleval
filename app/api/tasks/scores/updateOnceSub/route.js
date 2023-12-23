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
        let score = {}; // 返回值
        const _totalCount = task.dataset.ShortAnswerQuestions.length;
        let _progress;
        const modelIds = Object.keys(json.judge)
        for (let i=0;i<modelIds.length;i++){ // 遍历该主观任务的所有被评测模型
            const modelId = modelIds[i];
            const scoreId = task.modelscoreIdjson[modelId];
            const scoreItem = await prisma.score.findUnique({ 
                where:{
                    id: scoreId,
                }
            });
            _progress = scoreItem.progress;
            // 如果该模型的该条目还没有被判定过
            if (task.answerjson[modelId]["answers"][json.index]["isCorrect"] == undefined) {
                if (json.judge[modelId] == true) {
                    scoreItem.correctCount += 1;
                    task.answerjson[modelId]["answers"][json.index]["isCorrect"] = true;
                }
                else{
                    task.answerjson[modelId]["answers"][json.index]["isCorrect"] = false;
                }
                scoreItem.progress += 1;
            }
            // 若已经判定过，需要修改
            else if (task.answerjson[modelId]["answers"][json.index]["isCorrect"] == true) {
                if (json.judge[modelId] == false) {
                    scoreItem.correctCount -= 1;
                    task.answerjson[modelId]["answers"][json.index]["isCorrect"] = false;
                }
            }
            else if (task.answerjson[modelId]["answers"][json.index]["isCorrect"] == false) {
                if (json.judge[modelId] == true) {
                    scoreItem.correctCount += 1;
                    task.answerjson[modelId]["answers"][json.index]["isCorrect"] = true;
                }
            }
            if (scoreItem.progress == scoreItem.totalCount) {  // 如果已经全部判定完毕 
                scoreItem.score = scoreItem.correctCount / scoreItem.totalCount;
                score[modelId] = scoreItem.score;
                // 更新task数据库中对应的字段
                task.scoresjson[modelId] = scoreItem.score;
                // 更新score数据库中的score字段
                await prisma.score.update({
                    where:{
                        id:scoreItem.id,
                    },
                    data:{
                        score: scoreItem.score,
                    }
                });
            }
            // 更新常规数据回score数据库
            await prisma.score.update({
                where:{
                    id:scoreItem.id,
                },
                data:{
                    progress: scoreItem.progress,
                    correctCount: scoreItem.correctCount,
                }
            });
            // 把answerjson更新回task数据库
            await prisma.task.update({
                where:{
                    id: task.id,
                },
                data:{
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
    }   catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}