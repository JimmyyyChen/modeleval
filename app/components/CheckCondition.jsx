"use client";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CheckCondition({ title, labels }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toString();
  const filter = searchParams.get("filter")?.toString();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    if (term !== "") {
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
    <div className="flex flex-col rounded-xl bg-white p-3 shadow-lg">
      <form
        className="flex items-center space-x-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(e.target[0].value);
        }}
      >
        <input
          className="input input-bordered w-5/6"
          placeholder={`搜索${title}`}
          defaultValue={searchParams.get("query")?.toString()}
        />

        <button type="submit">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>

        <button type="reset" onClick={() => handleSearch("")}>
          <XCircleIcon className="h-5 w-5  text-gray-500" />
        </button>
      </form>

      {/* TODO: Add post link */}
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
    </div>
  );
}
