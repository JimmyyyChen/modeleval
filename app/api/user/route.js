import { NextResponse } from "next/server";
import { getUser } from "@/lib/getUsername";
import { clerkClient } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
export async function GET() {
    try {
        const { userId } = auth();
        const user = await getUser(userId);
        let stars = 0;
        let organization = "individual";
        let starList = [];
        let downloadList = [];
        let starList_model = [];
        let datasets = await prisma.dataset.findMany({
            where: {
                userId: userId,
            },
        });
        console.log(datasets);
        for (let i = 0; i < datasets.length; i++)
            stars += datasets[i].starCount;
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (user.privateMetadata.stars == undefined) {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    stars: stars,
                }
            });
        }
        //else stars = user.privateMetadata.stars;
        console.log(stars);
        if (user.privateMetadata.organization == undefined) {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    organization: "individual",
                }
            });
        }
        else organization = user.privateMetadata.organization;
        if (user.privateMetadata.starList == undefined) {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    starList: [],
                }
            });
        }
        else starList = user.privateMetadata.starList;
        if (user.privateMetadata.starList_model == undefined) {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    starList_model: [],
                }
            });
        }
        else starList_model = user.privateMetadata.starList_model;
        if (user.privateMetadata.downloadList == undefined) {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    downloadList: [],
                }
            });
        }
        else downloadList = user.privateMetadata.downloadList;
        return NextResponse.json({
            userId: userId,
            username: user.username,
            email: user.emailAddresses[0].emailAddress,
            organization: organization,
            stars: stars,
            starList: starList,
            starList_model: starList_model,
            downloadList: downloadList,
            image_url: user.imageUrl,
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}