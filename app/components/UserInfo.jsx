import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  IdentificationIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function UserInfo({ isvisitor, userId }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        if (response.status >= 200 && response.status < 300) {
          setUserInfo(response.data);
        } else {
          setUserInfo({});
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        setUserInfo({});
        console.error("Error fetching data:", error);
      }
    };

    fetchUserName();
  }, [userId]);

  // Temporary data
  const email = "example@mails.tsinghua.edu.cn";
  const organization = "@Tsinghua";
  const stars = "1200";

  return (
    <div className="h-full w-full flex flex-col items-center space-y-8 rounded-2xl border border-gray-200 bg-white px-4 py-12 text-left text-primary shadow-lg">
      <div className="h-36 w-36 rounded-full bg-blue-500 transition duration-300 ease-in-out md:h-48 md:w-48"></div>
      <div className="flex w-full flex-col items-start space-y-4 p-2 text-primary">
        <div className="my-4 flex flex-row w-full items-center space-x-4">
          <IdentificationIcon className="h-8 w-8 text-primary" />
          <p className="text-4xl font-bold">{userInfo.username}</p>
        </div>
        <div className="flex flex-row w-full space-x-4">
          <EnvelopeIcon className="h-6 w-6 text-primary" />
          <div className="flex flex-col truncate">
            <p>Email</p>
            <p className="text-blue-600 truncate">{email}</p>
          </div>
        </div>
        <div className="flex flex-row w-full space-x-4">
          <BuildingLibraryIcon className="h-6 w-6 text-primary" />
          <div className="flex flex-col truncate">
            <p>Organization</p>
            <p className="text-blue-600 truncate">{organization}</p>
          </div>
        </div>
        <div className="flex flex-row w-full space-x-4">
          <SparklesIcon className="h-6 w-6 text-primary" />
          <div className="flex flex-col truncate">
            <p>Stars</p>
            <p className="text-gray-400 truncate">{stars}</p>
          </div>
        </div>
      </div>
      {isvisitor ? (
        <></>
      ) : (
        <Link
          className="btn btn-primary w-full text-white"
          href="/profile/settings"
        >
          维护信息
        </Link>
      )}
    </div>
  );
}
