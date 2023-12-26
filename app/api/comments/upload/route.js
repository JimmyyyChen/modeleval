import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { getUser } from "@/lib/getUsername";
export async function POST(request) {
    try {
        let { userId } = auth();
        userId = "user_2YYm4PPqCJvDTh8umSpl6r1N6dZ"
        let user = await getUser(userId);
        if (!user) {
            return new NextResponse(JSON.stringify({ success: false, message: "user not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        const requestBody = await request.text();
        let body = JSON.parse(requestBody);
        let type = body["type"];
        let id = body["id"];
        let content = body["content"];
        let reply = -1;
        if (body["reply"] != -1) reply = body["reply"];
        if (content.length > 500) {
            return new NextResponse(JSON.stringify({ success: false, message: "content too long" }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (type == 0) {
            const model = await prisma.model.findUnique({
                where: {
                    modelid: id
                }
            });
            if (!model) {
                return new NextResponse(JSON.stringify({ success: false, message: "model not found" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }

            let comment = await prisma.Comment.create({
                data: {
                    type: type,
                    modelId: id,
                    content: content,
                    reply: reply,
                }
            });
            await prisma.User.create({
                data: {
                    userId: userId,
                    username: user.username,
                    userImageUrl: user.imageUrl,
                    commentId: comment.id,
                }
            });
        }
        else if (type == 1) {
            const dataset = await prisma.Dataset.findUnique({
                where: {
                    id: id
                }
            });
            if (!dataset) {
                return new NextResponse(JSON.stringify({ success: false, message: "dataset not found" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }
            let comment = await prisma.comment.create({
                data: {
                    type: type,
                    datasetId: id,
                    content: content,
                    reply: reply,
                }
            });
            await prisma.User.create({
                data: {
                    userId: userId,
                    username: user.username,
                    userImageUrl: user.imageUrl,
                    commentId: comment.id,
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