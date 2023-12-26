"use client";
import { datasetTypes } from "../../constants";
import DataTable from "../../components/DataTable";
import CheckCondition from "../../components/CheckCondition";

export default function Home({ title, datasets, isvisitor }) {
  return (
    <div className="flex flex-col space-y-3">
      <div>
        <CheckCondition title="数据集" labels={datasetTypes} />
      </div>

      <div>
        <DataTable items={datasets} type="llm" isvisitor={isvisitor} />
      </div>
    </div>
  );
}
