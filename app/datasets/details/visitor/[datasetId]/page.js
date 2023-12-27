"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Community from "@/app/components/Community";
import UserInfo from "@/app/components/UserInfo";
import Labels from "@/app/components/Labels";
import ItemsDisplay from "./components/ItemsDisplay";
import DatasetMainInfoDisplay from "@/app/datasets/components/DatasetMainInfoDisplay";

export default function Home({ params: { datasetId } }) {
  const [datasetInfo, setDatasetInfo] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const type = 1; // 1 for dataset, 0 for model

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (datasetInfo && datasetInfo.userId) {
          const response = await axios.get(`/api/user/${datasetInfo.userId}`);
          if (response.status >= 200 && response.status < 300) {
            setUserInfo(response.data);
          } else {
            setUserInfo(undefined);
            console.error("Error fetching data:", response.status);
          }
        }
      } catch (error) {
        setUserInfo(undefined);
        console.error("Error fetching data:", error);
      }
    };

    fetchUserInfo();
  }, [datasetInfo]);

  return (
    <>
      <DatasetMainInfoDisplay datasetInfo={datasetInfo} />

      <div className="h-full w-full p-4">
        <Labels labelList={labelList} />
      </div>

      <div className="flex h-full w-full flex-col items-start space-y-6 lg:flex-row lg:space-y-0 ">
        <div className="h-full w-full p-4 lg:w-2/3">
          {datasetInfo && datasetInfo.id ? (
            <ItemsDisplay datasetInfo={datasetInfo} />
          ) : (
            <div className="h-full w-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
              <span className="loading loading-spinner loading-md flex justify-center"></span>
            </div>
          )}
        </div>

        <div className="h-full w-full p-4 lg:w-1/3">
          <UserInfo isvisitor={true} userInfo={userInfo} />
        </div>
      </div>

      <div className="w-full p-4 text-4xl">
        <Community type={type} id={datasetId} />
      </div>
    </>
  );
}
