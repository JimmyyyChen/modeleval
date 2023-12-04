import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const modelName = params.modelname;
    try {
        let model = await prisma.Models.findMany({
            where: {
                modelName: modelName
            },
            include: {
                label_list: true,
            }
        });
        //names = names.map((name) => name.name)
        return new NextResponse(JSON.stringify(model), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}