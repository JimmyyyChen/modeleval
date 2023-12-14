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
        // if (dataset.userId != userId) {
        //     return new NextResponse(JSON.stringify({ success: false, message: "permission denied" }), {
        //         status: 403,
        //         headers: { "Content-Type": "application/json" },
        //     });
        // }
        const requestBody = await request.text();
        let body = JSON.parse(requestBody);


        if (dataset["questionType"]) {         //主观题
            let question = await prisma.ShortAnswerQuestion.findUnique({
                where: {
                    id: parseInt(params.id2)
                }
            })
            if (!question) {
                if (body["question"]) {
                    if (!body["sampleAnswer"]) {
                        body["sampleAnswer"] = "no sampleAnswer";
                    }
                    let question = await prisma.ShortAnswerQuestion.create({
                        data: {
                            question: body["question"],
                            sampleAnswer: body["sampleAnswer"],
                            datasetId: parseInt(params.id),
                        }
                    })
                }      //如果有问题,创建;如果没有,不创建
                else {
                    return new NextResponse(JSON.stringify({ success: false, message: "fail to create!" }), {
                        status: 404,
                        headers: { "Content-Type": "application/json" },
                    })
                };
            }
            else {
                if (body["sampleAnswer"]) {
                    question["sampleAnswer"] = body["sampleAnswer"];
                }
                if (body["question"]) {                         //如果有问题,更新;如果没有,删除
                    question["question"] = body["question"];
                }
                if (!body["question"] && !body["sampleAnswer"]) {
                    const deleteFormerQuestion = await prisma.ShortAnswerQuestion.delete({
                        where: {
                            id: parseInt(params.id2)
                        }
                    })
                }
                else {
                    const newQuestion = await prisma.ShortAnswerQuestion.update({
                        where: {
                            id: parseInt(params.id2)
                        },
                        data: {
                            question: question["question"],
                            sampleAnswer: question["sampleAnswer"],
                        }
                    })
                }
            }
        }
        else {
            let question = await prisma.ChoiceQuestion.findUnique({
                where: {
                    id: parseInt(params.id2)
                }
            })
            if (!question) {
                if (body["question"] && body["choices"] && body["correctAnswer"]) {
                    let question = await prisma.ChoiceQuestion.create({
                        data: {
                            question: body["question"],
                            choices: {
                                createMany: {
                                    data: Array.from({ length: body["choices"].length }, (_, index) => ({
                                        content: body["choices"][index],
                                    })),
                                }
                            },
                            correctAnswer: body["correctAnswer"],
                            datasetId: parseInt(params.id),
                        }
                    })
                }      //如果有问题,创建;如果没有,不创建
                else {
                    return new NextResponse(JSON.stringify({ success: false, message: "fail to create question!" }), {
                        status: 404,
                        headers: { "Content-Type": "application/json" },
                    })
                };
            }
            else {
                if (body["correctAnswer"]) {
                    question["correctAnswer"] = body["correctAnswer"];
                }
                if (body["question"]) {                         //如果有问题,更新;如果没有,删除
                    question["question"] = body["question"];
                }
                if (body["choices"]) {
                    await prisma.Choice.deleteMany({
                        where: {
                            choiceQuestionId: parseInt(params.id2)
                        }
                    })
                    await prisma.Choice.createMany({
                        data: Array.from({ length: body["choices"].length }, (_, index) => ({
                            content: body["choices"][index],
                            choiceQuestionId: parseInt(params.id2)
                        })),
                    })
                }
                if (!body["question"] && !body["correctAnswer"] && !body["choices"]) {
                    await prisma.Choice.deleteMany({
                        where: {
                            choiceQuestionId: parseInt(params.id2)
                        }
                    })
                    const deleteFormerQuestion = await prisma.ChoiceQuestion.delete({
                        where: {
                            id: parseInt(params.id2)
                        }
                    })
                }
                else {
                    const newQuestion = await prisma.ChoiceQuestion.update({
                        where: {
                            id: parseInt(params.id2)
                        },
                        data: {
                            question: question["question"],
                            correctAnswer: question["correctAnswer"],
                        }
                    })
                }

            }

            return new NextResponse(JSON.stringify({ success: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
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