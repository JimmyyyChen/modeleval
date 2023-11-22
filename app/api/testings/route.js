import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// add a new testing
export async function POST(request) {
  try {
    const json = await request.json();
    const testing = await prisma.testing.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(testing), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, { status: 500 });
  }
}
