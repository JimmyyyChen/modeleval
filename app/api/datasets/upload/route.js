import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import csv from 'csv-parser';
import fs from 'fs'
import { pipeline } from 'stream';
import { promisify } from "util";
import { Readable } from 'stream';
export const config = {
    api: {
        bodyParser: false, // 禁用默认的bodyParser
    },
};
function removeFirstEmptyLine(text) {
    const lines = text.split('\n');
    let temp_name;
    // Find the index of the first non-empty line
    let firstNonEmptyIndex = 0;
    while (firstNonEmptyIndex < lines.length && lines[firstNonEmptyIndex].trim() != '') {
        if (lines[firstNonEmptyIndex].indexOf('filename') != -1) {
            temp_name = lines[firstNonEmptyIndex].slice(lines[firstNonEmptyIndex].indexOf('filename') + 10, -2);
        }
        firstNonEmptyIndex++;
    }

    // Remove content before the first non-empty line
    const modifiedLines = lines.slice(firstNonEmptyIndex + 1, lines.length - 3);

    return {
        newfile: modifiedLines.join('\n'),
        temp_name: temp_name
    }
}
export async function POST(request) {
    try {
        let results = [];
        let final_results = [];
        let get_from_request = '';
        let number_of_wrong = 0;
        let wrong_questions = [];
        let total_number = 0;
        let if_return = 0;            //设置好number_of_wrong再return
        await promisify(pipeline)(request.body, fs.createWriteStream('temp/temp_dataset.txt'));
        let data = fs.readFileSync('temp/temp_dataset.txt', 'utf8');//等待文件读完
        const { newfile, temp_name } = removeFirstEmptyLine(data);
        get_from_request += newfile;
        fs.writeFileSync('temp/temp_dataset2.txt', get_from_request, 'utf8')//等待文件去掉头部
        const fileContent = fs.readFileSync('temp/temp_dataset2.txt', 'utf8');
        // 替换换行符为空格
        //const sanitizedContent = fileContent.replace(/\n/g, ' ');
        // 使用 csv-parser 处理替换后的内容
        await new Promise((resolve, reject) => {
            const readableStream = Readable.from(fileContent);
            readableStream
                .pipe(csv())
                .on('data', (data) => {
                    results.push(data);
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
        const stats = fs.statSync('temp/temp_dataset2.txt');
        const fileSize = (stats.size / 1024 / 1024).toFixed(4);
        let { userId } = auth();                      //获取userID
        if (userId == null) userId = "Administrator";
        let question_type;
        if (results[0].choices || results[1].choices) {                 //客观集的情况
            question_type = false;
            let choices = [];
            total_number = results.length;
            for (var i = 0; i < results.length; i++) {
                if (!results[i].choices || !results[i].question || !results[i].answer) {
                    number_of_wrong++;
                    wrong_questions.push(i + 1);
                    continue;
                }
                final_results.push(results[i]);
                choices[final_results.length - 1] = results[i].choices.slice(3, -3).split('\", \"').map(str => ({ content: str }));
            }
            async function createData() {
                const new_dataset = await prisma.Dataset.create({
                    data: {
                        datasetName: temp_name,
                        sizeInMB: parseFloat(fileSize),
                        lastUpdate: new Date(),
                        questionType: question_type,
                        ChoiceQuestions: {
                            createMany: {
                                data: Array.from({ length: final_results.length }, (_, index) => ({
                                    question: final_results[index].question,
                                    correctAnswer: final_results[index].answer,
                                })),
                            },
                        },
                        userId: userId,
                    },
                    include: {
                        ChoiceQuestions: {
                            include: {
                                choices: true,
                            },
                        },
                    },
                })
                console.log("create finished!");

                var i = 0;
                for (const choiceQuestion of new_dataset.ChoiceQuestions) {

                    const get_choices = await prisma.Choice.createMany({
                        data: choices[i].map(ch => ({
                            content: ch.content,
                            choiceQuestionId: choiceQuestion.id,
                        })),
                    });
                    i++;
                }
                console.log(wrong_questions);
                console.log(number_of_wrong);
                console.log(total_number);
            }
            createData();
        }
        else {
            question_type = true;
            total_number = results.length;
            for (var i = 0; i < results.length; i++) {
                if (!results[i].prompt) {
                    number_of_wrong++;
                    wrong_questions.push(i + 1);
                    continue;
                }
                if (!results[i].answer) results[i].answer = "no sampleAnswer";
                final_results.push(results[i]);
            }
            async function createData() {
                const new_dataset = await prisma.Dataset.create({
                    data: {
                        datasetName: temp_name,
                        sizeInMB: parseFloat(fileSize),
                        lastUpdate: new Date(),
                        questionType: question_type,
                        ShortAnswerQuestions: {
                            createMany: {
                                data: Array.from({ length: final_results.length }, (_, index) => ({
                                    question: final_results[index].prompt,
                                    sampleAnswer: final_results[index].answer,
                                })),
                            },
                        },
                        userId: userId,
                    },
                })
                console.log("create finished!");
                console.log(wrong_questions);
                console.log(number_of_wrong);
                console.log(total_number);
            }
            createData();
        }
        if (number_of_wrong == 0) {
            return new NextResponse(JSON.stringify({ success: true, total_number: total_number }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
        else if (number_of_wrong != 0) {
            return new NextResponse(JSON.stringify({ success: true, wrong_indexes: wrong_questions, wrong_number: number_of_wrong, total_number: total_number }), {
                status: 206,
                headers: { "Content-Type": "application/json" },
            });
        }
    }
    catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}