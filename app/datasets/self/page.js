"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import DatasetDisplay from "../components/DatasetDisplay"

export default function Home() {
  const [datasets, setDatasets] = useState(null);

  useEffect(() => {
    const fetchUserDatasets = async () => {
      try {
        const response = await axios.get("/api/datasets/user");
        if (response.status >= 200 && response.status < 300) {
          setDatasets(response.data);
        } else {
          setDatasets(undefined);
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        setDatasets(undefined);
        console.error("Error fetching data:", error);
      }
    };

    fetchUserDatasets();
  }, []);

  return <DatasetDisplay title={"我的数据集"} datasets={datasets} isvisitor={false} />;
}
