"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { issues } from "./data";
import Community from "@/app/components/Community";
import UserInfo from "../../components/UserInfo";
import UserDatasets from "../components/UserDatasets";

export default function Home() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/user");
        if (response.status >= 200 && response.status < 300) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        setUserInfo(undefined);
        console.error("Error fetching data:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const [datasets, setDatasets] = useState(null);

  useEffect(() => {
    const fetchUserDatasets = async () => {
      try {
        const { userId } = userInfo;
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
  }, [userInfo]);

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col md:flex-row">
          <div className="flex w-full p-6 md:w-1/2 md:pr-3 lg:w-1/3">
            <UserInfo isvisitor={false} userInfo={userInfo} />
          </div>

          <div className="flex w-full flex-col p-6 text-left text-primary md:w-1/2 md:pl-3 lg:w-2/3">
            <div className="flex w-full flex-1">
              <UserDatasets
                isvisitor={false}
                datasets={datasets}
                userInfo={userInfo}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full p-6 text-2xl">
          <Community issues={issues} textcontent="我的留言区" />
        </div>
      </div>
    </>
  );
}
