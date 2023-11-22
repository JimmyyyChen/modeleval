"use client";

import React from "react";
import { useRouter } from "next/navigation";

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
    const res = await fetch(`/api/testings/remove/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

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
    <div className="m-3 w-full flex-wrap items-center space-y-2 overflow-hidden rounded-3xl bg-base-100 p-3 shadow-xl sm:flex sm:space-y-0">
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
        <button className="btn btn-ghost rounded-full" onClick={deleteTesting}>
          <XMarkIcon className="h-5 w-5" />
        </button>
        <button className="btn btn-ghost rounded-full">
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
