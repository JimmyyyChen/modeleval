import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CheckCondition({ title, labels }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toString();
  const filter = searchParams.get("filter")?.toString();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleCheck(checkedValues) {
    const params = new URLSearchParams(searchParams);
    if (checkedValues.length > 0) {
      params.set("filter", checkedValues.join(","));
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex h-full w-full flex-col rounded-xl border border-gray-200 bg-white shadow-lg">
      <form
        className="flex w-full flex-col items-center justify-between space-y-2 rounded-lg rounded-b-none bg-gray-200 p-4 lg:flex-row lg:space-x-2 lg:space-y-0"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(e.target[0].value);
        }}
      >
        <input
          className="input input-bordered w-5/6"
          placeholder={`搜索${title}`}
          defaultValue={query}
        />
        {/* TODO: Add post link */}

        <button className="btn btn-primary flex w-16 text-white" type="submit">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </form>

      {/* TODO: Add post link */}
      {/* <form className="w-full divide-y-2 p-4" > */}
      {labels.map((item) => (
        <div key={item.id} className="m-2 flex w-full flex-col space-y-2 pt-2">
          <div className="text-lg font-bold text-primary">{item.label}</div>
          <div className="flex w-full flex-wrap">
            {item.value.map((value) => (
              <div
                key={value.id}
                className="form-control m-2 border-collapse rounded-lg border bg-gray-200"
              >
                <label className="label cursor-pointer space-x-2 px-2">
                  <span className="label-text">{value.content}</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    defaultChecked={filter?.split(",").includes(value.content)}
                    onChange={(e) => {
                      // get the current checked values
                      const checkedValues = filter?.split(",") || [];
                      if (e.target.checked) {
                        // add the checked value
                        checkedValues.push(value.content);
                      } else {
                        // remove the unchecked value
                        checkedValues.splice(
                          checkedValues.indexOf(value.content),
                          1,
                        );
                      }
                      handleCheck(checkedValues);
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* <button className="btn btn-primary mt-6 w-full text-white" type="submit">
          确认条件
        </button> */}
      {/* </form> */}
    </div>
  );
}
