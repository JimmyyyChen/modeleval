import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// delete a task
export async function DELETE(request, { params }) {
  const taskId = parseInt(params.id);
  try {
    const task = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return new NextResponse(JSON.stringify(task), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse.json({ error: error.message }, { status: 500 });
  }
}
