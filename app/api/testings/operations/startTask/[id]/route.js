// 开始评测任务
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getModelAnswer } from "../../../api";
import { all } from "axios";
import { data } from "autoprefixer";

export async function POST(request, { params }) {
    try {
        let id = parseInt(params.id);
        const task = await prisma.task.findUnique({
            where: {
                id: id,
            },
            include: {
                dataset: {
                    include: {
                        ChoiceQuestions: {
                            include: {
                                choices: true,
                            },
                        },
                        ShortAnswerQuestions: true,
                    },
                },
                models: true,
            },  
        });
        task.state = 1;
        const allChoiceQuestions = task.dataset.ChoiceQuestions;
        const allShortAnswerQuestions = task.dataset.ShortAnswerQuestions;
        let answers = {};

        let allModelIds = [];
        for (let key in task.modelIds) {
            allModelIds.push(task.modelIds[key]);
            answers[task.modelIds[key]] = {};
        }

        let [currentModelId, currentQuestionId] = recoverFrom(task, task.progress);
        // 根据type(0 or 1)类型选择不同的处理方法
        if (task.questionType == 0) {
            // 获取全部的客观选择题
            let i, j;
            for (i=currentModelId;i < allModelIds.length;i++) {
                if (checkState(task, i, j) == false) {
                    break;
                }
                const model = await prisma.model.findUnique({
                    where: {
                        modelid: allModelIds[i],
                    },
                });
                for (j=currentQuestionId;j < allChoiceQuestions.length;j++) {
                    if (checkState(task, i, j) == false) {
                        break;
                    }
                    const question = allChoiceQuestions[j].question;
                    console.log(question);
                    let choices;
                    const allChoices = allChoiceQuestions[j].choices;
                    for (let k=0;k < allChoices.length;k++) {
                        choices = choices + allChoices[k].content + '\n';
                    }
                    const answer = await getModelAnswer(model.modelName, question + '\n' + choices);
                    // 将answer更新到存储变量'answers'中
                    answers[model.modelid][allChoiceQuestions[j].id] = answer;
                }
            }
            if (i == allModelIds.length && j == allChoiceQuestions.length){
                    task.state = 3;
                    task.endTime = new Date();
            }
        }
        else if (task.questionType == 1) {
            let i, j;
            for (i=currentModelId;i < allModelIds.length;i++) {
                if (checkState(task, i, j) == false) {
                    break;
                }
                const model = await prisma.model.findUnique({
                    where: {
                        id: allModelIds[i],
                    },
                });
                for (j=currentQuestionId;j < allShortAnswerQuestions.length;j++) {
                    if (checkState(task, i, j) == false) {
                        break;
                    }
                    const question = allShortAnswerQuestions[j].question;
                    const answer = await getModelAnswer(model.modelName, question.question);
                    // 将answer更新到存储变量'answers'中
                    answers[model.modelid][allShortAnswerQuestions[j].id] = answer;
                }
            }
            if (i == allModelIds.length && j == allShortAnswerQuestions.length){
                    task.state = 3;
                    task.endTime = new Date();
            }
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: id,
            },
            include: {
                dataset: {
                    include: {
                        ChoiceQuestions: {
                            include: {
                                choices: true,
                            },
                        },
                        ShortAnswerQuestions: true,
                    },
                },
                models: true,
            },
            data: {
                endTime: new Date(),
                state: task.state,
                progress: task.progress,
                answers: answers,
            }
        }
        );

        return new NextResponse(JSON.stringify(updatedTask), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }
} 

function recoverFrom(task, progress) {
    const modelsLength = Object.keys(task.modelIds).length;
    let datasetLength;
    if (task.dataset.questionType == 0) {
        datasetLength = Object.keys(task.dataset.ChoiceQuestions).length; 
    }
    else if (task.dataset.questionType == 1) {
        datasetLength = Object.keys(task.dataset.ShortAnswerQuestions).length;
    }
    const totalLength = modelsLength * datasetLength; 
    const currentLength = progress * totalLength;
    const currentModelId = currentLength / modelsLength;
    const currentQuestionId = currentLength % modelsLength;
    return [currentModelId, currentQuestionId];
}

function checkState(task, modelId, questionId) {
    if (task.state == 1) {
        return true;
    }
    else {
        // 重新存储task的进度
        if (task.dataset.questionType == 0) {
            task.progress = (modelId * task.dataset.ChoiceQuestions.length + questionId) / (task.modelsIds.length * task.dataset.ChoiceQuestions.length);
        }
        else if (task.dataset.questionType == 1) {
            task.progress = (modelId * task.dataset.ShortAnswerQuestions.length + questionId) / (task.modelsIds.length * task.dataset.ShortAnswerQuestions.length);
        }
        return false;
    }
}