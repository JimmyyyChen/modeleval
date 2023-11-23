import Link from "next/link";
import {
  FolderIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";

export default function UserDatasets({ isVisitor, datasets, username }) {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 text-primary shadow-lg">
      <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
        <div className="text-2xl font-bold">我的数据集</div>
        <div className="flex flex-row space-x-2">
          {isVisitor ? (
            <></>
          ) : (
            <>
              <button className="group btn btn-outline btn-primary">
                <PlusIcon className="h-6 w-6 text-primary group-hover:text-white" />
                上传
              </button>
              <button className="group btn btn-outline btn-primary">
                <MinusIcon className="h-6 w-6 text-primary group-hover:text-white" />
                删除
              </button>
            </>
          )}
          <Link
            className="group btn btn-outline btn-primary"
            href={
              isVisitor ? `/datasets/visitor/${username}` : "/datasets/self"
            }
          >
            <EllipsisHorizontalIcon className="h-6 w-6 text-primary group-hover:text-white" />
            更多
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-wrap px-4">
        {datasets.slice(0, 12).map((item) => (
          <div
            key={item.id}
            className="md:1/3 flex w-full flex-col p-2 sm:w-1/2 lg:w-1/4 2xl:w-1/6"
          >
            <Link
              className="flex w-full flex-col rounded-xl border border-gray-200 bg-white p-4 text-primary shadow-lg transition duration-300 ease-in-out hover:bg-stone-100 hover:shadow-xl"
              href={
                isVisitor
                  ? `/datasets/details/visitor/${item.name}`
                  : `/datasets/details/${item.name}`
              }
            >
              <div className="flex w-full flex-col items-center justify-between">
                <FolderIcon className="h-8 w-8 text-primary" />
                <div className="w-full truncate text-center text-lg font-bold">
                  {item.name}
                </div>
                <div className="hidden w-full text-left lg:flex lg:flex-col">
                  <p className="truncate text-sm">更新：{item.last_updata}</p>
                  <p className="truncate text-sm">收藏：{item.likes}</p>
                  <p className="truncate text-sm">下载：{item.downloads}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
