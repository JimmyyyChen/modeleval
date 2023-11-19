import Link from "next/link";

const datasetLabels = [
  {
    id: 1,
    label: "类型",
    value: [
      {
        id: 1,
        content: "主观",
      },
      {
        id: 2,
        content: "客观",
      },
    ],
  },
  {
    id: 2,
    label: "大小",
    value: [
      {
        id: 1,
        content: "<1K",
      },
      {
        id: 2,
        content: "1K-10K",
      },
      {
        id: 3,
        content: "10K-100K",
      },
      {
        id: 4,
        content: "100K-1M",
      },
      {
        id: 5,
        content: "1M-10M",
      },
      {
        id: 6,
        content: ">10M",
      },
    ],
  },
  {
    id: 3,
    label: "任务",
    value: [
      {
        id: 1,
        content: "事实问答",
      },
      {
        id: 2,
        content: "情感分析",
      },
      {
        id: 3,
        content: "自动化程序生成",
      },
      {
        id: 4,
        content: "多模态",
      },
      {
        id: 5,
        content: "其他",
      },
    ],
  },
];

const datasets = [
  {
    id: 1,
    name: "dataset1",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 2,
    name: "dataset2",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 3,
    name: "dataset3",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 4,
    name: "dataset4",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 5,
    name: "dataset5",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 6,
    name: "dataset6",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 7,
    name: "dataset7",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 8,
    name: "dataset8",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 9,
    name: "dataset9",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 10,
    name: "dataset10",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 11,
    name: "dataset11",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 12,
    name: "dataset12",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 13,
    name: "dataset13",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 14,
    name: "dataset14",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 15,
    name: "dataset15",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 16,
    name: "dataset16",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 17,
    name: "dataset17",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 18,
    name: "dataset18",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 19,
    name: "dataset19",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
  {
    id: 20,
    name: "dataset20",
    last_updata: "2021-10-10",
    likes: "1000",
    downloads: "100",
  },
];

export default function Home() {
  const pages = Math.ceil(datasets.length / 10);

  return (
    <>
      <div className="w-full text-center text-4xl font-bold text-primary sm:text-left">
        <p>数据集</p>
      </div>

      <div className="mt-6 flex w-full flex-wrap space-x-0 space-y-6 p-4 sm:flex-nowrap sm:space-x-6 sm:space-y-0">
        <div className="flex w-full flex-1 flex-col rounded-xl bg-white shadow-lg sm:w-1/3">
          <form className="flex w-full flex-col items-center justify-between space-y-2 rounded-lg rounded-b-none bg-gray-200 p-4 lg:flex-row lg:space-x-2 lg:space-y-0">
            <input
              className="input input-bordered w-5/6"
              placeholder="搜索数据集"
            />
            {/* TODO: Add post link */}
            <button className="btn btn-primary w-16 text-white">搜索</button>
          </form>

          {/* TODO: Add post link */}
          <form className="w-full divide-y-2 p-4">
            {datasetLabels.map((item) => (
              <div
                key={item.id}
                className="m-2 flex w-full flex-col space-y-2 pt-2"
              >
                <div className="text-lg font-bold text-primary">
                  {item.label}
                </div>
                <div className="flex w-full flex-wrap">
                  {item.value.map((value) => (
                    <div
                      key={value.id}
                      className="form-control m-2 border-collapse rounded-lg border bg-gray-200"
                    >
                      <label className="label cursor-pointer space-x-2">
                        <span className="label-text">{value.content}</span>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button className="btn btn-primary mt-6 w-full text-white">
              确认条件
            </button>
          </form>
        </div>

        <div className="flex min-h-full w-full flex-col rounded-2xl bg-white p-6 shadow-lg sm:w-2/3">
          <div className="flex h-16 w-full justify-end space-x-2">
            {/* TODO: Add button onClick functions */}
            <button className="btn btn-primary text-white">选择数据集</button>
            <button className="btn btn-primary text-white">下载</button>
          </div>
          <div className="flex w-full flex-1 flex-col items-center justify-center space-y-4 overflow-auto">
            <table className="table table-zebra table-pin-rows w-full text-center">
              <thead>
                <tr className="bg-gray-200 font-bold text-black shadow-md 2xl:text-lg">
                  <th></th>
                  <td>Name</td>
                  <td>Last Updata</td>
                  <td>Likes</td>
                  <td>Downloads</td>
                  <td>Operations</td>
                </tr>
              </thead>
              <tbody>
                {/* TODO: Modify the datasets */}
                {datasets.slice(0, 10).map((item) => (
                  <tr key={item.id}>
                    <th>{item.id}</th>
                    <td>
                      <Link
                        href={`/datasets/details/${item.name}`}
                        className="btn btn-primary"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td>{item.last_updata}</td>
                    <td>{item.likes}</td>
                    <td>{item.downloads}</td>
                    <td className="flex items-center justify-center">
                      <label className="label w-min cursor-pointer">
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="join flex items-center justify-center">
              <input
                key="1"
                className="btn btn-square join-item"
                type="radio"
                name="options"
                aria-label="1"
                defaultChecked
              />
              {Array.from({ length: pages - 1 }, (_, i) => i + 2).map(
                (item) => (
                  <input
                    key={item}
                    className="btn btn-square join-item"
                    type="radio"
                    name="options"
                    aria-label={item}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
