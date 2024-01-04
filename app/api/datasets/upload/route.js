import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import csv from 'csv-parser';
import fs from 'fs'
import { pipeline } from 'stream';
import { promisify } from "util";
import { Readable } from 'stream';
import { getUsername } from "@/lib/getUsername";
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
        let { userId } = auth()
        //userId = "user_2YYm4PPqCJvDTh8umSpl6r1N6dZ"
        let username = "Administrator";
        if (userId == null) userId = "Administrator";
        else {
            username = await getUsername(userId);
            if (username == null) username = "Administrator";
        }
        const temp_datasetname = userId.slice(5, 12) + Date.now() + ".txt";
        const temp_datasetname2 = userId.slice(6, 10) + Date.now() + ".txt";
        let results = [];
        let final_results = [];
        let get_from_request = '';
        let number_of_wrong = 0;
        let wrong_questions = [];
        let total_number = 0;
        await promisify(pipeline)(request.body, fs.createWriteStream(temp_datasetname));
        let data = fs.readFileSync(temp_datasetname, 'utf8');//等待文件读完
        const { newfile, temp_name } = removeFirstEmptyLine(data);
        if (temp_name == null || temp_name.length > 24) {
            return new NextResponse(JSON.stringify({ success: false, error: 'Invalid dataset name' }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        get_from_request += newfile;
        fs.writeFileSync(temp_datasetname2, get_from_request, 'utf8')//等待文件去掉头部
        const fileContent = fs.readFileSync(temp_datasetname2, 'utf8');
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
        const stats = fs.statSync(temp_datasetname2);
        const fileSize = (stats.size / 1024 / 1024).toFixed(4);
        let question_type;
        if (results[0].choices || results[1].choices) {                 //即将创建数据集
            question_type = 0;
            let choices = [];
            total_number = results.length;
            for (var i = 0; i < results.length; i++) {
                if (!results[i].choices || !results[i].question || !results[i].answer) {
                    number_of_wrong++;
                    wrong_questions.push(i + 1);
                    continue;
                }
                if (results[i].choices.slice(3, -3).split('", "').map(str => ({ content: str })).length != 4) {
                    number_of_wrong++;
                    wrong_questions.push(i + 1);
                    continue;
                }

                final_results.push(results[i]);
                choices[final_results.length - 1] = results[i].choices.slice(3, -3).split('", "').map(str => ({ content: str }));
            }
            createData(temp_name, fileSize, question_type, final_results, choices, wrong_questions, number_of_wrong, total_number, userId, username);
        }
        else {
            question_type = 1;
            total_number = results.length;
            for (i = 0; i < results.length; i++) {
                if (!results[i].prompt) {
                    number_of_wrong++;
                    wrong_questions.push(i + 1);
                    continue;
                }
                if (!results[i].answer) results[i].answer = "no sampleAnswer";
                final_results.push(results[i]);
            }
            createData(temp_name, fileSize, question_type, final_results, null, wrong_questions, number_of_wrong, total_number, userId, username);
        }
        fs.unlink(temp_datasetname, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });
        fs.unlink(temp_datasetname2, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });
        if (number_of_wrong == 0) {
            return new NextResponse(JSON.stringify({ success: true, total_number: total_number }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
        else if (number_of_wrong != 0 && number_of_wrong != total_number) {
            return new NextResponse(JSON.stringify({ success: true, wrong_indexes: wrong_questions, wrong_number: number_of_wrong, total_number: total_number }), {
                status: 206,
                headers: { "Content-Type": "application/json" },
            });
        }
        else {
            return new NextResponse(JSON.stringify({ success: false, error: 'Invalid dataset' }), {
                status: 400,
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

async function createData(temp_name, fileSize, question_type, final_results, choices, wrong_questions, number_of_wrong, total_number, userId, username) {
    if (number_of_wrong == total_number) return;
    let size_label = "<1K";
    if (final_results.length > 10000000) size_label = ">10M";
    else if (final_results.length > 1000000) size_label = "1M-10M";
    else if (final_results.length > 100000) size_label = "100K-1M";
    else if (final_results.length > 10000) size_label = "10K-100K";
    else if (final_results.length > 1000) size_label = "1K-10K";
    const dataset = await prisma.Dataset.findFirst({
        where: {
            datasetName: temp_name,
        },
    })
    if (dataset) {
        let num = dataset.repeatNames;
        temp_name = temp_name + "(" + (num + 1) + ")";
        await prisma.Dataset.update({
            where: {
                id: dataset.id,
            },
            data: {
                repeatNames: num + 1,
            },
        })
    }
    if (question_type == 0) {
        const new_dataset = await prisma.Dataset.create({
            data: {
                datasetName: temp_name,
                sizeInMB: final_results.length,
                lastUpdate: new Date(),
                questionType: question_type,
                label_list: {
                    createMany: {
                        data: [{ labelName: size_label, }, { labelName: "客观" }]
                    }
                },
                ChoiceQuestions: {
                    createMany: {
                        data: Array.from({ length: final_results.length }, (_, index) => ({
                            question: final_results[index].question,
                            correctAnswer: final_results[index].answer,
                        }))
                    },
                },
                userId: userId,
                username: username,
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

            await prisma.Choice.createMany({
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
    else {
        await prisma.Dataset.create({
            data: {
                datasetName: temp_name,
                sizeInMB: final_results.length,
                lastUpdate: new Date(),
                questionType: question_type,
                label_list: {
                    createMany: {
                        data: [{ labelName: size_label, }, { labelName: "主观" }]
                    }
                },
                ShortAnswerQuestions: {
                    createMany: {
                        data: Array.from({ length: final_results.length }, (_, index) => ({
                            question: final_results[index].prompt,
                            sampleAnswer: final_results[index].answer,
                        })),
                    },
                },
                userId: userId,
                username: username,
            },
        })
        console.log("create finished!");
        console.log(wrong_questions);
        console.log(number_of_wrong);
        console.log(total_number);

    }
}