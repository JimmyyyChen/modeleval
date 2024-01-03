import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/getUsername";
import { clerkClient } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { handleDataset } from "./handleDataset";
export async function GET(request, { params }) {
    try {
        let { userId } = auth();
        //userId = "user_2YYm4PPqCJvDTh8umSpl6r1N6dZ";
        const user = await getUser(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        let dataset = await prisma.dataset.findUnique({
            where: {
                id: parseInt(params.id),
            },
            include: {
                label_list: true,
                ChoiceQuestions: {
                    include: {
                        choices: true
                    }
                },
                ShortAnswerQuestions: true,
            }
        });
        if (!dataset) {
            return new NextResponse(JSON.stringify({ success: false, message: "Dataset not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
        }
        await prisma.dataset.update({
            where: {
                id: parseInt(params.id),
            },
            data: {
                downloadCount: dataset.downloadCount + 1,
            },

        });
        if (!user.privateMetadata.downloadList.includes(dataset.id)) {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    downloadList: [...user.privateMetadata.downloadList, dataset.id],
                }

            });
            await prisma.user.create({
                data: {
                    userId: userId,
                    username: user.username,
                    datasetId1: dataset.id,
                    userImageUrl: user.imageUrl,
                }
            });
        }
        // 获取目录路径
        const dirPath = path.resolve(process.cwd(), 'public/csv');

        // 读取目录中的所有文件
        const files = fs.readdirSync(dirPath);

        // 遍历并删除每个文件
        for (const file of files) {
            fs.unlinkSync(path.join(dirPath, file));
        }


        let filename = "csv/" + dataset.datasetName;
        if (!filename.endsWith('.csv')) {
            filename += '.csv';
        }
        const filePath = path.resolve(process.cwd(), 'public', filename);
        let content = handleDataset(dataset);
        // 写入文件
        fs.writeFileSync(filePath, content, 'utf8', function (error) {
            if (error) {
                console.log(error);
                return new NextResponse(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
            } else {
                return new NextResponse('File written successfully');
            }
        });
        return new NextResponse(JSON.stringify({ success: true, filename: filename }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}