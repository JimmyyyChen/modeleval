import Link from "next/link";
import {
  FolderIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

export default function UserDatasets({ isvisitor, datasets, userInfo }) {
  if (userInfo) {
    var { username, userId } = userInfo;
  }

  console.log(datasets);

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 text-primary shadow-lg">
      <div className="flex w-full flex-col items-center justify-between space-y-2 lg:flex-row lg:space-y-0">
        <div className="text-2xl font-bold">
          {isvisitor ? `${username}的数据集` : "我的数据集"}
        </div>
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
          {isvisitor ? (
            <></>
          ) : (
            <>
              <button className="group btn btn-outline btn-primary">
                <PlusIcon className="h-6 w-6 text-primary group-hover:text-white" />
                上传
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex w-full flex-1 flex-wrap p-4">
        {datasets &&
          datasets.slice(0, 11).map((item) => (
            <div
              key={item.id}
              className="flex w-full flex-col p-2 md:w-1/2 lg:w-1/4 2xl:w-1/6"
            >
              <Link
                className="flex h-full w-full flex-col justify-center rounded-xl border border-gray-200 bg-white p-4 text-primary shadow-lg transition duration-300 ease-in-out hover:bg-stone-100 hover:shadow-xl"
                href={
                  isvisitor
                    ? `/datasets/details/visitor/${item.id}`
                    : `/datasets/details/self/${item.id}`
                }
              >
                <div className="flex w-full flex-col items-center justify-between">
                  <FolderIcon className="h-8 w-8 text-primary" />
                  <div className="w-full truncate text-center text-lg font-bold">
                    {item.datasetName}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        {datasets && datasets.length > 0 && (
          <div
            key="0"
            className="flex w-full flex-col p-2 md:w-1/2 lg:w-1/4 2xl:w-1/6"
          >
            <Link
              className="flex h-full w-full flex-col justify-center rounded-xl border border-gray-200 bg-white p-4 text-primary shadow-lg transition duration-300 ease-in-out hover:bg-stone-100 hover:shadow-xl"
              href={
                isvisitor ? `/datasets/visitor/${userId}` : "/datasets/self"
              }
            >
              <div className="flex w-full flex-col items-center justify-between">
                <EllipsisHorizontalIcon className="h-8 w-8 text-primary" />
                <div className="w-full truncate text-center text-lg font-bold">
                  更多
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
