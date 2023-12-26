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
        let model = await prisma.Model.findUnique({
            where: {
                modelid: parseInt(params.id),
            },
            include: {
                starUser: true,
            }
        });
        if (!model) {
            return new NextResponse(JSON.stringify({ success: false, message: "model not found!" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        console.log(user.privateMetadata.starList_model.includes(model.modelid));
        if (!user.privateMetadata.starList_model.includes(model.modelid)) {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    starList_model: [...user.privateMetadata.starList_model, model.modelid],
                }
            });
            await prisma.Model.update({
                where: {
                    modelid: parseInt(params.id),
                },
                data: {
                    starCount: model.starCount + 1,
                }
            });
            await prisma.user.create({
                data: {
                    userId: userId,
                    username: user.username,
                    modelModelid: model.modelid,
                }
            });
        }
        else {
            console.log(model.modelid);
            console.log(user.privateMetadata.starList_model);
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    starList_model: user.privateMetadata.starList_model.filter((item) => item !== 1),
                }
            });
            await prisma.Model.update({
                where: {
                    modelid: parseInt(params.id),
                },
                data: {
                    starCount: model.starCount - 1,
                }
            });
            await prisma.User.deleteMany({
                where: {
                    userId: userId,
                    modelModelid: model.modelid,
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