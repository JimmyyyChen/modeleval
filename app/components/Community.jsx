import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Community({ issues, textcontent }) {
    return (
      <div className="flex w-full flex-col items-center space-y-4 overflow-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="flex w-full items-center justify-between">
          <div className="font-bold text-primary">
            {textcontent}
          </div>
          <div>
            <button
              className="group btn btn-outline btn-primary flex h-auto w-full flex-row divide-y-2 divide-black py-2 shadow-md"
              onClick={() => document.getElementById(0).showModal()}
            >
              <PlusIcon className="h-6 w-6 text-primary group-hover:text-white" />
              新增
            </button>
            <dialog id="0" className="modal">
              <div className="modal-box space-y-4">
                <h3 className="text-2xl font-bold">New Issue</h3>
                <div className="modal-body m-4">
                  <textarea
                    placeholder="New Issue..."
                    className="textarea textarea-bordered textarea-lg h-64 w-full text-sm"
                  ></textarea>
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
        </div>
        <div className="w-full space-y-4 px-4 py-2 text-sm">
          {issues.map((item) => (
            <div key={item.id} className="w-full">
              <button
                className="btn flex h-auto w-full flex-col divide-y-2 divide-black py-2 shadow-md"
                onClick={() => document.getElementById(-item.id).showModal()}
              >
                <div className="m-1 flex w-full flex-row">
                  <div className="flex w-1/2 flex-row truncate text-left md:w-1/3 lg:w-1/6">
                    <div className="mx-2 h-4 w-4 rounded-full bg-blue-600"></div>
                    {item.user}
                  </div>
                  <div className="w-1/2 truncate text-left text-gray-400 md:w-2/3 lg:w-5/6">
                    {item.time}
                  </div>
                </div>
                <div className="flex h-auto w-full flex-row pt-2">
                  <div className="mx-2 w-full overflow-auto whitespace-normal text-left font-normal leading-5">
                    {item.content}
                  </div>
                </div>
              </button>
              <dialog id={-item.id} className="modal">
                <div className="modal-box space-y-4">
                  <h3 className="text-lg font-bold">Detail</h3>
                  <div className="modal-body m-4">
                    <div className="flex w-full flex-col space-y-4">
                      <div className="flex w-full flex-row">
                        <div className="w-1/3">User</div>
                        <Link
                          className="flex w-2/3 flex-row overflow-auto whitespace-normal "
                          href={`/profile/visitor/${item.user}`}
                        >
                          <div className="mx-2 h-6 w-6 rounded-full bg-blue-600"></div>
                          {item.user}
                        </Link>
                      </div>
                      <div className="flex w-full flex-row">
                        <div className="w-1/3">Time</div>
                        <div className="w-2/3 overflow-auto whitespace-normal ">
                          {item.time}
                        </div>
                      </div>
                      <div className="flex w-full flex-row">
                        <div className="w-1/3">Content</div>
                        <div className="w-2/3 overflow-auto whitespace-normal ">
                          {item.content}
                        </div>
                      </div>
                      <textarea
                        placeholder={`Reply to ${item.user}...`}
                        className="textarea textarea-bordered textarea-lg h-48 w-full text-sm"
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn mx-2">Reply</button>
                      <button className="btn mx-2">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          ))}
        </div>
      </div>
    );
}