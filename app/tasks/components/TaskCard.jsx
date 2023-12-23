"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import {
  XMarkIcon,
  CheckCircleIcon,
  ScaleIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

export default function TaskCard({ task }) {
  const id = task.id;
  const taskName = task.taskName;
  const questionType = task.questionType;
  const startTime = new Date(task.startTime);
  const [endTime, setEndTime] = useState(new Date(task.endTime));
  const [progress, setProgress] = useState(task.progress);
  // TODO
  const isEvaluated = false;

  // 定时获取指定taskId的任务 `GET /api/tasks/info/taskId/{taskId}` 来获取实时的进度progress
  useEffect(() => {
    const interval = setInterval(async () => {
      if (progress === 1) {
        return () => clearInterval(interval);
      }

      try {
        const response = await axios.get(`/api/tasks/info/taskId/${id}`);
        const data = response.data[0];
        setProgress(data.progress);
        if (data.progress === 1) {
          setEndTime(new Date(data.endTime));
        }
      } catch (error) {
        console.error(error);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [id, progress]);

  const deleteTask = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`/api/tasks/operations/deleteTask/${id}`);
    } catch (error) {
      console.error(error);
    }

    router.refresh();
  };

  const router = useRouter();

  const formatedStartTime = startTime.toLocaleString();

  return (
    <Link
      href={`/tasks/${id}`}
      className=" w-full flex-wrap items-center space-y-2 overflow-hidden rounded-3xl bg-base-100 p-5 shadow-md hover:bg-gray-50 focus:ring focus:ring-gray-200 sm:flex sm:space-y-0"
    >
      <StatusIndicator
        questionType={questionType}
        progress={progress}
        isEvaluated={isEvaluated}
      />

      {/* space */}
      <div className="w-3"></div>

      <div>
        <h2 className="text-xl font-bold">{taskName}</h2>
        {/* if completed */}
        {progress === 1 ? (
          <p className="text-gray-500">
            {startTime.toLocaleString()} 开始 • {endTime.toLocaleString()} 结束
          </p>
        ) : (
          <p className="text-gray-500">{formatedStartTime} 开始</p>
        )}
      </div>

      <div className="ml-auto space-x-1">
        <button className="btn btn-circle btn-ghost " onClick={deleteTask}>
          <XMarkIcon className="h-5 w-5" />
        </button>
        {/* TODO */}
        {/* <button className="btn btn-circle btn-ghost">
          <PauseIcon className="h-5 w-5" />
        </button> */}
      </div>
    </Link>
  );
}

function StatusIndicator({ questionType, progress, isEvaluated }) {
  const Layout = ({ children }) => (
    <div className="flex h-16 w-18 flex-col items-center text-center">
      {children}
    </div>
  );

  if (questionType === 0) {
    if (progress === 1) {
      return (
        <Layout>
          <CheckCircleIcon className="h-10 w-10 text-green-500" />
          <p className="h-5 text-sm text-green-500">测试完成</p>
        </Layout>
      );
    }
  } else if (progress == 1 && !isEvaluated) {
    if (questionType === 1 && !isEvaluated) {
      return (
        <Layout>
          <EyeIcon className="h-10 w-10 text-accent" />
          <p className="h-5 text-sm text-accent">等待主观评测</p>
        </Layout>
      );
    } else if (questionType === 2 && !isEvaluated) {
      return (
        <Layout>
          <ScaleIcon className="h-10 w-10 text-accent" />
          <p className="h-5 text-sm text-accent">等待对抗评测</p>
        </Layout>
      );
    }
  }

  // else, return progress
  return (
    <Layout>
      <div
        className="radial-progress text-blue-500"
        style={{
          "--value": Math.round(progress * 100),
          "--size": "3rem",
        }}
        role="progressbar"
      >
        {Math.round(progress * 100)}%
      </div>
      <p className="h-5 text-sm text-blue-500">生成回答</p>
    </Layout>
  );
}
