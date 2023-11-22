"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function NewTestingPage() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();

  const addDemoTesting = async () => {
    if (!isLoaded || !userId) {
      return null;
    }

    await fetch("/api/testings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        name: "THIS IS A DEMO TESTING",
        sizeInMB: 30,
        startTime: new Date(),
        endTime: null,
        taskCount: 100,
        completedTaskCount: 99,
        type: "Demo",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    router.refresh();
  };
  return (
    <div className="w-full">
      <Link className="btn" href="/testings" onClick={addDemoTesting}>
        TODO: add demo testing
      </Link>

      {/* make a white card with round corner */}
      <div className="flex flex-col items-center justify-center space-y-10 rounded-lg bg-white p-8 shadow-lg sm:p-20">
        <div className="flex w-full max-w-lg flex-col space-y-2">
          <h2 className="text-xl font-bold">评测方法</h2>
          <select className="select select-bordered">
            <option disabled selected>
              评测方法
            </option>
            <option>客观评测</option>
            <option>主观评测</option>
            <option>对抗评测</option>
          </select>
        </div>

        <div className="flex w-full max-w-lg flex-col space-y-2">
          <h2 className="text-xl font-bold">模型</h2>
          <select className="select select-bordered">
            <option disabled selected>
              模型
            </option>
            <option>模型1</option>
            <option>模型2</option>
            <option>模型3</option>
          </select>
        </div>

        <div className="flex w-full max-w-lg flex-col space-y-2">
          <h2 className="text-xl font-bold">评测方法</h2>
          <select className="select select-bordered">
            <option disabled selected>
              数据集
            </option>
            <option>数据集1</option>
            <option>数据集2</option>
            <option>数据集3</option>
          </select>
        </div>
      </div>
    </div>
  );
}
