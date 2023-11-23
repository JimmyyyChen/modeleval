"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { PlayIcon, PauseIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function TestingCard({
  id,
  name,
  sizeInMB,
  startTime,
  endTime,
  taskCount,
  completedTaskCount,
  type,
}) {
  const deleteTesting = async () => {
    try {
      await axios.delete(`/api/testings/remove/${id}`);
    } catch (error) {
      console.error(error);
    }

    router.refresh();
  };

  const router = useRouter();

  const progress = Math.round((completedTaskCount / taskCount) * 100);
  const completed = completedTaskCount === taskCount;

  const sizeInGB = (sizeInMB / 1024).toFixed(2);

  const formatedStartTime = startTime.toLocaleTimeString("en-US", {
    hour12: false,
  });

  let formatedEndTime = "";
  if (endTime) {
    formatedEndTime = endTime.toLocaleTimeString("en-US", {
      hour12: false,
    });
  }

  return (
    <div className=" w-full flex-wrap items-center space-y-2 overflow-hidden rounded-3xl bg-base-100 p-3 shadow-md sm:flex sm:space-y-0">
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
        <h2 className="text-xl font-bold">{name}</h2>
        {completed ? (
          <p className="text-gray-500">
            共{sizeInGB}GB • {formatedStartTime} 开始 • {formatedEndTime} 结束
          </p>
        ) : (
          <p className="text-gray-500">
            共{sizeInGB}GB • {formatedStartTime} 开始
          </p>
        )}
      </div>

      <div className="ml-auto space-x-1">
        <button className="btn btn-circle btn-ghost" onClick={deleteTesting}>
          <XMarkIcon className="h-5 w-5" />
        </button>
        <button className="btn btn-circle btn-ghost">
          <PauseIcon className="h-5 w-5" />
        </button>
        <button className="btn btn-neutral rounded-full ">
          <PlayIcon className="h-5 w-5" />
          {type}
        </button>
      </div>
    </div>
  );
}
