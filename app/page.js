"use client";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="w-full space-y-3 text-left">
      <div className="flex flex-col items-center sm:flex-row">
        <Image src="/logo.png" alt="logo" width={100} height={100} priority />
        <h1 className="font-['Monaco'] text-4xl font-bold tracking-tight text-primary  sm:text-6xl">
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

      {/* 当登录时显示新建测试按钮 */}
      <SignedIn>
        <Link
          className="btn btn-accent w-max rounded-full shadow-md"
          href="/tasks/new-task"
        >
          <PlusIcon className="h-6 w-6" />
          新建测试
        </Link>
      </SignedIn>

      <div className="h-5"></div>

      <div className="space-y-5 rounded-3xl bg-stone-50 p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-primary">模型能力评测榜单</h2>

        <div className="overflow-x-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
              // pinnedColumns: { left: ["model"] }, only work on @mui/x-data-grid-pro T_T
            }}
            hideFooter
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{
              borderColor: "transparent",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

const columns = [
  { field: "model", headerName: "模型", minWidth: 120, flex: 2 },
  {
    field: "average",
    headerName: "全局得分(不包含对抗测试)",
    minWidth: 120,
    flex: 2,
  },
  {
    field: "task1",
    headerName: "mmlu_select.csv 客观测试",
    minWidth: 120,
    flex: 2,
  },
  {
    field: "task2",
    headerName: "objectiv.csv 客观测试",
    minWidth: 120,
    flex: 2,
  },
  {
    field: "task3",
    headerName: "subjective.csv 主观测试",
    minWidth: 120,
    flex: 2,
  },
  {
    field: "task4",
    headerName: "subjective.csv 对抗测试1",
    minWidth: 120,
    flex: 2,
  },
  {
    field: "task4",
    headerName: "subjective.csv 对抗测试2",
    minWidth: 120,
    flex: 2,
  },
  {
    field: "task4",
    headerName: "anotherSubjective.csv 对抗测试1",
    minWidth: 120,
    flex: 2,
  },
];

const rows = [
  {
    id: 1,
    model: "mistral_7b",
    average: 0.9,
    task1: 0.9,
    task2: 0.9,
    task3: 0.9,
    task4: 0.9,
    task5: 0.9,
    task6: 0.9,
  },
  {
    id: 2,
    model: "qwen_7b_chat",
    average: 0.9,
    task1: 0.9,
    task2: 0.9,
    task3: 0.9,
    task4: 0.9,
    task5: 0.9,
    task6: 0.9,
  },
  {
    id: 3,
    model: "vicuna_7b",
    average: 0.9,
    task1: 0.9,
    task2: 0.9,
    task3: 0.9,
    task4: 0.9,
    task5: 0.9,
    task6: 0.9,
  },
  {
    id: 4,
    model: "zephyr_7b",
    average: 0.9,
    task1: 0.9,
    task2: 0.9,
    task3: 0.9,
    task4: 0.9,
    task5: 0.9,
    task6: 0.9,
  },
];
