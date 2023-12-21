"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProgressBar({ task }) {
  const id = task.id;
  const startTime = task.startTime;
  const [endTime, setEndTime] = useState(task.endTime);
  const [progress, setProgress] = useState(task.progress);

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
          setEndTime(new Date());
        }
      } catch (error) {
        console.error(error);
      }
    }, 1000); // 1s
    return () => clearInterval(interval);
  }, [id, progress]);

  return (
    <div>
      <progress
        className="progress h-3 w-full"
        value={progress}
        max="1"
      ></progress>
      <p className="text-gray-500">
        {progress === 1
          ? `已完成 | 用时${Math.round((endTime - startTime) / 1000)}秒`
          : `完成${Math.floor(progress * 100)}% | 用时${Math.round(
              (Date.now() - startTime) / 1000,
            )}秒`}
      </p>
      <p className="text-gray-500">{startTime.toLocaleString()}</p>
    </div>
  );
}
