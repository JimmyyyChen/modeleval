import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // 获取request中的userId
    const userId = params.userId;
    const allTasks = await prisma.task.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        modelIds: true,
        dataset: true
      },
      where: {
        userId: userId,
      }
    });
    return new NextResponse(JSON.stringify(allTasks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse.json({ error: error.message }, { status: 500 });
  }
}