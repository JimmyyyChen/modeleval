"use client";
import { datasetInfo, datasetBadges, issues } from "./data";

import MainInfoDisplay from "@/app/components/MainInfoDisplay";
import Labels from "@/app/components/Labels";
import Community from "@/app/components/Community";

// TODO: 与其他页面雷同，将页面组件化
export default function Home({ params: { name } }) {
  return (
    <>
      <MainInfoDisplay
        name={name}
        downloadCount={-1}
        starCount={datasetInfo.starCount}
      />

      <div className="mt-6 w-full">
        <Labels badges={datasetBadges} />
      </div>

      {/* TODO: 简介面板初始化不成功 */}
      <div className="mt-6 flex h-full w-full flex-col items-start space-y-6 p-4 sm:flex-row sm:space-y-0 ">
        <div role="tablist" className="tabs tabs-lifted h-full w-full">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab whitespace-nowrap text-lg font-bold text-primary"
            aria-label="简介"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content truncate rounded-box border-base-300 bg-base-100 p-6 shadow-lg"
          >
            Tab content
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab whitespace-nowrap text-lg font-bold text-primary"
            aria-label="Tab 2"
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box border-base-300 bg-base-100 p-6 shadow-lg"
          >
            Tab content 2
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab whitespace-nowrap text-lg font-bold text-primary"
            aria-label="Tab 3"
          />
          <div
            role="tabpanel"
            className="tab-content rounded-box border-base-300 bg-base-100 p-6 shadow-lg"
          >
            Tab content 3
          </div>
        </div>
      </div>

      <div className="w-full p-4 text-4xl">
        <Community issues={issues} textcontent="留言" />
      </div>
    </>
  );
}
