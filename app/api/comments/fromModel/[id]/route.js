import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{ params }) {
  try {
    const type = 0; // 0表示model,1表示dataset
    const modelId = parseInt(params.id);

    const comments = await prisma.comment.findMany({
      where: {
        type: type,
        modelId: modelId,
      },
      orderBy: {
        commentTime: "desc",
      },
    });
    return new NextResponse(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse.json({ error: error.message }, { status: 500 });
  }
}
