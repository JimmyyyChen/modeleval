import React from "react";
import Link from "next/link";

export default function DatasetOption({ dataset, isSelected }) {
  const description = dataset.description;
  const datasetName = dataset.datasetName;
  const datasetId = dataset.id;
  const questionType = dataset.questionType ? "问答题" : "选择题";
  const sizeInMB = dataset.sizeInMB; //  this is not sizeInMb anymore??? it's now 条目数
  const date = new Date(dataset.lastUpdate);
  const lastUpdate = date.toLocaleString();

  return (
    <div
      className={` ${isSelected ? "ring-2 ring-teal-700" : ""
        } w-full flex-wrap items-center space-y-2 overflow-hidden rounded-3xl border bg-base-100 p-6`}
    >
      <h2 className="flex flex-wrap items-center space-x-3 ">
        <div
          className={` h-4 w-4 rounded-full ${isSelected ? "border-4 border-teal-700" : "border border-gray-500"
            }`}
        ></div>

        <p className=" font-mono text-xl font-bold">{datasetName}</p>
        <Link className="link-primary link text-sm" href={`/datasets/details/visitor/${datasetId}/`}>
          查看更多
        </Link>
      </h2>

      <p className="text-sm text-gray-500">{description}</p>

      <div className="ml-auto space-x-1 font-medium text-gray-800">
        {questionType} • 条目数量 {sizeInMB} • {lastUpdate}
      </div>
    </div>
  );
}
