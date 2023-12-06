import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        let dataset = await prisma.Dataset.findMany({
            where: {
                datasetName: params.name
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