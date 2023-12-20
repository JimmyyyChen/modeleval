// 开始评测任务
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Worker } from "worker_threads";

export async function POST(request, { params }) {
    try {
        let id = parseInt(params.id);
        // 获取指定id的任务
        const task = await prisma.task.findUnique({
            where: {
                id: id,
            },
            include: {
                dataset: {
                    include: {
                        ChoiceQuestions: {
                            include: {
                                choices: true,
                            },
                        },
                        ShortAnswerQuestions: true,
                    },
                },
                models: true,
            },
        });
        // 更新task的开始状态
        await prisma.task.update({
            where: {
                id: id,
            },
            data: {
                state: 1,
            },
        });

        // 创建一个子线程单独处理与模型的交互工作，本POST处理函数立即返回
        const worker = new Worker("./app/api/tasks/apiworker.js");
        worker.postMessage(task.id);

        return new NextResponse(JSON.stringify(true), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}