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
  return (
    <>
      <div className="text-4xl text-teal-600 text-left font-bold w-full">
        <p>数据集</p>
      </div>

      <div className="w-full min-h-screen flex mt-6 space-x-6">
        <div className="w-1/3 min-h-full bg-white rounded-xl">
          <form className="w-full flex items-center justify-between bg-gray-200 rounded-lg rounded-b-none p-4 flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
            <input
              className="input input-bordered w-5/6"
              placeholder="搜索数据集"
            />
            {/* TODO: Add post link */}
            <button className="w-16 btn btn-primary text-white">搜索</button>
          </form>

          {/* TODO: Add post link */}
          <form className="w-full p-4 divide-y-2">
            {datasetLabels.map((item) => (
              <div
                key={item.id}
                className="w-full flex flex-col space-y-2 m-2 pt-2"
              >
                <div className="text-lg text-teal-600 font-bold">
                  {item.label}
                </div>
                <div className="w-full flex flex-wrap">
                  {item.value.map((value) => (
                    <div
                      key={value.id}
                      className="form-control rounded-lg m-2 bg-gray-200 border border-collapse"
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

            <button className="w-full btn btn-outline bg-teal-600 text-white">
              确认条件
            </button>
          </form>
        </div>

        <div className="w-2/3 min-h-full flex flex-col p-4 bg-white rounded-2xl">
          <div className="w-full h-16 flex justify-end space-x-2">
            {/* TODO: Add button onClick functions */}
            <button className="btn btn-outline bg-teal-600 text-white">
              选择数据集
            </button>
            <button className="btn btn-outline bg-teal-600 text-white">
              下载
            </button>
          </div>
          <div className="w-full flex-1 flex items-center justify-center">
            <div className="overflow-x-auto max-h-96 m-4 rounded-lg border">
              <table className="table table-pin-rows table-zebra text-center w-full">
                <thead>
                  <tr className="bg-gray-200 font-bold text-black shadow-md">
                    <th></th>
                    <td>Name</td>
                    <td>Last Updata</td>
                    <td>Likes</td>
                    <td>Downloads</td>
                    <td>Operations</td>
                  </tr>
                </thead>
                <tbody>
                  {datasets.map((item) => (
                    <tr key={item.id}>
                      <th>{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.last_updata}</td>
                      <td>{item.likes}</td>
                      <td>{item.downloads}</td>
                      <td className="flex items-center justify-center">
                        <label className="cursor-pointer label w-min">
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
