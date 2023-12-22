"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  datasetItems,
  issues,
} from "./data";
import Community from "@/app/components/Community";
import UserInfo from "@/app/components/UserInfo";
import Labels from "@/app/components/Labels";
import ItemsDisplay from "./components/ItemsDisplay";
import MainInfoDisplay from "@/app/components/MainInfoDisplay";

export default function Home({ params: { datasetId } }) {
  const [datasetInfo, setDatasetInfo] = useState({});
  const [userInfo, setUserInfo] = useState(null);

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
      <MainInfoDisplay datasetInfo={datasetInfo} />

      <div className="mt-6 w-full">
        <Labels labelList={labelList} />
      </div>

      <div className="mt-6 flex h-full w-full flex-col items-start space-y-6 sm:flex-row sm:space-y-0 ">
        <div className="h-full w-full p-4 sm:w-2/3">
          <ItemsDisplay items={datasetItems} />
        </div>

        <div className="h-full w-full p-4 sm:w-1/3">
          <UserInfo isvisitor={true} userInfo={userInfo} />
        </div>
      </div>

      <div className="w-full p-4 text-4xl">
        <Community issues={issues} textcontent="留言" />
      </div>
    </>
  );
}
