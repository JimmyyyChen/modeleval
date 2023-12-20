import { NextResponse } from "next/server";
import { getUser } from "@/lib/getUsername";
import { clerkClient } from "@clerk/nextjs";
export async function GET(request, { params }) {
    try {
        const user = await getUser(params.userId);
        let stars = 0;
        let organization = "individual";
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
        else organization = user.privateMetadata.organization;
        if (user.privateMetadata.organization == undefined) {
            await clerkClient.users.updateUserMetadata(params.userId, {
                privateMetadata: {
                    organization: "individual",
                }
            });
        }
        else organization = user.privateMetadata.organization;
        return NextResponse.json({
            username: user.username,
            email: user.emailAddresses[0].emailAddress,
            organization: organization,
            stars: stars
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}