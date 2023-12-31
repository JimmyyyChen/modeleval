import { BookOpenIcon } from "@heroicons/react/24/solid";

import { labels } from "../constants";

export default function Labels({ labelList }) {
  labelList = [...new Set(labelList)];
  return (
    <div className="test-xs flex flex-row flex-wrap items-center ">
      {labelList &&
        labelList.map((labelName, index) => (
          <div key={`label-${index}-${labelName}`} className="mx-2 my-2 flex flex-row items-center">
            <button className="badge badge-primary badge-outline h-8 max-h-8 cursor-default space-x-2">
              {labels[labelName] || (
                <BookOpenIcon className="h-4 w-4 text-primary" />
              )}
              <div>{labelName}</div>
            </button>
          </div>
        ))}
    </div>
  );
}
