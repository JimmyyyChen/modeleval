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
        completedTaskCount: 100,
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
    <div>
      <Link className="btn" href="/testings" onClick={addDemoTesting}>
        TODO: add demo testing
      </Link>
    </div>
  );
}
