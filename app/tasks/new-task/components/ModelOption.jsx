import React from "react";
import Link from "next/link";

export default function ModelOption({ model, isSelected }) {
  const modelName = model.modelName;
  const description = model.description;

  return (
    <div
      className={` ${
        isSelected ? "ring-2 ring-teal-700" : ""
      } w-full flex-wrap items-center space-y-2 overflow-hidden rounded-3xl border bg-base-100 p-6`}
    >
      <h2 className="flex flex-wrap items-center space-x-3 ">
        <input
          type="checkbox"
          className="checkbox-primary checkbox"
          readOnly={true}
          checked={isSelected}
        />

        <p className=" font-mono text-xl font-bold">{modelName}</p>
        {/* TODO: link to corresponded model */}
        <Link className="link-primary link text-sm" href="/llm">
          查看更多
        </Link>
      </h2>

      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
