"use client";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";

import { DataGrid } from "@mui/x-data-grid";

export default function HomePage() {
  return (
    <div className="w-full text-left space-y-3">
      <div className="flex flex-col items-center sm:flex-row">
        <img src="/logo.png" alt="logo" className="h-24" />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          ModelEval
        </h1>
      </div>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        ModelEval旨在为用户提供一个全面评估和比较不同大模型能力的平台。它
        将提供一个开源免费的评测平台。开发者可以在这个平台上上传自己的数据集，并对不同模型在不同数据集上的性能进行包括客观评测、主观评测和对抗性评测在内的全面评估和比较。ModelEval将提供详细的模型能力评测榜单，帮助开发者了解各个模型的优势和限制。
      </p>
      {/* 当登出时显示注册登录按钮 */}
      <SignedOut>
        <div className="justify-left mt-10 flex items-center gap-x-3">
          <Link href="/sign-up" className="btn btn-accent">
            注册
          </Link>
          <Link href="/sign-in" className="btn btn-secondary">
            登录
          </Link>
        </div>
      </SignedOut>

      <h2 className="text-3xl font-bold">
        模型能力评测榜单
      </h2>

      <div className="overflow-x-auto">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}

const columns = [
  { field: "id", headerName: "ID", minWidth: 30, flex: 1 },
  { field: "dataset", headerName: "数据集", minWidth: 120, flex: 2 },
  {
    field: "GPT4_automated",
    headerName: "GPT4客观测试",
    minWidth: 120,
    flex: 2,
  },
  {
    field: "GPT3_automated",
    headerName: "GPT3.5客观测试",
    minWidth: 120,
    flex: 2,
  },
  { field: "GPT4_human", headerName: "GPT4主观测试", minWidth: 120, flex: 2 },
  { field: "GPT3_human", headerName: "GPT3.5主观测试", minWidth: 120, flex: 2 },
  {
    field: "GPT4_comparative",
    headerName: "GPT4对抗测试",
    minWidth: 120,
    flex: 2,
  },
  {
    field: "GPT3_comparative",
    headerName: "GPT3.5对抗测试",
    minWidth: 120,
    flex: 2,
  },
];

const rows = [
  {
    id: 1,
    dataset: "mmlu_select",
    GPT4_automated: "0.5",
    GPT3_automated: "0.6",
    GPT4_human: "untested",
    GPT3_human: "untested",
    GPT4_comparative: "untested",
    GPT3_comparative: "untested",
  },
  {
    id: 2,
    dataset: "zbench_common",
    GPT4_automated: "untested",
    GPT3_automated: "untested",
    GPT4_human: "0.7",
    GPT3_human: "0.8",
    GPT4_comparative: "0.9",
    GPT3_comparative: "0.9",
  },
];
