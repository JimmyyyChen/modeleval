import React from "react";
import Link from "next/link";

export default function TestingDatasetInfo() {
  let demoDescription =
    " 这里是关于数据集的描述，这里是关于数据集的描述，这里是关于数据集的描述，这里是关于数据集的描述，这里是关于数据集的描述，这里是关于数据集的描述，这里是关于数据集的描述.";

  if (demoDescription.length > 50) {
    demoDescription = demoDescription.slice(0, 50) + "...";
  }

  return (
    <div className="w-full flex-wrap items-center space-y-2 overflow-hidden rounded-3xl border bg-base-100 p-6">
      <h2 className="flex flex-wrap items-center space-x-3 ">
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
