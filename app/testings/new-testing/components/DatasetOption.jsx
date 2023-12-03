"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function DatasetOption({ isSelected }) {
  let demoDescription =
    " 这里是关于数据集的描述，这里是关于数据集的描述，这里是关于数据集的描述，这里是关于数据集的描述，这里是关于数据集的描述，这里是关于数据集的描述，这里是关于数据集的描述.";

  if (demoDescription.length > 50) {
    demoDescription = demoDescription.slice(0, 50) + "...";
  }

  return (
    <div
      className={` ${
        isSelected ? "border-2 border-teal-700" : ""
      } w-full flex-wrap items-center space-y-2 overflow-hidden rounded-3xl border bg-base-100 p-6`}
    >
      <h2 className="flex flex-wrap items-center space-x-3 ">
        <div
          className={` h-4 w-4 rounded-full ${
            isSelected ? "border-4 border-teal-700" : "border border-gray-500"
          }`}
        ></div>

        <p className=" font-mono text-xl font-bold">mmlu_select</p>
        {/* TODO: link to corresponded dataset */}
        <Link className="link-primary link text-sm" href="/datasets">
          查看更多
        </Link>
      </h2>

      <p className="text-sm text-gray-500">{demoDescription}</p>

      <div className="ml-auto space-x-1 font-medium text-gray-800">
        选择问题 • 101KB • 2023/12/31 23:59
      </div>
    </div>
  );
}
