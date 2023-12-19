import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { getUsername } from "@/lib/getUsername";
export async function POST(request, { params }) {
    let { userId } = auth()
    //userId = "user_2YYm4PPqCJvDTh8umSpl6r1N6dZ"
    let username = "Administrator";
    if (userId == null) userId = "Administrator";
    else {
        username = await getUsername(userId);
        if (username == null) username = "Administrator";
    }
    try {
        let comment = await prisma.comment.findUnique({
            where: {
                id: parseInt(params.id)
            },
        });
        if (!comment) {
            return new NextResponse(JSON.stringify({ success: false, message: "comment not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (comment.userId != userId) {
            return new NextResponse(JSON.stringify({ success: false, message: "permission denied" }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            });
        }
        const requestBody = await request.text();
        let body = JSON.parse(requestBody);
        let content = body["content"];
        if (content.length > 500) {
            return new NextResponse(JSON.stringify({ success: false, message: "content too long" }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            });
        }
        else if (!content) {
            await prisma.comment.delete({
                where: {
                    id: parseInt(params.id)
                }
            });
        }
        else {
            await prisma.comment.update({
                where: {
                    id: parseInt(params.id)
                },
                data: {
                    content: content,
                    lastUpdate: new Date(),
                    username: username,
                }
            });
        }
        return new NextResponse(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}