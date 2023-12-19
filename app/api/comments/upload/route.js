import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { getUsername } from "@/lib/getUsername";
export async function POST(request) {
    try {
        let { userId } = auth()
        //userId = "user_2YYm4PPqCJvDTh8umSpl6r1N6dZ"
        let username = "Administrator";
        if (userId == null) userId = "Administrator";
        else {
            username = await getUsername(userId);
            if (username == null) username = "Administrator";
        }
        const requestBody = await request.text();
        let body = JSON.parse(requestBody);
        let type = body["type"];
        let id = body["id"];
        let content = body["content"];
        if (content.length > 500) {
            return new NextResponse(JSON.stringify({ success: false, message: "content too long" }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (type == 0) {
            const model = await prisma.model.findUnique({
                where: {
                    id: id
                }
            });
            if (!model) {
                return new NextResponse(JSON.stringify({ success: false, message: "model not found" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }
            await prisma.comment.create({
                data: {
                    userId: userId,
                    type: type,
                    modelId: id,
                    content: content,
                    username: username,
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
            await prisma.comment.create({
                data: {
                    userId: userId,
                    type: type,
                    datasetId: id,
                    content: content,
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