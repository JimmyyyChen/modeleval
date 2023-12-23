import prisma from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

import TaskCard from "./components/TaskCard";
import { PlusIcon } from "@heroicons/react/24/solid";

export default async function TasksPage() {
  // get userId from clerk
  const { userId } = auth();

  // get all tasks from prisma (we can directly access prisma because we are not using "use client")
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });

  tasks.sort((a, b) => {
    return b.startTime - a.startTime;
  });

  return (
    <div className="flex w-full flex-col space-y-4">
      <Link
        className="btn btn-secondary w-max rounded-full shadow-md"
        href="/tasks/new-task"
      >
        <PlusIcon className="h-6 w-6" />
        新测试
      </Link>

      {/* print all tasks */}
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}

      {/* if no tasks */}
      {tasks.length == 0 && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-gray-500">无测试</p>
        </div>
      )}
    </div>
  );
}
