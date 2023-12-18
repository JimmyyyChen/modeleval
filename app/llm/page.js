"use client";
import { datasets, datasetLabels } from "./data";
import ModelDisplay from "./ModelDisplay";

// TODO: 组件化
export default function Home() {
  return (
    <ModelDisplay title="模型" models={datasets} modelLabels={datasetLabels} />
  );
}
