"use client";
import { CubeIcon } from "@heroicons/react/24/solid";
import { modelTypes } from "../../constants";
import DataTable from "../../components/DataTable";
import CheckCondition from "../../components/CheckCondition";

export default function ModelDisplay({ models }) {
  return (
    <div className="flex w-full flex-col space-y-6">
      <div className="flex flex-row items-center space-x-4 text-left text-4xl font-bold text-primary">
        <CubeIcon
          className="h-12 w-12"
          aria-hidden="true"
        ></CubeIcon>
        <span>模型</span>
      </div>
      <CheckCondition title="模型" labels={modelTypes} />
      <DataTable items={models} type="llm" isvisitor={true} />
    </div>
  );
}
