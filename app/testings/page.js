import TestingCard from "./components/TestingCard";

// examples
const tasks = [
  {
    name: "Example Task",
    size: 1.24,
    startTime: new Date().getTime(),
    // endTime is null means the task is still running
    endTime: null,
    progress: 72,
    type: "客观评测",
  },
  {
    name: "Example Task2",
    size: 2,
    startTime: new Date().getTime(),
    endTime: new Date().getTime(),
    progress: 100,
    type: "客观评测",
  },
];

export default function TestingsPage() {
  return (
    <div className="w-full">
      {tasks.map((task) => (
        <TestingCard {...task} />
      ))}
    </div>
  );
}
