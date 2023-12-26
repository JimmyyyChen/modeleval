"use client";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
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
    <div className="flex flex-col space-y-3">
      <form
        className="flex items-center space-x-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(e.target[0].value);
        }}
      >
        <input
          className="input input-bordered w-5/6 rounded-3xl"
          placeholder={`搜索${title}`}
          defaultValue={searchParams.get("query")?.toString()}
        />

        <button type="submit" className="btn btn-circle btn-primary text-white shadow">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>

        <button
          type="reset"
          onClick={() => handleSearch("")}
          className="btn btn-circle shadow"
        >
          <XMarkIcon className="h-5 w-5  text-gray-500" />
        </button>
      </form>

      {/* TODO: Add post link */}
      {labels.map((item) => (
        <div key={`label-${item.id}`} className="flex flex-col space-y-2 ">
          <div className="text-xl font-bold text-primary">{item.label}</div>
          <div className="flex flex-wrap">
            {item.value.map((value) => (
              <div
                key={`label-${item.id}-value-${value.content}`}
                className="form-control m-1 px-2 rounded-3xl  bg-white shadow"
              >
                <label className="label cursor-pointer space-x-2 p-2">
                  <input
                    type="checkbox"
                    className = "checkbox checkbox-primary w-4 h-4"
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
                  <span className="label-text font-bold text-gray-700">{value.content}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
