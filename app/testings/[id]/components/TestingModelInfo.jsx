import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function TestingModelInfo() {
  let demoDescription = " 这里是关于模型的叙述。这里是关于模型的叙述。";

  if (demoDescription.length > 50) {
    demoDescription = demoDescription.slice(0, 50) + "...";
  }

  return (
    <div className=" w-full flex-wrap items-center space-y-2 overflow-hidden rounded-3xl border bg-base-100 p-6">
      <h2 className="flex flex-wrap items-center space-x-3 ">
        <p className=" font-mono text-xl font-bold">GPT-4</p>
        {/* TODO: link to corresponded model */}
        <Link className="link-primary link text-sm" href="/llm">
          查看更多
        </Link>
      </h2>

      <p className="text-sm text-gray-500">{demoDescription}</p>
    </div>
  );
}