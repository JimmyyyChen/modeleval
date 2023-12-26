import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
export async function DELETE(request, { params }) {
    let { userId } = auth()
    try {
        let dataset = await prisma.Dataset.findUnique({
            where: {
                id: parseInt(params.id)
            },
            include: {
                label_list: true,
                ChoiceQuestions: true,
                ShortAnswerQuestions: true,
                Comment: true,
                Tasks: true,
            }
        });
        if (!dataset) {
            return new NextResponse(JSON.stringify({ success: false, message: "dataset not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (dataset.userId != userId) {
            return new NextResponse(JSON.stringify({ success: false, message: "permission denied" }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            });
        }
        await prisma.Dataset.delete({
            where: {
                id: parseInt(params.id)
            }
        })
        return new NextResponse(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}