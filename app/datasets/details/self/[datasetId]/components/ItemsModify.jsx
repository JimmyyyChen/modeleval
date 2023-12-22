export default function ItemsModify({ items }) {
  const pages = Math.ceil(items.length / 10);
  return (
    <div className="h-full w-full rounded-xl border border-gray-200 bg-white shadow-lg">
      {/* TODO: Add post link */}
      <div className="w-full flex-1 space-y-4 p-6">
        <button className="btn btn-disabled w-full border border-gray-200 shadow-md">
          <div className="flex w-full flex-row text-black">
            <div className="w-1/6 truncate text-left">ID</div>
            <div className="w-4/6 truncate text-center">Question</div>
            <div className="w-1/6 truncate text-right">Answer</div>
          </div>
        </button>
        {items.map((item) => (
          <div key={item.id}>
            <button
              className="btn w-full border border-gray-200 shadow-md"
              onClick={() => document.getElementById(item.id).showModal()}
            >
              <div className="flex w-full flex-row">
                <div className="w-1/6 truncate text-left">{item.id}</div>
                <div className="w-4/6 truncate text-left">{item.question}</div>
                <div className="w-1/6 truncate text-right">{item.answer}</div>
              </div>
            </button>
            <dialog id={item.id} className="modal">
              <div className="modal-box space-y-4">
                <h3 className="text-lg font-bold">Detail</h3>
                <div className="modal-body m-4">
                  <div className="flex w-full flex-col space-y-2">
                    <div className="flex w-full flex-row">
                      <div className="w-1/3">ID</div>
                      <div className="w-2/3 overflow-auto whitespace-normal ">
                        {item.id}
                      </div>
                    </div>
                    <div className="flex w-full flex-row">
                      <div className="w-1/3">Question</div>
                      <div className="w-2/3 overflow-auto whitespace-normal ">
                        {item.question}
                      </div>
                    </div>
                    <div className="flex w-full flex-row">
                      <div className="w-1/3">Answer</div>
                      <div className="w-2/3 overflow-auto whitespace-normal ">
                        {item.answer}
                      </div>
                    </div>
                    <div className="flex w-full flex-row">
                      <div className="w-1/3">Options</div>
                      <div className="w-2/3 overflow-auto whitespace-normal ">
                        {item.options}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))}

        {/* TODO: 将页面跳转组件随页面数大小改变 */}
        <div className="join flex items-center justify-center">
          <input
            key="1"
            className="btn btn-square join-item"
            type="radio"
            name="options"
            aria-label="1"
            defaultChecked
          />
          {Array.from({ length: pages - 1 }, (_, i) => i + 2).map((item) => (
            <input
              key={item}
              className="btn btn-square join-item"
              type="radio"
              name="options"
              aria-label={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
