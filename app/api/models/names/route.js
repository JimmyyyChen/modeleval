import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        let names = await prisma.test_model.findMany({
            orderBy: {
                id: "asc",
            },
        });
        names = names.map((name) => name.name)
        return new NextResponse(JSON.stringify(names), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}