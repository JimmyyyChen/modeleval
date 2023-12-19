"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import DatasetDisplay from "./components/DatasetDisplay";

export default function Home() {
  const [datasets, setDatasets] = useState(null);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await axios.get("/api/datasets");
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

    fetchDatasets();
  }, []);

  return (
    <DatasetDisplay
      title="数据集"
      datasets={datasets}
      isvisitor={true}
    />
  );
}
