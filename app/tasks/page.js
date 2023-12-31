import prisma from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

import TaskCard from "./components/TaskCard";
import { PlusIcon } from "@heroicons/react/24/solid";

export default async function TasksPage() {
  // get userId from clerk
  const { userId } = auth();

  // get all tasks from prisma (we can directly access prisma because we are not using "use client")
  const myTasks = await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });

  myTasks.sort((a, b) => {
    return b.startTime - a.startTime;
  });

  // tasks created by other users
  const publicTasks = await prisma.task.findMany({
    where: {
      userId: {
        not: userId,
      },
    },
  });

  return (
    <div className="flex w-full flex-col space-y-6">
      <Link
        className="btn btn-secondary w-max rounded-full shadow-md"
        href="/tasks/new-task"
      >
        <PlusIcon className="h-6 w-6" />
        创建新测试
      </Link>

      <h1 className="text-3xl font-bold text-primary">我创建的测试</h1>
      {myTasks.map((task) => (
        <TaskCard task={task} key={task.id} />
        ))}

      {/* if no tasks */}
      {myTasks.length == 0 && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-gray-500">无测试</p>
        </div>
      )}

      <h1 className="text-3xl font-bold text-primary">他人创建的测试</h1>
      {publicTasks.map((task) => (
        <TaskCard task={task} key={task.id} isVisiter={true}/>
        ))}

      {/* if no tasks */}
      {publicTasks.length == 0 && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-gray-500">无测试</p>
        </div>
      )}
    </div>
  );
}
