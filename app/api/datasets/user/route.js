import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
export async function GET() {
    let { userId } = auth()
    if (userId == null) userId = "Administrator";
    try {
        let dataset = await prisma.Dataset.findMany({
            where: {
                userId: userId
            },
            include: {
                label_list: true,
                ChoiceQuestions: true,
                ShortAnswerQuestions: true,
            }
        });
        return new NextResponse(JSON.stringify(dataset), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}