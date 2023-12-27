import Link from "next/link";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import {
  StarIcon as SolidStarIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";

export default function ModelMainInfoDisplay({ modelInfo }) {
  const [starOpen, setStarOpen] = useState(false);

  if (modelInfo) {
    var { modelid: id, modelName, starCount, starUser, description } = modelInfo;
  }

  const { isLoaded, userId: selfId } = useAuth();

  if (!isLoaded || !selfId) {
    return null;
  }

  const handleStarClick = async () => {
    const response = await axios.post(`/api/models/star/${id}`);

    if (response.status == 200) {
      alert("收藏成功");

      location.reload();
    } else if (response.status == 404) {
      alert("未找到该模型");

      console.log("error");
    } else {
      alert("收藏失败");

      console.log("error");
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center space-y-4 text-center sm:flex-row sm:space-x-6 sm:space-y-0 sm:text-left ">
        <div className="flex flex-row items-center space-x-4 text-left text-4xl font-bold text-primary">
          <CubeIcon className="h-12 w-12" aria-hidden="true"></CubeIcon>
          <span>{modelName}</span>
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
            onClick={() => setStarOpen(true)}
          >
            {starCount}
          </button>
          <Dialog open={starOpen} onClose={() => setStarOpen(false)}>
            <DialogTitle>收藏用户列表</DialogTitle>
            <DialogContent>
              <div className="flex flex-col space-y-2">
                {starUser && starUser.length ? (
                  starUser.map((item) => (
                    <Link
                      className="flex items-start justify-start space-x-4 hover:underline"
                      href={`/profile/visitor/${item.userId}`}
                      key={`star-user-${item.userId}`}
                    >
                      {item.userImageUrl ? (
                        <div className="avatar">
                          <div className="flex w-6 items-center justify-center rounded-full">
                            <Image src={item.userImageUrl} alt={item.username} />
                          </div>
                        </div>
                      ) : (
                        <div className="avatar placeholder">
                          <div className="w-6 rounded-full bg-primary text-neutral-content">
                            <span className="text-sm">{item.username[0]}</span>
                          </div>
                        </div>
                      )}
                      <div>{item.username}</div>
                    </Link>
                  ))
                ) : (
                  <div className="p-6 text-center text-primary">无</div>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setStarOpen(false)}>关闭</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div className="text-md hidden w-full px-16 py-4 text-gray-400 lg:block">
        {description}
      </div>
    </>
  );
}
