import { labels } from "../constants";

export default function Labels({ labelList }) {
  return (
    <div className="test-xs flex flex-row flex-wrap items-center">
      {labelList &&
        labelList.map((labelName) => (
          <div key={labelName} className="mx-2 my-2 flex flex-row items-center">
            <button className="badge badge-primary badge-outline h-8 max-h-8 space-x-2">
              {labels[labelName]}
              <div>{labelName}</div>
            </button>
          </div>
        ))}
    </div>
  );
}
