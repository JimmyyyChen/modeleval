import { datasets, datasetLabels } from "./data";
import DatasetDisplay from "../DatasetDisplay"

export default function Home({ params: { name } }) {
  return (
    <DatasetDisplay
      title={`${name}的数据集`}
      datasets={datasets}
      datasetLabels={datasetLabels}
      isVisitor={true}
    />
  );
}
