"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { issues } from "./data";

import ModelMainInfoDisplay from "../../../components/ModelMainInfoDisplay"; 
import Labels from "@/app/components/Labels";
import FullWidthTabs from "./components/FullWidthTabs";
import Community from "@/app/components/Community";

export default function Home({ params: { modelId } }) {
  const [modelInfo, setModelInfo] = useState({});

  useEffect(() => {
    const fetchModelInfo = async () => {
      try {
        const response = await axios.get(`/api/models/info/${modelId}`);
        if (response.status >= 200 && response.status < 300) {
          setModelInfo(response.data[0]);
        } else {
          setModelInfo({});
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        setModelInfo({});
        console.error("Error fetching data:", error);
      }
    };

    fetchModelInfo();
  }, [modelId]);

  if (modelInfo && modelInfo.label_list) {
    var labelList = modelInfo.label_list.map((item) => item.labelName);
  }

  return (
    <>
      <ModelMainInfoDisplay modelInfo={modelInfo} />

      <div className="h-full w-full p-4">
        <Labels labelList={labelList} />
      </div>

      <div className="mt-6 h-full w-full p-4 ">
        <FullWidthTabs />
      </div>

      <div className="w-full p-4 text-4xl">
        <Community issues={issues} textcontent="留言" />
      </div>
    </>
  );
}
