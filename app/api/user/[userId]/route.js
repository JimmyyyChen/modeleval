import { NextResponse } from "next/server";
import { getUsername } from "@/lib/getUsername";

export async function GET(request, { params }) {
    try {
        const username = await getUsername(params.userId);
        return NextResponse.json({ username }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}