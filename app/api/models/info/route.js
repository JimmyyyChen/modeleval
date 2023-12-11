import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        let models = await prisma.Model.findMany({
            orderBy: {
                modelid: "asc",
            },
            include: {
                label_list: true,
            }
        });
        //names = names.map((name) => name.name)
        return new NextResponse(JSON.stringify(models), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}