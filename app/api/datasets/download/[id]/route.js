import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import { prisma } from "@/lib/prisma";
export async function GET(request, { params }) {
    try {
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
        prisma.dataset.update({
            where: {
                id: parseInt(params.id),
            },
            data: {
                downloadCount: dataset.downloadCount + 1,
            },
        });
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
        let content = '';
        if (dataset.questionType == 0) {
            content += "question,choices,correctAnswer\n";
            for (let i = 0; i < dataset.ChoiceQuestions.length; i++) {
                dataset.ChoiceQuestions[i].question = dataset.ChoiceQuestions[i].question.replace(/"/g, '""');
                content += ("\"" + dataset.ChoiceQuestions[i].question + "\",\"[ ");
                for (let j = 0; j < dataset.ChoiceQuestions[i].choices.length; j++) {
                    dataset.ChoiceQuestions[i].choices[j].content = dataset.ChoiceQuestions[i].choices[j].content.replace(/"/g, '""');
                    content += ("\"\"" + dataset.ChoiceQuestions[i].choices[j].content + "\"\"");
                    if (j != dataset.ChoiceQuestions[i].choices.length - 1) {
                        content += ", ";
                    }
                    else content += " ]\"";
                }
                content += ",";
                content += dataset.ChoiceQuestions[i].correctAnswer + ",,,\n";
            }
        }
        else if (dataset.questionType == 1) {
            content += "prompt,answer\n";
            for (let i = 0; i < dataset.ShortAnswerQuestions.length; i++) {
                dataset.ShortAnswerQuestions[i].question = dataset.ShortAnswerQuestions[i].question.replace(/"/g, '""');
                content += ("\"" + dataset.ShortAnswerQuestions[i].question + "\",");
                dataset.ShortAnswerQuestions[i].sampleAnswer = dataset.ShortAnswerQuestions[i].sampleAnswer.replace(/"/g, '""');
                content += dataset.ShortAnswerQuestions[i].sampleAnswer + ",,,\n";
            }
        }
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