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

      <h2 className="text-xl font-bold">选择数据集</h2>
      <DatasetOption isSelected={true} />
      <DatasetOption />
      <h2 className="text-xl font-bold">选择模型</h2>
      <ModelOption isSelected={true} />
      <ModelOption isSelected={false} />
    </div>
  );
}
