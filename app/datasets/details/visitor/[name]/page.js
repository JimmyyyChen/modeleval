"use client";
import {
  datasetInfo,
  datasetBadges,
  datasetItems,
  //pages,
  issues,
} from "./data";
import Community from "@/app/components/Community";
import UserInfo from "@/app/components/UserInfo";
import Labels from "@/app/components/Labels";
import ItemsDisplay from "./components/ItemsDisplay";
import MainInfoDisplay from "@/app/components/MainInfoDisplay";

export default function Home({ params: { name } }) {
  return (
    <>
      <MainInfoDisplay
        name={name}
        downloadCount={datasetInfo.downloadCount}
        starCount={datasetInfo.starCount}
      />

      <div className="mt-6 w-full">
        <Labels badges={datasetBadges} />
      </div>

      <div className="mt-6 flex h-full w-full flex-col items-start space-y-6 sm:flex-row sm:space-y-0 ">
        <div className="h-full w-full p-4 sm:w-2/3">
          <ItemsDisplay items={datasetItems} />
        </div>

        {/* TODO: 面板高度问题 */}
        <div className="h-full w-full p-4 sm:w-1/3">
          <UserInfo isvisitor={true} />
        </div>
      </div>

      <div className="w-full p-4 text-4xl">
        <Community issues={issues} textcontent="留言" />
      </div>
    </>
  );
}
