import React from "react";

export default function TestingCard({
  name,
  sizeInMB,
  startTime,
  endTime,
  taskCount,
  completedTaskCount,
  type,
}) {

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
    <div className="m-3 w-full flex-wrap items-center overflow-hidden rounded-3xl bg-base-100 p-2 shadow-xl sm:flex">
      <div className="p-3">
        <h2 className="text-xl font-bold">{name}</h2>
        {completed ? (
          <p className="text-gray-500">
            共{sizeInGB}GB • {formatedStartTime} 开始 • {formatedEndTime}{" "}
            结束
          </p>
        ) : (
          <p className="text-gray-500">
            共{sizeInGB}GB • {formatedStartTime} 开始
          </p>
        )}
      </div>

      <div className="ml-auto space-x-3 p-3">
        <div
          className="radial-progress"
          style={{ "--value": progress, "--size": "3.3rem" }}
          role="progressbar"
        >
          {progress}%
        </div>

        <button className="btn btn-neutral rounded-full ">{type}</button>
      </div>
    </div>
  );
}
