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
        const requestBody = await request.text();
        let body = JSON.parse(requestBody);
        if (body["datasetName"] && body["datasetName"] != '') {
            const dataset2 = await prisma.Dataset.findFirst({
                where: {
                    datasetName: body["datasetName"],
                },
            })
            if (dataset2) {
                return new NextResponse(JSON.stringify({ success: false, message: "name already exists" }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                });
            }
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
        if (body["description"] && body["description"] != '') {
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
        if (body["label_list"] && body["label_list"].length > 0) {
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
                lastUpdate: new Date(),
                username: username,
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