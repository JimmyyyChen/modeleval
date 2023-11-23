import { CircleStackIcon } from "@heroicons/react/24/solid";

export default function MainInfoDisplay({ name, info }) {
  return (
    <div className="flex w-full flex-col items-center space-y-4 text-center sm:flex-row sm:space-x-6 sm:space-y-0 sm:text-left ">
      <div className="flex flex-row items-center space-x-4 text-left text-4xl font-bold text-primary">
        <CircleStackIcon
          className="h-12 w-12"
          aria-hidden="true"
        ></CircleStackIcon>
        <div>{name}</div>
      </div>
      {info.map((item) => (
        <div key={item.id} className="flex flex-row items-center">
          <button
            className="btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-r-none px-2 text-xs"
            // onClick={}
          >
            {item.svg}
            {item.label}
          </button>
          <button
            className="btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-l-none border-l-0 px-2 text-xs"
            // onClick={}
          >
            {item.value}
          </button>
        </div>
      ))}
    </div>
  );
}
