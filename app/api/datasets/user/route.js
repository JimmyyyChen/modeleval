import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
export async function GET() {
    let { userId } = auth()
    if (userId == null) userId = "Administrator";
    try {
        let dataset = await prisma.Dataset.findUnique({
            where: {
                id: parseInt(params.id),
            },
            include: {
                label_list: true,
                ChoiceQuestions: {
                    include: {
                        choices: true
                    }
                },
                ShortAnswerQuestions: true,
                starUser: true,
                downloadUser: true,
            }
        });
        return new NextResponse(JSON.stringify(dataset), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}