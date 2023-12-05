import { datasets, datasetLabels } from "./data";
import DatasetDisplay from "../DatasetDisplay"

export default function Home() {
  return (
    <DatasetDisplay
      title="我的数据集"
      datasets={datasets}
      datasetLabels={datasetLabels}
      isVisitor={false}
    />
  );
}
