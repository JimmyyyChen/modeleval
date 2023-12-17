import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    try {
        const json = await request.json();
        const modelIds = json.modelIds;
        const modelIdOne = Object.values(modelIds)[0];
        const modelIdTwo = Object.values(modelIds)[1];
        // 在Task的model中新建两个任务，并将二者关联为对抗性评测
        const taskOne = await prisma.task.create({
            data: {
                userId: json.userId,
                taskName: json.taskName,
                questionType: 3,
                modelIds: {"0": modelIdOne},
                models: {
                    connect: {
                        modelid: modelIdOne,
                    },
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
        const taskTwo = await prisma.task.create({
            data: {
                userId: json.userId,
                taskName: json.taskName,
                questionType: 3,
                modelIds: {"0": modelIdTwo},
                models: {
                    connect: {
                        modelid: modelIdTwo,
                    },
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
        const adversarialTask = await prisma.adversarial.create({
            data: {
                userId: json.userId,
                taskName: json.taskName,
                datasetId: json.datasetId,
                modelIds: modelIds,
                taskOneId: taskOne.id,
                taskTwoId: taskTwo.id,
            }
        });
        console.log(adversarialTask);
        return new NextResponse(JSON.stringify(adversarialTask), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}