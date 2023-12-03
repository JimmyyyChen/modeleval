"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

import DatasetOption from "./components/DatasetOption";
import ModelOption from "./components/ModelOption";

export default function NewTestingPage() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();

  const addDemoTesting = async () => {
    if (!isLoaded || !userId) {
      return null;
    }
    try {
      await axios.post("/api/testings", {
        userId: userId,
        name: "THIS IS A DEMO TESTING",
        sizeInMB: 30,
        startTime: new Date(),
        endTime: null,
        taskCount: 100,
        completedTaskCount: 99,
        type: "Demo",
      });
    } catch (error) {
      console.log(error);
    }

    router.refresh();
  };

  return (
    <div className="flex w-full flex-col  space-y-5 rounded-2xl bg-white p-8 shadow-lg sm:p-20">
      <Link className="btn" href="/testings" onClick={addDemoTesting}>
        TODO: add demo testing
      </Link>
      <h1 className="text-3xl font-bold ">创建新测试</h1>
      <div className="flex items-center space-x-3">
        <h2 className="text-xl font-bold ">选择数据集</h2>
        <p>或</p>
        {/* TODO: create new dataset */}
        <Link className="link-primary link" href="/datasets">
          上传数据集
        </Link>
      </div>
      <DatasetOption isSelected={true} />
      <DatasetOption isSelected={false} />
      <h2 className="text-xl font-bold">选择模型</h2>
      <div className="form-control w-max px-6 ">
        <label className="label cursor-pointer space-x-3">
          <input
            type="checkbox"
            checked="checked"
            className="checkbox-primary checkbox"
          />
          <span className="label-text font-bold">全选</span>
        </label>
      </div>
      <ModelOption isSelected={true} />
      <ModelOption isSelected={false} />
      <ModelOption isSelected={true} />
      <div className="flex justify-end">
        <button className="btn btn-primary w-max">创建新测试</button>
      </div>
    </div>
  );
}
