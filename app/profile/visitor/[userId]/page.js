"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { datasets, issues } from "./data";
import Community from "@/app/components/Community";
import UserInfo from "../../../components/UserInfo";
import UserDatasets from "../../components/UserDatasets";

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

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col md:flex-row">
          <div className="flex w-full p-6 md:w-1/2 md:pr-3 lg:w-1/3">
            <UserInfo
              isvisitor={true}
              userId={userId}
            />
          </div>

          <div className="flex w-full flex-col p-6 text-left text-primary md:w-1/2 md:pl-3 lg:w-2/3">
            <div className="flex w-full flex-1">
              <UserDatasets
                isvisitor={true}
                datasets={datasets}
                userId={userId}
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
