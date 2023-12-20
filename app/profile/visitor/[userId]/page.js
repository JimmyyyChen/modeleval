"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { datasets, issues } from "./data";
import Community from "@/app/components/Community";
import UserInfo from "../../../components/UserInfo";
import UserDatasets from "../../components/UserDatasets";

export default function Home({ params: { userId } }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
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
  }, [userId]);

  if (userInfo) {
    var { username } = userInfo;
  }

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="flex w-full p-6 lg:w-1/2 lg:pr-3 xl:w-1/3">
            <UserInfo
              isvisitor={true}
              userInfo={userInfo}
            />
          </div>

          <div className="flex w-full flex-col p-6 text-left text-primary lg:w-1/2 lg:pl-3 xl:w-2/3">
            <div className="flex w-full flex-1">
              <UserDatasets
                isvisitor={true}
                datasets={datasets}
                userInfo={userInfo}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full p-6 text-2xl">
          <Community issues={issues} textcontent={`${username}的留言区`} />
        </div>
      </div>
    </>
  );
}
