"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import { XMarkIcon } from "@heroicons/react/24/solid";

export default function TaskCard({ task }) {
  const id = task.id;
  const taskName = task.taskName;
  const startTime = task.startTime;
  const [endTime, setEndTime] = useState(null);
  const [progress, setProgress] = useState(0);

  // 定时获取指定taskId的任务 `GET /api/tasks/info/taskId/{taskId}` 来获取实时的进度progress
  useEffect(() => {
    let isTaskCompleted = false; 

    const interval = setInterval(async () => {
      if (isTaskCompleted) {
        return () => clearInterval(interval);
      }

      try {
        const response = await axios.get(`/api/tasks/info/taskId/${id}`);
        const data = response.data[0];
        setProgress(data.progress);
        if (data.progress === 1) {
          setEndTime(new Date());
          isTaskCompleted = true;
        }
      } catch (error) {
        console.error(error);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [id]);

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
      <div
        className="radial-progress"
        style={{ "--value": Math.round(progress * 100), "--size": "3.3rem" }}
        role="progressbar"
      >
        {Math.round(progress * 100)}%
      </div>

      {/* space */}
      <div className="w-3"></div>

      <div>
        <h2 className="text-xl font-bold">{taskName}</h2>
        {/* if completed */}
        {progress === 1 ? (
          <p className="text-gray-500">
            {formatedStartTime} 开始 • {endTime.toLocaleTimeString()} 结束
          </p>
        ) : (
          <p className="text-gray-500">{formatedStartTime} 开始</p>
        )}
      </div>

      <div className="ml-auto space-x-1">
        <button className="btn btn-circle btn-ghost " onClick={deleteTask}>
          <XMarkIcon className="h-5 w-5" />
        </button>
        {/* <button className="btn btn-circle btn-ghost">
          <PauseIcon className="h-5 w-5" />
        </button> */}
      </div>
    </Link>
  );
}
