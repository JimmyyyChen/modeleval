"use client";
import Badges from "@/app/components/Badges";
import {
  datasetInfo,
  datasetBadges,
  datasetItems,
  //pages,
  issues,
} from "./data";
import Community from "@/app/components/Community";
import MainInfoDisplay from "@/app/components/MainInfoDisplay";
import ItemsDisplay from "../ItemsDisplay";

export default function Home({ params: { name } }) {
  return (
    <>
      <MainInfoDisplay name={name} info={datasetInfo} />

      <div className="mt-6 w-full">
        <Badges badges={datasetBadges} />
      </div>

      <div className="mt-6 flex h-full w-full flex-wrap items-start space-x-0 space-y-6 p-4 sm:flex-nowrap sm:space-x-6 sm:space-y-0 ">
        <div className="flex h-full w-full flex-col space-y-4 p-4 sm:w-1/3">
          <button className="btn btn-primary w-full text-white">
            上传条目
          </button>
          <button className="btn btn-primary w-full text-white">
            改动条目
          </button>
          <button className="btn btn-primary w-full text-white">
            删除条目
          </button>
        </div>

        <div className="h-full w-full p-4 sm:w-2/3">
          <ItemsDisplay items={datasetItems} />
        </div>
      </div>

      <div className="w-full p-4 text-4xl">
        <Community issues={issues} textcontent="留言" />
      </div>
    </>
  );
}
