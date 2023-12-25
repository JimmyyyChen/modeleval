import { NextResponse } from "next/server";
import { getUser } from "@/lib/getUsername";
import { clerkClient } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
export async function GET(request, { params }) {
    try {
        const { userId } = auth();
        const user = await getUser(userId);
        let stars = 0;
        let organization = "individual";
        let starList = [];
        let downloadList = [];
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (user.privateMetadata.stars == undefined) {
            await clerkClient.users.updateUserMetadata(params.userId, {
                privateMetadata: {
                    stars: 0,
                }
            });
        }
        else stars = user.privateMetadata.stars;
        if (user.privateMetadata.organization == undefined) {
            await clerkClient.users.updateUserMetadata(params.userId, {
                privateMetadata: {
                    organization: "individual",
                }
            });
        }
        else organization = user.privateMetadata.organization;
        if (user.privateMetadata.starList == undefined) {
            await clerkClient.users.updateUserMetadata(params.userId, {
                privateMetadata: {
                    starList: [],
                }
            });
        }
        else starList = user.privateMetadata.starList;
        if (user.privateMetadata.downloadList == undefined) {
            await clerkClient.users.updateUserMetadata(params.userId, {
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
            downloadList: downloadList,
            image_url: user.imageUrl,
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}