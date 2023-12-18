import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
export async function POST(request, { params }) {
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
            }
        });
        if (!dataset.id) {
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
        const requestBody = await request.text();
        let body = JSON.parse(requestBody);
        if (body["datasetName"]) {
            if (body["datasetName"].length < 20) {
                dataset["datasetName"] = body["datasetName"];
            }
            else {
                return new NextResponse(JSON.stringify({ success: false, message: "name too long" }), {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                });
            }
        }
        if (body["description"]) {
            if (body["description"].length < 200) {
                dataset["description"] = body["description"];
            }
            else {
                return new NextResponse(JSON.stringify({ success: false, message: "description too long" }), {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                });
            }
        }
        if (body["label_list"]) {
            if (body["label_list"].length > 20) {
                return new NextResponse(JSON.stringify({ success: false, message: "label_list too long" }), {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                });
            }
            else {
                body["label_list"] = body["label_list"].map(str => ({ labelName: str, datasetId: parseInt(params.id) }));
            }
        }
        await prisma.Label.deleteMany({
            where: {
                datasetId: parseInt(params.id)
            },
        });
        await prisma.Label.createMany({
            data: body["label_list"],
        });
        await prisma.Dataset.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                datasetName: dataset["datasetName"],
                description: dataset["description"],
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