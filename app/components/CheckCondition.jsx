export default function CheckCondition({ title, labels }) {
  return (
    <div className="flex w-full h-full flex-col rounded-xl border border-gray-200 bg-white shadow-lg">
      <form className="flex w-full flex-col items-center justify-between space-y-2 rounded-lg rounded-b-none bg-gray-200 p-4 lg:flex-row lg:space-x-2 lg:space-y-0">
        <input
          className="input input-bordered w-5/6"
          placeholder={`搜索${title}`}
        />
        {/* TODO: Add post link */}
        <button className="btn btn-primary w-16 text-white">搜索</button>
      </form>

      {/* TODO: Add post link */}
      <form className="w-full divide-y-2 p-4">
        {labels.map((item) => (
          <div
            key={item.id}
            className="m-2 flex w-full flex-col space-y-2 pt-2"
          >
            <div className="text-lg font-bold text-primary">{item.label}</div>
            <div className="flex w-full flex-wrap">
              {item.value.map((value) => (
                <div
                  key={value.id}
                  className="form-control m-2 border-collapse rounded-lg border bg-gray-200"
                >
                  <label className="label cursor-pointer space-x-2 px-2">
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
  );
}
