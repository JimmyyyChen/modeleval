"use client";

import { datasets, issues } from "./data";
import Community from "@/app/components/Community";
import UserInfo from "../../../components/UserInfo";
import UserDatasets from "../../UserDatasets";

export default function Home({ params: { name } }) {
  return (
    <>
      <div className="flex w-full flex-col md:flex-row">
        <div className="m-6 flex md:w-1/2 lg:w-1/3">
          <UserInfo
            isVisitor={true}
            username={name}
            email="example@mails.tsinghua.edu.cn"
            organization="@Tsinghua"
            stars="1200"
          />
        </div>

        <div className="m-6 flex w-full flex-col text-left text-primary md:w-1/2 md:flex-1 lg:w-2/3">
          <div className="flex w-full flex-1 pb-2">
            <UserDatasets isVisitor={true} datasets={datasets} username={name} />
          </div>

          <div className="flex w-full flex-1 pt-2 text-2xl">
            <Community
              issues={issues}
              textcontent={`${name}的留言区`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
