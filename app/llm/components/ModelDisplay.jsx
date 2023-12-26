"use client";
import { modelTypes } from "../../constants";
import DataTable from "../../components/DataTable";
import CheckCondition from "../../components/CheckCondition";

export default function ModelDisplay({ title, models }) {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <div>
        <CheckCondition title="模型" labels={modelTypes} />
      </div>

      <div>
        <DataTable items={models} type="llm" isvisitor={true} />
      </div>
    </div>
  );
}
