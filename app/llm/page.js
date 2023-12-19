"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ModelDisplay from "./components/ModelDisplay";

export default function Home() {
  const [models, setModels] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("/api/models");
        if (response.status >= 200 && response.status < 300) {
          setModels(response.data);
        } else {
          setModels(undefined);
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        setModels(undefined);
        console.error("Error fetching data:", error);
      }
    };

    fetchModels();
  }, []);

  return (
    <ModelDisplay title="模型" models={models} />
  );
}
