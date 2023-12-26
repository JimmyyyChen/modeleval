import Link from "next/link";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import {
  CircleStackIcon,
  ArrowDownTrayIcon,
  StarIcon as SolidStarIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

// TODO: 添加收藏判定，更改收藏图标
export default function DatasetMainInfoDisplay({ datasetInfo }) {
  const [downloadFilename, setDownloadFilename] = useState("");

  if (datasetInfo) {
    var {
      id,
      userId,
      username,
      datasetName,
      downloadCount,
      downloadUser,
      starCount,
      starUser,
      description,
    } = datasetInfo;
  }

  useEffect(() => {
    if (downloadFilename) {
      const link = document.createElement("a");
      link.href = downloadFilename;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadFilename("");
    }
  }, [downloadFilename]);

  const { isLoaded, userId: selfId } = useAuth();

  if (!isLoaded || !selfId) {
    return null;
  }

  const handleDownloadClick = async (event) => {
    event.preventDefault();

    const response = await axios.get(`/api/datasets/download/${id}`);

    if (response.status == 200) {
      setDownloadFilename("/" + response.data["filename"]);

      location.reload();
    } else if (response.status == 404) {
      setDownloadFilename("");
    } else {
      console.log("error");
    }
  };

  // TODO: 增加下载列表展示
  const handleDownloadUserDisplayClick = async () => {
    console.log("download user display clicked");
  };

  const handleStarClick = async () => {
    const response = await axios.post(`/api/datasets/star/${id}`);

    if (response.status == 200) {
      location.reload();
    } else if (response.status == 404) {
      console.log("error");
    } else {
      console.log("error");
    }
  };

  console.log(starUser);

  // TODO: 增加收藏列表展示
  const handleSterUserDisplayClick = async () => {
    console.log("star user display clicked");
  };

  return (
    <>
      <div className="flex w-full flex-col items-center space-y-4 text-center sm:flex-row sm:space-x-6 sm:space-y-0 sm:text-left ">
        <div className="flex flex-row items-center space-x-4 text-left text-4xl font-bold text-primary">
          <CircleStackIcon
            className="h-12 w-12"
            aria-hidden="true"
          ></CircleStackIcon>
          <Link
            className="hidden hover:underline lg:flex"
            href={`/profile/visitor/${userId}`}
          >
            {username}
          </Link>
          <span className="hidden lg:flex">/</span>
          <span>{datasetName}</span>
        </div>
        <div className="flex flex-row items-center">
          <a href={downloadFilename} download onClick={handleDownloadClick}>
            <button className="group btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-r-none px-2 text-xs">
              <ArrowDownTrayIcon
                className="h-4 w-4 text-primary group-hover:text-white"
                aria-hidden="true"
              />
              下载
            </button>
          </a>
          <button
            className="btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-l-none border-l-0 px-2 text-xs"
            onClick={handleDownloadUserDisplayClick}
          >
            {downloadCount}
          </button>
        </div>
        <div className="flex flex-row items-center">
          <button
            className="group btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-r-none px-2 text-xs"
            onClick={handleStarClick}
          >
            {starUser &&
            starUser.map((item) => item.userId).includes(selfId) ? (
              <SolidStarIcon
                className="h-4 w-4 text-primary group-hover:text-white"
                aria-hidden="true"
              />
            ) : (
              <OutlineStarIcon
                className="h-4 w-4 text-gray-300 group-hover:text-white"
                aria-hidden="true"
              />
            )}
            收藏
          </button>
          <button
            className="btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-l-none border-l-0 px-2 text-xs"
            onClick={handleSterUserDisplayClick}
          >
            {starCount}
          </button>
        </div>
      </div>
      <div className="text-md hidden w-full px-16 py-4 text-gray-400 lg:block">
        {description}
      </div>
    </>
  );
}
