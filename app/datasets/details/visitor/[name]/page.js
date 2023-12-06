"use client";
import {
  datasetInfo,
  datasetBadges,
  datasetItems,
  pages,
  issues,
} from "./data";
import Community from "@/app/components/Community";
import UserInfo from "@/app/components/UserInfo";
import Badges from "@/app/components/Badges";
import ItemsDisplay from "../../ItemsDisplay";
import MainInfoDisplay from "@/app/components/MainInfoDisplay";

// TODO: 与其他页面雷同，将页面组件化
export default function Home({ params: { name } }) {
  return (
    <>
      <MainInfoDisplay name={name} info={datasetInfo} />

      <div className="mt-6 w-full">
        <Badges badges={datasetBadges} />
      </div>

      <div className="mt-6 flex w-full h-full flex-col items-start space-y-6 sm:flex-row sm:space-y-0 ">
        <div className="w-full h-full p-4 sm:w-2/3">
          <ItemsDisplay items={datasetItems} />
        </div>

        {/* TODO: 面板高度问题 */}
        <div className="w-full h-full p-4 sm:w-1/3">
          <UserInfo isvisitor={true} />
        </div>
      </div>

      <div className="w-full p-4 text-4xl">
        <Community issues={issues} textcontent="留言" />
      </div>
    </>
  );
}
