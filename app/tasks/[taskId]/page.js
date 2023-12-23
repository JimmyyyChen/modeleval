"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { ScaleIcon } from "@heroicons/react/24/solid";
import TaskDatasetInfo from "./components/TaskDatasetInfo";
import TaskModelInfo from "./components/TaskModelInfo";
import ResultTable from "./components/ResultTable";

export default function TaskDisplayPage({ params }) {
  const taskId = parseInt(params.taskId);
  const [task, setTask] = useState({});
  const [areAnswersGenerated, setAreAnswersGenerated] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (areAnswersGenerated === 1) {
        return () => clearInterval(interval);
      }

      try {
        const response = await axios.get(`/api/tasks/info/taskId/${taskId}`);
        const data = response.data[0];
        setTask(data);
        if (data.progress === 1) {
          setAreAnswersGenerated(true);
        }
      } catch (error) {
        console.error(error);
      }
    }, 1000); // 1s
    return () => clearInterval(interval);
  }, [areAnswersGenerated, taskId]);

  // return loading if task is not loaded
  if (task === undefined) {
    return (
      // make it in the middle of the page
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  const taskName = task.taskName;
  const dataset = task.dataset;
  const questionType = task.questionType; // 0: 客观测试, 1: 主观测试, 2: 对抗测试
  const models = task.models;
  const progress = task.progress; // from 0 to 1
  const startTime = new Date(task.startTime);
  const endTime = new Date(task.endTime);
  const answerjson = task.answerjson;
  const scoresjson = task.scoresjson;

  return (
    // unvisble at first, then fade in after isVisble is true
    // <div className="flex w-full flex-col space-y-5">
    <div className="flex w-full flex-col space-y-5">
      <h1 className=" font-mono text-4xl font-bold text-primary">{taskName}</h1>

      {/* Progress */}
      <div>
        <progress
          className="progress h-3 w-full"
          value={progress}
          max="1"
        ></progress>
        <p className="text-gray-500">
          {progress === 1
            ? `已生成回答 | ${startTime.toLocaleString()}开始 | 用时${Math.round(
                (endTime - startTime) / 1000,
              )}秒| ${endTime.toLocaleString()}结束 `
            : `正在生成回答 ${Math.floor(progress * 100)}% | 用时${Math.round(
                (Date.now() - startTime) / 1000,
              )}秒 | ${startTime.toLocaleString()}开始 `}
        </p>
      </div>

      <h2 className="text-2xl font-bold">评测</h2>
      {areAnswersGenerated && questionType !== 2 ? (
        Object.keys(answerjson).map((modelId) => (
          <ResultTable
            key={modelId}
            score={scoresjson[modelId]}
            modelName={answerjson[modelId].modelName}
            evalRef={
              questionType === 1
                ? `/tasks/human-evaluation/${taskId}-${modelId}`
                : questionType === 2
                  ? `/tasks/comparative-evaluation/${taskId}-${modelId}`
                  : null
            }
            questionType={questionType}
            answers={answerjson[modelId].answers}
          />
        ))
      ) : questionType === 2 ? (
        <div className="flex flex-col space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {scoresjson ? (
              Object.keys(scoresjson).map((modelId) => (
                <div
                  key={modelId}
                  className="flex flex-col space-y-1 overflow-hidden rounded-2xl border bg-white p-5"
                >
                  <h3 className="font-mono text-xl font-bold text-primary">
                    {
                      models.find(
                        (model) => model.modelid === parseInt(modelId),
                      ).modelName
                    }
                  </h3>

                  <p className="font-bold">{(scoresjson[modelId] * 100).toFixed(2)} 分</p>
                </div>
              ))
            ) : (
              <span className="loading loading-dots loading-xs self-center"></span>
            )}
          </div>
          <Link
            className="btn btn-accent w-max rounded-3xl "
            href={`/tasks/comparative-evaluation/${taskId}`}
          >
            <ScaleIcon className="h-5 w-5" />
            进行对抗评测
          </Link>
        </div>
      ) : (
        <span className="text-gray-500">请等待回答生成</span>
      )}

      <h2 className="text-2xl font-bold">数据集</h2>
      {dataset ? (
        <TaskDatasetInfo dataset={dataset} />
      ) : (
        <span className="loading loading-dots loading-xs self-center"></span>
      )}

      <h2 className="text-2xl font-bold">模型</h2>
      {models ? (
        models.map((model) => <TaskModelInfo model={model} key={model.id} />)
      ) : (
        <span className="loading loading-dots loading-xs self-center"></span>
      )}
    </div>
  );
}
