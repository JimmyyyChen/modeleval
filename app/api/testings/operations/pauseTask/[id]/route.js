// 实现评测任务的暂停效果
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    const taskId = parseInt(params.id);
    try {
        const task = await prisma.testing.update({
            where: {
                id: taskId,
        }
        });
        
        task.state = 2;

        return new NextResponse(JSON.stringify(task), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}