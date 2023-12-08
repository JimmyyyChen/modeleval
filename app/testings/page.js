import prisma from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

import TestingCard from "./components/TestingCard";
import { PlusIcon } from "@heroicons/react/24/solid";

export default async function TestingsPage() {
  // get userId from clerk
  const { userId } = auth();

  // get all testings from prisma
  const testings = await prisma.testing.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return (
    <div className="flex w-full flex-col space-y-4">
      {/* Add Demo Testing */}
      <Link className="btn" href="/testings/0">
        TODO: 客观测试展示页面
      </Link>
      <Link className="btn" href="/testings/1">
        TODO: 主观测试展示页面
      </Link>
      <Link className="btn" href="/testings/2">
        TODO: 对抗测试展示页面
      </Link>
      <Link className="btn btn-secondary rounded-full shadow-md w-max" href="/testings/new-testing">
        <PlusIcon className="h-6 w-6" />
        新测试
      </Link>

      {/* print all testings */}
      {testings.map((testing) => (
        <TestingCard
          id={testing.id}
          name={testing.name}
          type={testing.type}
          sizeInMB={testing.sizeInMB}
          taskCount={testing.taskCount}
          completedTaskCount={testing.completedTaskCount}
          startTime={testing.startTime}
          endTime={testing.endTime}
          key={testing.id}
        />
      ))}
    </div>
  );
}
