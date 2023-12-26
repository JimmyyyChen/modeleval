"use client";
import { datasetTypes } from "../../constants";
import DataTable from "../../components/DataTable";
import CheckCondition from "../../components/CheckCondition";
import Link from "next/link";

export default function Home({ title, datasets, isvisitor }) {
  return (
    <div className="flex w-full flex-col space-y-3">
      <div className="flex">
        {/* 设置 flex-grow 使 CheckCondition 占据更多空间 */}
        <div className="flex-grow">
          <CheckCondition title="数据集" labels={datasetTypes} />
        </div>
        <Link href="/upload" className="btn btn-accent rounded-3xl">
          上传数据集
        </Link>
      </div>
      <DataTable items={datasets} type="datasets" isvisitor={isvisitor} />
    </div>
  );
}
