import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fetch from 'node-fetch'; // Need to install
import OpenAI from "openai"; // Need to install

process.env.OPENAI_API_KEY = 'yaonm';

export async function POST(request) {
  try {
    const client = new OpenAI({baseURL:"http://111.202.73.146:10510/v1", apiKey: process.env.OPENAI_API_KEY});

    // 获取模型列表
    const response = await fetch("http://111.202.73.146:10510/v1/models");
    const models = await response.json();
    // 先选择模型列表中的第一个模型做测试
    const model = models.data[0].id;

    const completionResponse = await client.chat.completions.create({
      model: model,
      messages: [
          {"role": "user", "content": "what is eax in x86?"},
      ],
      max_tokens: 20,
    });

    const json = await request.json();
    json.name = completionResponse.choices[0].message.content;
    console.log(json);
    const clinet_response = await prisma.task.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(clinet_response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse.json({ error: error.message }, { status: 500 });
  }
}

