import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        let type = parseInt(params.type);
        let id = parseInt(params.id);
        let comments = await prisma.Comment.findMany({
            where: {
                type: type,
                id: id
            },
            orderBy: {
                commentTime: "desc"
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