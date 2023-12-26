"use client";
import { datasetTypes } from "../../constants";
import DataTable from "../../components/DataTable";
import CheckCondition from "../../components/CheckCondition";

export default function Home({ title, datasets, isvisitor }) {
  return (
    <div className="flex flex-col space-y-6">
      <CheckCondition title={title} labels={datasetTypes} />
      <DataTable items={datasets} type="datasets" isvisitor={isvisitor} />
    </div>
  );
}
