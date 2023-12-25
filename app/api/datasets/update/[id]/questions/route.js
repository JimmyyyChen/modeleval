import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function DELETE(request, { params }) {
    let { userId } = auth()
    try {
        const requestBody = await request.text();
        let body = JSON.parse(requestBody);

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
        if (dataset.questionType == 0) {
            // let question = await prisma.ChoiceQuestion.findUnique({
            //     where: {
            //         id: parseInt(params.id2)
            //     }
            // })
            // if (!question) {
            //     return new NextResponse(JSON.stringify({ success: false, message: "question not found" }), {
            //         status: 404,
            //         headers: { "Content-Type": "application/json" },
            //     });
            // }
            // await prisma.Choice.deleteMany({
            //     where: {
            //         choiceQuestionId: parseInt(params.id2)
            //     }
            // })
            await prisma.ChoiceQuestion.deleteMany({
                where: {
                    id: {
                        in: body["items"],
                    }

                }
            })
        }
        else {
            // let question = await prisma.ShortAnswerQuestion.findUnique({
            //     where: {
            //         id: parseInt(params.id2)
            //     }
            // })
            // if (!question) {
            //     return new NextResponse(JSON.stringify({ success: false, message: "question not found" }), {
            //         status: 404,
            //         headers: { "Content-Type": "application/json" },
            //     });
            // }
            await prisma.ShortAnswerQuestion.delete({
                where: {
                    id: {
                        in: body["items"],
                    }

                }
            })
        }
        dataset = await prisma.Dataset.findUnique({
            where: {
                id: parseInt(params.id)
            },
            include: {
                label_list: true,
                ChoiceQuestions: true,
                ShortAnswerQuestions: true,
            }
        });
        await prisma.Dataset.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                sizeInMB: dataset.ChoiceQuestions.length + dataset.ShortAnswerQuestions.length,
                lastUpdate: new Date(),
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