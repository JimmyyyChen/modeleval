"use client";

import { datasets, issues } from "./data";
import Community from "@/app/components/Community";
import UserInfo from "../../../components/UserInfo";
import UserDatasets from "../../UserDatasets";

export default function Home({ params: { name } }) {
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col md:flex-row">
          <div className="flex w-full p-6 md:w-1/2 md:pr-3 lg:w-1/3">
            <UserInfo
              isvisitor={true}
              username={name}
              email="example@mails.tsinghua.edu.cn"
              organization="@Tsinghua"
              stars="1200"
            />
          </div>

          <div className="flex w-full flex-col p-6 text-left text-primary md:w-1/2 md:pl-3 lg:w-2/3">
            <div className="flex w-full flex-1">
              <UserDatasets
                isvisitor={true}
                datasets={datasets}
                username={name}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full p-6 text-2xl">
          <Community issues={issues} textcontent={`${name}的留言区`} />
        </div>
      </div>
    </>
  );
}