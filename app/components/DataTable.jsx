import Link from "next/link";

export default function DataTable({ items, type, isvisitor }) {
  const pages = Math.ceil(items.length / 10);
  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="flex w-full flex-1 flex-col space-y-4 overflow-auto py-4">
        <table className="table table-zebra table-pin-rows w-full text-center">
          <thead>
            <tr className="border border-gray-200 bg-gray-200 font-bold text-black shadow-md 2xl:text-lg">
              <th></th>
              <td>Name</td>
              <td>Last Updata</td>
              <td>Likes</td>
              <td>Downloads</td>
            </tr>
          </thead>
          <tbody>
            {/* TODO: Modify the datasets */}
            {items.slice(0, 10).map((item) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <td>
                  <Link
                    href={
                      isvisitor
                        ? `/${type}/details/visitor/${item.name}`
                        : `/${type}/details/${item.name}`
                    }
                    className="btn btn-outline btn-primary "
                  >
                    <div className="max-w-[6rem] truncate">{item.name}</div>
                  </Link>
                </td>
                <td>{item.last_updata}</td>
                <td>{item.likes}</td>
                <td>{item.downloads}</td>
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
