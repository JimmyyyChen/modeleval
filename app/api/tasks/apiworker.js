const { parentPort } = require('worker_threads');
const { PrismaClient } = require('@prisma/client');
const getModelAnswer = require("./api.js");
const getModelAnswerBlock = require("./api.js");
// const amqp = require('amqplib');
// const EventEmitter = require('events');
// const eventEmitter = new EventEmitter();


const prisma = new PrismaClient();
// RabbitMQ连接设置
// const amqpUrl = 'amqp://localhost'; // 根据实际情况修改RabbitMQ服务器地址
// const queue = 'task_control'; // 控制命令队列名称

// 全局变量，用于存储当前任务的暂停状态
let pauseTask = {"taskId": "", "state": "run"};

// async function connectRabbitMQ() {
    //const connection = await amqp.connect(amqpUrl);
    //const channel = await connection.createChannel();
    
    //await channel.assertQueue(queue, { durable: false });
    //console.log(" [*] Waiting for messages in %s.", queue);
    
    //channel.consume(queue, function(msg) {
        //console.log(" [x] Received %s", msg.content.toString());
        //pauseTask= JSON.parse(msg.content.toString());
        //eventEmitter.emit('pauseTaskUpdated', pauseTask);
    //}, { noAck: true });
//}
// 启动RabbitMQ连接
//connectRabbitMQ();
// 事件监听
//eventEmitter.on('pauseTaskUpdated', (updatedPauseTask) => {
    // 可以在这里处理更新后的pauseTask
    // 例如，调用checkPauseTask或其他相关函数
    //console.log("pauseTask has been updated: ", updatedPauseTask);
    // 您可以在这里加入调用checkPauseTask的逻辑
//});

parentPort.on('message', async (data) => {
    try {

        async function checkPauseTask(taskId) {
            // 检查pauseTask变量，确定是否暂停任务
            // console.log("in checkPausetask: " + pauseTask.taskId + " " + pauseTask.state);
            console.log("in checkPausetask return value: " + (pauseTask.taskId == taskId && pauseTask.state == "pause"));
            return (pauseTask.taskId == taskId && pauseTask.state == "pause");
        }

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
        let answerjson = task.answerjson;
        const ChoiceQuestions = task.dataset.ChoiceQuestions;
        const ShortAnswerQuestions = task.dataset.ShortAnswerQuestions;
        let modelIds = [];
        for (let key in task.modelIds) {
            modelIds.push(task.modelIds[key]);
        }
                
        let [currentModelId, currentQuestionId] = recoverFrom(task, task.progress);
        console.log("currentModelId: " + currentModelId);
        console.log("currentQuestionId: " + currentQuestionId);
        // 根据type(0 or 1)类型选择不同的处理方法
        if (task.questionType == 0) {
            const prompt = "Please answer the following multiple-choice questions with only the choice index (A, B, C, or D) as your response. Note: Respond with only the letter of the correct answer (e.g., A, B, C, D)."
            // 获取全部的客观选择题
            let i, j;
            // 遍历所有需要跑的模型
            for (i = currentModelId; i < modelIds.length; i++) {
                if (await checkPauseTask(taskId)==true) {
                    break;
                }
                const model = await prisma.model.findUnique({
                    where: {
                        modelid: modelIds[i],
                    },
                });

                // 遍历所有的客观选择题
                for (j = currentQuestionId; j < ChoiceQuestions.length; j++) {
                    if (await checkPauseTask(taskId)==true) {
                        break;
                    }
                    answerjson[model.modelid]["answers"][j] = {};
                    const question = ChoiceQuestions[j].question;
                    answerjson[model.modelid]["answers"][j]["question"] = question;
                    const allChoices = ChoiceQuestions[j].choices;
                    let choices = "";
                    // console.log(allChoices);
                    choices = choices + allChoices[0].content + '\n';
                    answerjson[model.modelid]["answers"][j]["optionA"] = allChoices[0].content;
                    choices = choices + allChoices[1].content + '\n';
                    answerjson[model.modelid]["answers"][j]["optionB"] = allChoices[1].content;
                    choices = choices + allChoices[2].content + '\n';
                    answerjson[model.modelid]["answers"][j]["optionC"] = allChoices[2].content;
                    choices = choices + allChoices[3].content + '\n';
                    answerjson[model.modelid]["answers"][j]["optionD"] = allChoices[3].content;
                    
                    const answer = await getModelAnswer(model.modelName, prompt+'\n'+question+'\n'+choices);
                    // 将answer更新到存储变量'answerjson'中
                    answerjson[model.modelid]["answers"][j]["generatedAnswer"] = answer;
                    answerjson[model.modelid]["answers"][j]["correctAnswer"] = ChoiceQuestions[j].correctAnswer;
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
                task.scoresjson = await calculateScore(task, answerjson);
            }
            else {
                task.state = 2;
            }
        }
        else { // 进行主观测评和对抗性评测
            let i, j;
            for (i = currentModelId; i < modelIds.length; i++) {
                if (await checkPauseTask(taskId)==true) {
                    break;
                }
                const model = await prisma.model.findUnique({
                    where: {
                        modelid: modelIds[i],
                    },
                });
                for (j = currentQuestionId; j < ShortAnswerQuestions.length; j++) {
                    if (await checkPauseTask(taskId)==true) {
                        break;
                    }
                    answerjson[model.modelid]["answers"][j] = {};
                    const question = ShortAnswerQuestions[j].question;
                    answerjson[model.modelid]["answers"][j]["question"] = question;
                    const answer = getModelAnswerBlock(model.modelName, question);
                    // 将answer更新到存储变量'answers'中
                    answerjson[model.modelid]["answers"][j]["generatedAnswer"] = answer;
                    answerjson[model.modelid]["answers"][j]["sampleAnswer"] = ShortAnswerQuestions[j].sampleAnswer;
                    // 更新本地的进度
                    task.progress = (i * ShortAnswerQuestions.length + j) / (modelIds.length * ShortAnswerQuestions.length);
                    console.log("task progress:" + task.progress);
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
                scoresjson: task.scoresjson,
            }
        }
        );
        parentPort.postMessage({ success: true, updatedTask: updatedTask });
    } catch (error) {
        console.log(error);
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
        datasetLength = task.dataset.ChoiceQuestions.length;
    }
    else {
        datasetLength = task.dataset.ShortAnswerQuestions.length;
    }
    const totalLength = modelsLength * datasetLength;
    const currentLength = parseInt(progress * totalLength);
    const currentModelId = currentLength % modelsLength;
    const currentQuestionId = currentLength / modelsLength;
    return [currentModelId, currentQuestionId];
}

/*
只用于客观题的自动化评测
根据answerjson，更新task对应score数据库中的条目，并且更新task的scoresjson
*/
async function calculateScore(task, answerjson) {
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
            if (findABCD(ChoiceQuestions[j].correctAnswer) == findABCD(answerjson[modelId]["answers"][j]["generatedAnswer"])) {
                score.correctCount += 1;
                answerjson[modelId]["answers"][j]["isCorrect"] = true;
            }
            else {
                answerjson[modelId]["answers"][j]["isCorrect"] = false;
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
            answerjson: answerjson,
        },
    });
    return scorejson;
}

// 正则表达式寻找模型给出的选择题答案
function findABCD(answerstr) {
    const regex = /[A-D]/g;
    let match;
    while ((match = regex.exec(answerstr)) != null) {
        return match[0];
    }
}