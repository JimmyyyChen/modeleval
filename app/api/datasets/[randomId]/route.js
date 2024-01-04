// this is a tempory solution for GET api/datasets error, see api/datasets/route.js for more details

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        let dataset = await prisma.Dataset.findMany({
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
                Comment: true,
                Tasks: true,
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