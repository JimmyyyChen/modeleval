"use client";
import Link from "next/link";
import { CircleStackIcon } from "@heroicons/react/24/solid";

export default function Home({ params: { name } }) {
  const datasetInfo = [
    {
      id: 1,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          />
        </svg>
      ),
      label: "下载",
      value: "133",
    },
    {
      id: 2,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ),
      label: "收藏",
      value: "10",
    },
  ];

  const datasetBadges = [
    {
      id: 1,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          />
        </svg>
      ),
      label: "标签1",
    },
    {
      id: 2,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          />
        </svg>
      ),
      label: "标签2",
    },
    {
      id: 3,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          />
        </svg>
      ),
      label: "标签3",
    },
    {
      id: 4,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          />
        </svg>
      ),
      label: "标签4",
    },
    {
      id: 5,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          />
        </svg>
      ),
      label: "标签5",
    },
    {
      id: 6,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          />
        </svg>
      ),
      label: "标签6",
    },
    {
      id: 7,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          />
        </svg>
      ),
      label: "标签7",
    },
    {
      id: 8,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          />
        </svg>
      ),
      label: "标签8",
    },
    {
      id: 9,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          />
        </svg>
      ),
      label: "标签9",
    },
    {
      id: 10,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          />
        </svg>
      ),
      label: "标签10",
    },
    {
      id: 11,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      label: "标签11",
    },
    {
      id: 12,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      label: "标签12",
    }
  ];

  const datasetItems = [
    {
      id: 1,
      question:
        "ajskdfhasdgfasdfgfdsgad kjfhask djfgas kdjfhaskjdfgsakjd fhgaksjhdfaksjbd ,mzvbz,mnvbkasfhwqejhgqfwbflj ,asnb,fmfnbalsdf ladsfhlkajshdflka jshiuqwhfl kaf,sd",
      answer: "A",
      options: ["A", "B", "C", "D"],
    },
    {
      id: 2,
      question:
        "中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试中文问题测试",
      answer: "B",
      options: ["A", "B", "C", "D"],
    },
    {
      id: 3,
      question:
        "ajskdfhgadkjfhaskdjfgaskdjfhaskjdfgsakjdfhgaksjhdfaksjbd,mzvbz,mnvbkasfhwqejhgqfwbflj,asnb,fmfnbalsdfladsfhlkajshdflkajshiuqwhflkaf,sd",
      answer: "C",
      options: ["A", "B", "C", "D"],
    },
    {
      id: 4,
      question:
        "ajskdfhgadkjfhaskdjfgaskdjfhaskjdfgsakjdfhgaksjhdfaksjbd,mzvbz,mnvbkasfhwqejhgqfwbflj,asnb,fmfnbalsdfladsfhlkajshdflkajshiuqwhflkaf,sd",
      answer: "D",
      options: ["A", "B", "C", "D"],
    },
    {
      id: 5,
      question:
        "ajskdfhgadkjfhaskdjfgaskdjfhaskjdfgsakjdfhgaksjhdfaksjbd,mzvbz,mnvbkasfhwqejhgqfwbflj,asnb,fmfnbalsdfladsfhlkajshdflkajshiuqwhflkaf,sd",
      answer: "A",
      options: ["A", "B", "C", "D"],
    },
    {
      id: 6,
      question:
        "ajskdfhgadkjfhaskdjfgaskdjfhaskjdfgsakjdfhgaksjhdfaksjbd,mzvbz,mnvbkasfhwqejhgqfwbflj,asnb,fmfnbalsdfladsfhlkajshdflkajshiuqwhflkaf,sd",
      answer: "B",
      options: ["A", "B", "C", "D"],
    },
    {
      id: 7,
      question:
        "ajskdfhgadkjfhaskdjfgaskdjfhaskjdfgsakjdfhgaksjhdfaksjbd,mzvbz,mnvbkasfhwqejhgqfwbflj,asnb,fmfnbalsdfladsfhlkajshdflkajshiuqwhflkaf,sd",
      answer: "C",
      options: ["A", "B", "C", "D"],
    },
    {
      id: 8,
      question:
        "ajskdfhgadkjfhaskdjfgaskdjfhaskjdfgsakjdfhgaksjhdfaksjbd,mzvbz,mnvbkasfhwqejhgqfwbflj,asnb,fmfnbalsdfladsfhlkajshdflkajshiuqwhflkaf,sd",
      answer: "D",
      options: ["A", "B", "C", "D"],
    },
    {
      id: 9,
      question:
        "ajskdfhgadkjfhaskdjfgaskdjfhaskjdfgsakjdfhgaksjhdfaksjbd,mzvbz,mnvbkasfhwqejhgqfwbflj,asnb,fmfnbalsdfladsfhlkajshdflkajshiuqwhflkaf,sd",
      answer: "A",
      options: ["A", "B", "C", "D"],
    },
    {
      id: 10,
      question:
        "ajskdfhgadkjfhaskdjfgaskdjfhaskjdfgsakjdfhgaksjhdfaksjbd,mzvbz,mnvbkasfhwqejhgqfwbflj,asnb,fmfnbalsdfladsfhlkajshdflkajshiuqwhflkaf,sd",
      answer: "B",
      options: ["A", "B", "C", "D"],
    },
  ];

  const pages = 10;

  const issues = [
    {
      id: 1,
      user: "user1",
      content: "content1",
      time: "2023-10-10",
    },
    {
      id: 2,
      user: "user2",
      content:
        "content2 content2contefdsgsdfgsdfgsdfgsdfgsdfgdsfgnt2con tent2conten t2content2conten t2conten t2content2content2c ontent2content 2content2 content2conte nt2conte nt2conten t2content2",
      time: "2023-10-10",
    },
    {
      id: 3,
      user: "user3",
      content:
        "content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 ",
      time: "2023-10-10",
    },
    {
      id: 4,
      user: "user4",
      content: "content4",
      time: "2023-10-10",
    },
    {
      id: 5,
      user: "user5",
      content: "content5",
      time: "2023-10-10",
    },
    {
      id: 6,
      user: "user6",
      content: "content6",
      time: "2023-10-10",
    },
  ];

  return (
    <>
      <div className="flex w-full flex-col sm:flex-row items-center text-center space-y-4 sm:space-y-0 sm:text-left sm:space-x-6 ">
        <div className="flex flex-row items-center space-x-4 text-left text-4xl font-bold text-primary">
          <CircleStackIcon
            className="h-12 w-12"
            aria-hidden="true"
          ></CircleStackIcon>
          <div>{name}</div>
        </div>
        {datasetInfo.map((item) => (
          <div className="flex flex-row items-center">
            <button
              className="btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-r-none px-2 text-xs"
              // onClick={}
            >
              {item.svg}
              {item.label}
            </button>
            <button
              className="btn btn-outline btn-primary h-8 min-h-0 rounded-full rounded-l-none border-l-0 px-2 text-xs"
              // onClick={}
            >
              {item.value}
            </button>
          </div>
        ))}
      </div>

      <div className="test-xs mt-6 flex w-full flex-row flex-wrap items-center">
        {datasetBadges.map((item) => (
          <div className="flex flex-row items-center mx-2 my-2">
            <button
              className="badge badge-primary badge-outline space-x-2 max-h-6 h-6"
              // onClick={}
            >
              {item.svg}
              <div>{item.label}</div>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex h-full w-full flex-wrap items-center space-x-0 space-y-6 sm:flex-nowrap sm:space-x-6 sm:space-y-0 ">
        <div className="m-4 h-full w-full flex-1 rounded-xl bg-white shadow-lg sm:w-2/3">
          <form className="flex h-36 w-full flex-col items-center justify-between space-y-2 rounded-lg rounded-b-none bg-gray-200 p-4 lg:h-24 lg:flex-row lg:space-x-2 lg:space-y-0">
            <input
              className="input input-bordered w-5/6"
              placeholder="搜索数据集"
            />
            {/* TODO: Add post link */}
            <button className="btn btn-primary w-16 text-white">搜索</button>
          </form>

          {/* TODO: Add post link */}
          <div className="w-full flex-1 space-y-4 p-6">
            <button className="btn w-full shadow-md">
              <div className="flex w-full flex-row">
                <div className="w-1/6 truncate text-left">ID</div>
                <div className="w-4/6 truncate text-center">Question</div>
                <div className="w-1/6 truncate text-right">Answer</div>
              </div>
            </button>
            {datasetItems.map((item) => (
              <div key={item.id}>
                <button
                  className="btn w-full shadow-md"
                  onClick={() => document.getElementById(item.id).showModal()}
                >
                  <div className="flex w-full flex-row">
                    <div className="w-1/6 truncate text-left">{item.id}</div>
                    <div className="w-4/6 truncate text-left">
                      {item.question}
                    </div>
                    <div className="w-1/6 truncate text-right">
                      {item.answer}
                    </div>
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

        <div className="flex h-full w-full p-4 sm:w-1/3">
          <div className="flex h-full w-full flex-col items-center space-y-4 p-6">
            <Link href={`/profile/visitor/Admin`}>
              <div className="h-32 w-32 rounded-full bg-blue-600 shadow-md"></div>
              <div className="text-3xl font-bold">Admin</div>
            </Link>
            <div className="cursor-pointer font-semibold text-blue-600 hover:italic">
              @Tsinghua
            </div>
            <Link href="mailto:admin@mails.tsinghua.edu.cn">
              admin@mails.tsinghua.edu.cn
            </Link>
            <div className="text-gray-400">Time: 2023-11-11</div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-6 p-4">
        <div className="flex w-full justify-between">
          <div className="text-4xl font-bold text-primary">Issues</div>
          <div>
            <button
              className="btn flex h-auto w-full flex-row divide-y-2 divide-black py-2 shadow-md"
              onClick={() => document.getElementById(0).showModal()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
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
        <div className="flex w-full flex-col items-center space-y-4 overflow-auto rounded-2xl bg-white p-6 shadow-lg">
          {issues.map((item) => (
            <div key={item.id} className="w-full">
              <button
                className="btn flex h-auto w-full flex-col divide-y-2 divide-black py-2 shadow-md"
                onClick={() => document.getElementById(-item.id).showModal()}
              >
                <div className="m-1 flex w-full flex-row">
                  <div className="flex w-1/6 flex-row truncate text-left">
                    <div className="mx-2 h-4 w-4 rounded-full bg-blue-600"></div>
                    {item.user}
                  </div>
                  <div className="w-5/6 truncate text-left text-gray-400">
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
    </>
  );
}
