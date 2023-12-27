import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const type = 1; // 0表示model,1表示dataset,2表示user,3表示task
    const datasetId = parseInt(params.id);

    const comments = await prisma.comment.findMany({
      where: {
        type: type,
        datasetId: datasetId,
      },
      orderBy: {
        commentTime: "desc",
      },
      include: {
        user: true,
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
