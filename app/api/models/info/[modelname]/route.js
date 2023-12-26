import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const modelName = params.modelname;
    try {
        let model = await prisma.model.findUnique({
            where: {
                modelid: parseInt(modelName),
            },
            include: {
                label_list: true,
                // TODO: i have no idea what the fck is happening here. But this causes some error
                // starUser: true,
                Comment: true,
            }
        });
        return new NextResponse(JSON.stringify(model), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
}