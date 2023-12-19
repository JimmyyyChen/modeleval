"use client";
import { datasetLabels } from "./data";
import axios from "axios";
import { useEffect, useState } from "react";
import DatasetDisplay from "./DatasetDisplay";

export default function Home() {
  const [datasets, setDatasets] = useState(null);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await axios.get("/api/datasets");
        setDatasets(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDatasets();
  }, []);

  return (
    <DatasetDisplay
      title="数据集"
      datasets={datasets}
      datasetLabels={datasetLabels}
      isvisitor={true}
    />
  );
}
