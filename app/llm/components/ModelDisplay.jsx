"use client";
import { modelTypes } from "../../constants";
import DataTable from "../../components/DataTable";
import CheckCondition from "../../components/CheckCondition";

export default function ModelDisplay({ models }) {
  return (
    <div className="flex flex-col space-y-6 w-full">
        <CheckCondition title="模型" labels={modelTypes} />
        <DataTable items={models} type="llm" isvisitor={true} />
    </div>
  );
}
