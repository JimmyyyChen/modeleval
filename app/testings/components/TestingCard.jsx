import React from "react";

export default function TestingCard() {
  return (
    <div className="rounded-3xl overflow-hidden w-full p-3 bg-base-100 shadow-xl items-center sm:flex flex-wrap">
      <div className="p-3">
        <h2 className="text-xl font-bold">Example Task</h2>
        <p className="text-gray-500">已测试14GB • 14:00 开始</p>
      </div>

      <div className="ml-auto p-3 space-x-3">
        <div
          className="radial-progress"
          style={{ "--value": 70, "--size": "3rem" }}
          role="progressbar"
        >
          70%
        </div>

        <button className="btn btn-neutral rounded-full ">客观评测</button>
      </div>
    </div>
  );
}
