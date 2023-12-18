import React from "react";
import Link from "next/link";

export default function TaskDatasetInfo({dataset}) {
  const description = dataset.description;
  const questionType = dataset.questionType ? "问答题" : "选择题";
  const sizeInMB = dataset.sizeInMB;
  const lastUpdate = dataset.lastUpdate.toLocaleString();

  return (
    <div className="w-full flex-wrap items-center space-y-2 overflow-hidden rounded-3xl border bg-base-100 p-6">
      <h2 className="flex flex-wrap items-center space-x-3 ">
        <p className=" font-mono text-xl font-bold">mmlu_select</p>
        {/* TODO: link to corresponded dataset */}
        <Link className="link-primary link text-sm" href="/datasets">
          查看更多
        </Link>
      </h2>

      <p className="text-sm text-gray-500">{description}</p>

      <div className="ml-auto space-x-1 font-medium text-gray-800">
        {questionType} • {sizeInMB} MB • {lastUpdate}
      </div>
    </div>
  );
}
