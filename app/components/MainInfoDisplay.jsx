import Link from "next/link";
import {
  CircleStackIcon,
  ArrowDownTrayIcon,
  // StarIcon as SolidStarIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

// TODO: 添加收藏判定，更改收藏图标
export default function MainInfoDisplay({ datasetInfo }) {
  if (datasetInfo) {
    var { userId, username, datasetName, downloadCount, starCount } =
      datasetInfo;
  }

  return (
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
      {downloadCount >= 0 && (
        <div className="flex flex-row items-center">
          <button
            className="group btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-r-none px-2 text-xs"
            // TODO: onClick={}
          >
            <ArrowDownTrayIcon
              className="h-4 w-4 text-primary group-hover:text-white"
              aria-hidden="true"
            />
            下载
          </button>
          <button
            className="btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-l-none border-l-0 px-2 text-xs"
            // TODO: onClick={}
          >
            {downloadCount}
          </button>
        </div>
      )}
      <div className="flex flex-row items-center">
        <button className="group btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-r-none px-2 text-xs">
          <OutlineStarIcon
            className="h-4 w-4 text-primary group-hover:text-white"
            aria-hidden="true"
          />
          收藏
        </button>
        <button className="btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-l-none border-l-0 px-2 text-xs">
          {starCount}
        </button>
      </div>
    </div>
  );
}
