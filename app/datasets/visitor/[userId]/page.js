"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import DatasetDisplay from "../../components/DatasetDisplay";

export default function Home({ params: { userId } }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        if (response.status >= 200 && response.status < 300) {
          setUsername(response.data.username);
        } else {
          setUsername("");
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        setUsername("");
        console.error("Error fetching data:", error);
      }
    };

    fetchUserName();
  }, [userId]);

  const [datasets, setDatasets] = useState(null);

  useEffect(() => {
    const fetchUserDatasets = async () => {
      try {
        const response = await axios.get(`/api/datasets/user/${userId}`);
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
  }, [userId]);

  return <DatasetDisplay title={`${username}的数据集`} datasets={datasets} isvisitor={true} />;
}
