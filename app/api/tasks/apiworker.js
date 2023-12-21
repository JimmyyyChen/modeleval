const { parentPort } = require('worker_threads');
const { PrismaClient } = require('@prisma/client');
const getModelAnswer = require("./api.js");

const prisma = new PrismaClient();

parentPort.on('message', async (data) => {
    try {
        const taskId = data;
        const task = await prisma.task.findUnique({
            where: {
                id: taskId,
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

        let answerjson = {};
        let judgejson = {};
        const ChoiceQuestions = task.dataset.ChoiceQuestions;
        const ShortAnswerQuestions = task.dataset.ShortAnswerQuestions;
        let modelIds = [];
        for (let key in task.modelIds) {
            modelIds.push(task.modelIds[key]);
            answerjson[task.modelIds[key]] = {};
            judgejson[task.modelIds[key]] = {};
        }
        
        
        let [currentModelId, currentQuestionId] = recoverFrom(task, task.progress);
        // 根据type(0 or 1)类型选择不同的处理方法
        if (task.questionType == 0) {
            const prompt = "Please answer the following multiple-choice questions with only the choice index (A, B, C, or D) as your response. Note: Respond with only the letter of the correct answer (e.g., A, B, C, D)."
            // 获取全部的客观选择题
            let i, j;
            // 遍历所有需要跑的模型
            for (i = currentModelId; i < modelIds.length; i++) {
                // if (checkState(task, i, j) == false) {
                    // break;
                // }
                const model = await prisma.model.findUnique({
                    where: {
                        modelid: modelIds[i],
                    },
                });

                // 遍历所有的客观选择题
                for (j = currentQuestionId; j < ChoiceQuestions.length; j++) {
                    // if (checkState(task, i, j) == false) {
                        // break;
                    // }
                    const question = ChoiceQuestions[j].question;
                    const allChoices = ChoiceQuestions[j].choices;
                    let choices;
                    for (let k = 0; k < allChoices.length; k++) {
                        choices = choices + allChoices[k].content + '\n';
                    }
                    const answer = await getModelAnswer(model.modelName, prompt+'\n'+question+'\n'+choices);
                    // 将answer更新到存储变量'answerjson'中
                    answerjson[model.modelid][ChoiceQuestions[j].id] = answer;
                    // 每跑完一条更新一下本地的进度
                    task.progress = (i * ChoiceQuestions.length + j) / (modelIds.length * ChoiceQuestions.length);
                    console.log("task progress:" + task.progress);
                    // 向task数据库更新一下
                    await updateAnswerInTask(task, answerjson);
                }
            }
            if (i == modelIds.length && j == ChoiceQuestions.length) {
                task.progress = 1;
                task.state = 3;
                // 只有客观评测的得分是自动评测的, 因此也只有这里会更新score数据库
                task.scoresjson, task.judgejson = await calculateScore(task, answerjson, judgejson);
            }
            else {
                task.state = 2;
            }
        }
        else { // 进行主观测评和对抗性评测
            let i, j;
            for (i = currentModelId; i < modelIds.length; i++) {
                // if (checkState(task, i, j) == false) {
                //     break;
                // }
                const model = await prisma.model.findUnique({
                    where: {
                        modelid: modelIds[i],
                    },
                });
                for (j = currentQuestionId; j < ShortAnswerQuestions.length; j++) {
                    // if (checkState(task, i, j) == false) {
                    //     break;
                    // }
                    const question = ShortAnswerQuestions[j].question;
                    const answer = await getModelAnswer(model.modelName, question);
                    // 将answer更新到存储变量'answers'中
                    answerjson[model.modelid][ShortAnswerQuestions[j].id] = answer;
                    // 更新本地的进度
                    task.progress = (i * ShortAnswerQuestions.length + j) / (modelIds.length * ShortAnswerQuestions.length);
                    // 向task数据库更新一下
                    await updateAnswerInTask(task, answerjson);
                }
            }
            if (i == modelIds.length && j == ShortAnswerQuestions.length) {
                task.state = 3;
                task.progress = 1;
                // 主观评测需要人工评判，因此不自动计算得分
            }
            else {
                task.state = 2;
            }
        }
        
        // 整体再向task数据库更新一次, 包括结束时间的更新和scoresjson的更新
        const updatedTask = await prisma.task.update({
            where: {
                id: taskId,
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
                answerjson: answerjson,
                scoresjson: task.scoresJson,
                judgejson: task.judgejson,
            }
        }
        );
        parentPort.postMessage({ success: true, updatedTask: updatedTask });
    } catch (error) {
        parentPort.postMessage({ success: false, error: error.message });
    }
});

// 以下是一些辅助函数
async function updateAnswerInTask(task, answerjson) {
    await prisma.task.update({
        where: {
            id: task.id,
        },
        data: {
            state: task.state,
            progress: task.progress,
            answerjson: answerjson,
        }
    }
    ); 
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

// async function checkState(task, modelId, questionId) {
//     const updated_task = await prisma.task.findUnique({
//         where: {
//             id: task.id,
//         },
//     });
//     if (updated_task.state == 1) {
//         return true;
//     }
//     else {
//         // 重新存储task的进度
//         if (task.dataset.questionType == 0) {
//             task.progress = (modelId * task.dataset.ChoiceQuestions.length + questionId) / (Object.keys(task.modelIds).length * task.dataset.ChoiceQuestions.length);
//         }
//         else if (task.dataset.questionType == 1) {
//             task.progress = (modelId * task.dataset.ShortAnswerQuestions.length + questionId) / (Object.keys(task.modelIds).length * task.dataset.ShortAnswerQuestions.length);
//         }
//         return false;
//     }
// }

/*
只用于客观题的自动化评测
根据answerjson，更新task对应score数据库中的条目，并且更新task的scoresjson
*/
async function calculateScore(task, answerjson, judgejson) {
    let scorejson = {};
    const modelIds = Object.values(task.modelIds);
    const ChoiceQuestions = task.dataset.ChoiceQuestions;
    for (let i = 0; i < modelIds.length; i++) {
        const modelId = modelIds[i];
        const score = await prisma.score.findUnique({
            where: {
                id: task.modelscoreIdjson[modelId],
            },
        });
        // 在该模型-数据集对应的score条目中，更新progress和correctCount
        for (let j = score.progress; j < ChoiceQuestions.length; j++) {
            score.progress += 1;
            if (ChoiceQuestions[j].answer == answerjson[modelId][ChoiceQuestions[j].id]) {
                score.correctCount += 1;
                // 向judgejson中更新该条目的正确性
                judgejson[modelId][ChoiceQuestions[j].id] = true;
            }
            else {
                judgejson[modelId][ChoiceQuestions[j].id] = false;
            }
        }
        score.score = score.correctCount / score.totalCount;    
        // 更新Score数据库中的记录,由于findUnique方法必须要有id，所以需要使用findMany方法
        await prisma.score.update({
                where: {
                    id: score.id,
                },
                data: {
                    progress: score.progress,
                    correctCount: score.correctCount,
                    score: score.score,
                },
            });
        scorejson[modelId] = score.score;
    }
    await prisma.task.update({
        where: {
            id: task.id,
        },
        data: {
            scoresjson: scorejson,
        },
    });
    return {scorejson, judgejson};
}