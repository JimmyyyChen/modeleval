import DataTable from "../components/DataTable";
import CheckCondition from "../components/CheckCondition";

export default function Home({ title, datasetLabels, datasets, isvisitor }) {
  return (
    <>
      {/* TODO: 数据集名称长度 */}
      <div className="w-full text-center text-4xl font-bold text-primary sm:text-left">
        {/* TODO: 添加图标 */}
        <p>{title}</p>
      </div>

      <div className="mt-6 flex w-full flex-wrap space-x-0 space-y-6 p-4 sm:flex-nowrap sm:space-x-6 sm:space-y-0">
        <div className="flex w-full flex-1 sm:w-1/3">
          <CheckCondition title="数据集" labels={datasetLabels} />
        </div>

        <div className="min-h-full w-full sm:w-2/3">
          <DataTable items={datasets} isvisitor={isvisitor} />
        </div>
      </div>
    </>
  );
}
