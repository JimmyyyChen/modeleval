"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Link from "next/link";

import { PauseIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function TaskCard({ task }) {
  const id = task.id;
  const taskName = task.taskName;
  const progress = task.progress;
  const completed = progress === 1;
  const startTime = task.startTime;
  const endTime = task.endTime;

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

  // const progress = Math.round((completedTaskCount / taskCount) * 100);
  // const completed = completedTaskCount === taskCount;

  const formatedStartTime = startTime.toLocaleString();

  let formatedEndTime = "";
  if (endTime) {
    formatedEndTime = endTime.toLocaleTimeString("en-US", {
      hour12: false,
    });
  }

  return (
    <Link
      href={`/tasks/${id}`}
      className=" w-full flex-wrap items-center space-y-2 overflow-hidden rounded-3xl bg-base-100 p-5 shadow-md hover:bg-gray-50 focus:ring focus:ring-gray-200 sm:flex sm:space-y-0"
    >
      <div
        className="radial-progress"
        style={{ "--value": progress, "--size": "3.3rem" }}
        role="progressbar"
      >
        {progress}%
      </div>

      {/* space */}
      <div className="w-3"></div>

      <div>
        <h2 className="text-xl font-bold">{taskName}</h2>
        {completed ? (
          <p className="text-gray-500">
            {formatedStartTime} 开始 • {formatedEndTime} 结束
          </p>
        ) : (
          <p className="text-gray-500">{formatedStartTime} 开始</p>
        )}
      </div>

      <div className="ml-auto space-x-1">
        <button className="btn btn-circle btn-ghost " onClick={deleteTask}>
          <XMarkIcon className="h-5 w-5" />
        </button>
        <button className="btn btn-circle btn-ghost">
          <PauseIcon className="h-5 w-5" />
        </button>
      </div>
    </Link>
  );
}
