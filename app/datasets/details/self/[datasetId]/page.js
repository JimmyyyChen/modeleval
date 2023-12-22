"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Labels from "@/app/components/Labels";
import {
  datasetItems,
  issues,
} from "./data";
import Community from "@/app/components/Community";
import MainInfoDisplay from "@/app/components/MainInfoDisplay";
import ItemsModify from "./components/ItemsModify";

export default function Home({ params: { datasetId } }) {
  const [datasetInfo, setDatasetInfo] = useState({});

  useEffect(() => {
    const fetchDatasetInfo = async () => {
      try {
        const response = await axios.get(`/api/datasets/info/${datasetId}`);
        if (response.status >= 200 && response.status < 300) {
          setDatasetInfo(response.data[0]);
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
  }
  , [datasetId]);

  if (datasetInfo && datasetInfo.label_list) {
    var labelList = datasetInfo.label_list.map((item) => item.labelName);
  }

  return (
    <>
      <MainInfoDisplay datasetInfo={datasetInfo} />

      <div className="mt-6 w-full">
        <Labels labelList={labelList} />
      </div>

      <div className="flex h-full w-full flex-wrap items-start space-x-0 space-y-6 p-4 sm:flex-nowrap sm:space-x-6 sm:space-y-0 ">
        <div className="flex h-full w-full flex-col space-y-4 p-4 sm:w-1/3">
          <button className="btn btn-primary w-full text-white">
            上传条目
          </button>
          <button className="btn btn-primary w-full text-white">
            改动条目
          </button>
          <button className="btn btn-primary w-full text-white">
            删除条目
          </button>
        </div>

        <div className="h-full w-full p-4 sm:w-2/3">
          <ItemsModify items={datasetItems} />
        </div>
      </div>

      <div className="w-full p-4 text-4xl">
        <Community issues={issues} textcontent="留言" />
      </div>
    </>
  );
}
