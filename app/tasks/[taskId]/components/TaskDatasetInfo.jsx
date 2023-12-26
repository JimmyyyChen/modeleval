import React from "react";
import Link from "next/link";

export default function TaskDatasetInfo({ dataset }) {
  if (!dataset) {
    return (
      <div className="flex justify-center text-gray-500">请等待数据集加载</div>
    );
  }

  const datasetName = dataset.datasetName;
  const description = dataset.description;
  const questionType = dataset.questionType ? "问答题" : "选择题";
  const sizeInMB = dataset.sizeInMB; // TODO: this is not sizeInMb anymore??? it's now 条目数
  const lastUpdateText = new Date(dataset.lastUpdate).toLocaleString();

  return (
    <div className="w-full flex-wrap items-center space-y-2 overflow-hidden rounded-3xl border bg-base-100 p-6">
      <h2 className="flex flex-wrap items-center space-x-3 ">
        <p className=" font-mono text-xl font-bold">{datasetName}</p>
        {/* TODO: link to corresponded dataset */}
        <Link
          className="link-primary link text-sm"
          href={`/datasets/details/visitor/${datasetName}/`}
        >
          查看更多
        </Link>
      </h2>

      <p className="text-sm text-gray-500">{description}</p>

      <div className="ml-auto space-x-1 font-medium text-gray-800">
        {questionType} • 条目数量 {sizeInMB}  • {lastUpdateText}
      </div>
    </div>
  );
}
