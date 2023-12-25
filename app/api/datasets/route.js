import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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
        //console.log(dataset);
        return new NextResponse(JSON.stringify(dataset), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}