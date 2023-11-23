"use client";
import {
  datasetInfo,
  datasetBadges,
  datasetItems,
  pages,
  issues,
} from "./data";
import Community from "@/app/components/Community";
import UserInfo from "@/app/profile/UserInfo";
import Badges from "@/app/components/Badges";
import DataDisplay from "../../DataDisplay";
import MainInfoDisplay from "@/app/components/MainInfoDisplay";

// TODO: 与其他页面雷同，将页面组件化
export default function Home({ params: { name } }) {
  return (
    <>
      <MainInfoDisplay name={name} info={datasetInfo} />

      <div className="mt-6 w-full">
        <Badges badges={datasetBadges} />
      </div>

      <div className="mt-6 flex h-full w-full flex-col items-start space-y-6 sm:flex-row sm:space-y-0 ">
        <div className="h-full w-full p-4 sm:w-2/3">
          <DataDisplay items={datasetItems} pages={pages} />
        </div>

        {/* TODO: 面板高度问题 */}
        <div className="h-full w-full p-4 sm:w-1/3">
          <UserInfo isVisitor={true} />
        </div>
      </div>

      <div className="w-full p-4">
        <Community issues={issues} fontsize="text-4xl" textcontent="留言" />
      </div>
    </>
  );
}
