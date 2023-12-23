// 实现评测任务的暂停效果
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// const amqp = require('amqplib');

// const amqpUrl = 'amqp://localhost'; // RabbitMQ服务器地址
// const queue = 'task_control'; // 队列名称

export async function POST(request, { params }) {
    const taskId = parseInt(params.id);
    try {
        // const connection = await amqp.connect(amqpUrl);
        // const channel = await connection.createChannel();

        // await channel.assertQueue(queue, { durable: false });

        // const message = JSON.stringify({"taskId":taskId, "state":"pause"});

        // channel.sendToQueue(queue, Buffer.from(message));
        // console.log(`[x] Sent message to "${queue}": ${message}`);

        // await channel.close();
        // await connection.close();
        // 将状态更新回数据库
        const updated_task = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                state: 2,
            },
        });
        return new NextResponse(JSON.stringify(updated_task), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}