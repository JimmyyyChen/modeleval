import React from "react";

export default function TestingCard({
  name,
  size, // in GB
  startTime,
  endTime,
  progress,
  type,
}) {
  if (progress < 0 || progress > 100) {
    throw new Error("Progress should be between 0 to 100");
  }

  if (progress !== 100 && endTime !== null) {
    throw new Error("End time should be null if progress is not 100");
  }

  if (progress === 100 && typeof endTime === null) {
    throw new Error("End time should not be null if progress is 100");
  }

  const completed = progress === 100;

  // convert time to string. e.g. 15:20:03
  const formatedStartTime = new Date(startTime).toLocaleTimeString("en-US", {
    hour12: false,
  });

  const formatedEndTime = new Date(endTime).toLocaleTimeString("en-US", {
    hour12: false,
  });

  return (
    <div className="w-full flex-wrap items-center overflow-hidden rounded-3xl bg-base-100 p-2 shadow-xl sm:flex m-3">
      <div className="p-3">
        <h2 className="text-xl font-bold">{name}</h2>
        {completed ? (
          <p className="text-gray-500">
            共{size}GB • {formatedStartTime} 开始 • {formatedEndTime} 结束
          </p>
        ) : (
          <p className="text-gray-500">
            共{size}GB • {formatedStartTime} 开始
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
