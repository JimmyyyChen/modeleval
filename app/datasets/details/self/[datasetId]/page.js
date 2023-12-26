"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Labels from "@/app/components/Labels";
import Community from "@/app/components/Community";
import DatasetMainInfoDisplay from "@/app/datasets/components/DatasetMainInfoDisplay";
import ItemsModify from "./components/ItemsModify";

export default function Home({ params: { datasetId } }) {
  const [datasetInfo, setDatasetInfo] = useState({});
  const type = 1; // 0表示model,1表示dataset,2表示user,3表示tas

  useEffect(() => {
    const fetchDatasetInfo = async () => {
      try {
        const response = await axios.get(`/api/datasets/info/${datasetId}`);
        if (response.status >= 200 && response.status < 300) {
          setDatasetInfo(response.data);
        } else {
          setDatasetInfo({});
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        setDatasetInfo({});
        console.error("Error fetching data:", error);
      }
    };

    fetchDatasetInfo();
  }, [datasetId]);

  if (datasetInfo && datasetInfo.label_list) {
    var labelList = datasetInfo.label_list.map((item) => item.labelName);
  }

  return (
    <>
      <DatasetMainInfoDisplay datasetInfo={datasetInfo} />

      <div className="h-full w-full p-4">
        <Labels labelList={labelList} />
      </div>

      <div className="h-full w-full p-4 ">
        {datasetInfo && datasetInfo.id ? (
          <ItemsModify datasetInfo={datasetInfo} />
        ) : (
          <div className="h-full w-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            Loading...
          </div>
        )}
      </div>

      <div className="w-full p-4 text-4xl">
        <Community id={datasetId} type={type} />
      </div>
    </>
  );
}
