import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUser } from "@/lib/getUsername";
import { clerkClient } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
export async function POST(request, { params }) {
    try {
        let { userId } = auth();
        // userId = "user_2YYm4PPqCJvDTh8umSpl6r1N6dZ";
        const user = await getUser(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
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
        if (!dataset) {
            return new NextResponse(JSON.stringify({ success: false, message: "dataset not found!" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (!user.privateMetadata.starList.includes(dataset.id)) {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    starList: [...user.privateMetadata.starList, dataset.id],
                }
            });
            await prisma.Dataset.update({
                where: {
                    id: dataset.id,
                },
                data: {
                    starCount: dataset.starCount + 1,
                }
            });
            await prisma.user.create({
              data: {
                userId: userId,
                username: user.username,
                userImageUrl: user.imageUrl,
                datasetId2: dataset.id,
              },
            });
        }
        else {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    starList: user.privateMetadata.starList.filter((item) => item !== dataset.id),
                }
            });
            await prisma.Dataset.update({
                where: {
                    id: dataset.id,
                },
                data: {
                    starCount: dataset.starCount - 1,
                }
            });
            await prisma.User.deleteMany({
                where: {
                    userId: userId,
                    datasetId2: dataset.id,
                }
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