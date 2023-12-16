import { datasets, datasetLabels } from "./data";
import DatasetDisplay from "./DatasetDisplay"

// TODO: 组件化
export default function Home() {
  return (
    <DatasetDisplay
      title="数据集"
      datasets={datasets}
      datasetLabels={datasetLabels}
      isvisitor={true}
    />
  );
}
