"use client";
import { datasetTypes } from "../../constants";
import DataTable from "../../components/DataTable";
import CheckCondition from "../../components/CheckCondition";
import Link from "next/link";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

export default function DatasetDisplay({ datasets, isvisitor }) {
  return (
    <div className="flex w-full flex-col space-y-6">
      <Link
        className="group btn btn-accent w-max rounded-3xl transition-all duration-300"
        href="/upload"
      >
        <CloudArrowUpIcon className="h-5 w-5" />
        <p className="w-0 break-keep opacity-0 transition-all duration-300 group-hover:w-24 group-hover:opacity-100">
          上传数据集
        </p>
      </Link>
      <div className="flex space-x-3">
        <div className="flex-grow">
          <CheckCondition title="数据集" labels={datasetTypes} />
        </div>
      </div>
      <DataTable items={datasets} type="datasets" isvisitor={isvisitor} />
    </div>
  );
}
