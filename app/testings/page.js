import TestingCard from "./components/TestingCard";
import prisma from "@/lib/prisma";

export default async function TestingsPage() {
  const testings = await prisma.testing.findMany();
  return (
    <div className="w-full">
      {/* print all testings */}
      {testings.map((testing) => (
        <TestingCard
          name={testing.name}
          type={testing.type}
          sizeInMB={testing.sizeInMB}
          taskCount={testing.taskCount}
          completedTaskCount={testing.completedTaskCount}
          startTime={testing.startTime}
          endTime={testing.endTime}
        />
      ))}
    </div>
  );
}
