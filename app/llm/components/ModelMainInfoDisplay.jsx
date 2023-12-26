import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import {
  CircleStackIcon,
  StarIcon as SolidStarIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

// TODO: 添加收藏判定，更改收藏图标
export default function ModelMainInfoDisplay({ modelInfo }) {
  const [downloadFilename, setDownloadFilename] = useState("");

  if (modelInfo) {
    var { modelid: id, modelName, likeN: starCount, starUser, description } = modelInfo;
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

  const handleStarClick = async () => {
    const response = await axios.post(`/api/models/star/${id}`);

    if (response.status == 200) {
      location.reload();
    } else if (response.status == 404) {
      console.log("error");
    } else {
      console.log("error");
    }
  };

  // TODO: 增加收藏列表展示
  const handleSterUserDisplayClick = async () => {
    console.log("star user display clicked");
  };

  return (
    <>
    <div className="flex w-full flex-col items-center space-y-4 text-center sm:flex-row sm:space-x-6 sm:space-y-0 sm:text-left ">
      <div className="flex flex-row items-center space-x-4 text-left text-4xl font-bold text-primary">
        <CubeIcon
          className="h-12 w-12"
          aria-hidden="true"
        ></CubeIcon>
        <span>{modelName}</span>
      </div>
      <div className="flex flex-row items-center">
        <button
          className="group btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-r-none px-2 text-xs"
          onClick={handleStarClick}
        >
          {starUser && starUser.map((item) => item.userId).includes(selfId) ? (
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
    <div className="px-16 py-4 hidden lg:block text-gray-400 text-md w-full">
      {description}
    </div>
    </>
  );
}
