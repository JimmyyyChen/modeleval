import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// delete a testing
export async function DELETE(request, { params }) {
  const testingId = parseInt(params.id);
  try {
    const testing = await prisma.testing.delete({
      where: {
        id: testingId,
      },
    });

    return new NextResponse(JSON.stringify(testing), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse.json({ error: error.message }, { status: 500 });
  }
}
