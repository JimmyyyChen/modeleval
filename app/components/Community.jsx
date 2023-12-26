"use client";
import axios from "axios";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function Community({ id, type }) {
  const fromContext = type === 1 ? "fromDataset" : "fromModel";
  const [comments, setComments] = useState([]);

  const submitComment = (content) => {
    // 上传新留言 `POST /api/comments/upload`
    axios
      .post("/api/comments/upload", {
        type: type,
        id: parseInt(id),
        content: content,
      })
      .then(function (response) {
        axios.get(`/api/comments/${fromContext}/${id}`).then((res) => {
          setComments(res.data);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/comments/${fromContext}/${id}`)
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fromContext, id, type]);

  return (
    <div className="flex w-full flex-col items-center space-y-4 overflow-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="flex w-full items-center justify-between">
        <div className="font-bold text-primary">留言</div>
        <div>
          <button
            className="group btn btn-outline btn-primary flex h-auto w-full flex-row divide-y-2 divide-black py-2 shadow-md rounded-3xl"
            onClick={() => document.getElementById(0).showModal()}
          >
            <PlusIcon className="h-6 w-6 text-primary group-hover:text-white" />
          留言
          </button>
          <dialog id="0" className="modal">
            <div className="modal-box space-y-4">
              <h3 className="text-2xl font-bold">新留言</h3>
              <div className="modal-body m-4">
                <textarea
                  name="comment-textarea"
                  className="textarea textarea-bordered textarea-lg h-64 w-full text-sm"
                ></textarea>
              </div>
              <div className="modal-action ">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <div className="flex space-x-2">
                    <button className="btn">取消</button>
                    {/* TODO */}
                    <button
                      className="btn btn-accent"
                      onClick={(e) => {
                        e.preventDefault();
                        submitComment(
                          document.getElementsByName("comment-textarea")[0]
                            .value,
                        );
                        document.getElementsByName(
                          "comment-textarea",
                        )[0].value = "";
                        document.getElementById(0).close();
                      }}
                    >
                      提交
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <div className="w-full space-y-4 px-4 py-2 text-sm">
        {comments.map((comment) => {
          const userName = comment.username;
          const content = comment.content;
          const commentTime = new Date(comment.commentTime).toLocaleString();
          return (
            <div key={comment.id} className="w-full">
              <button
                className="btn flex h-auto w-full flex-col divide-y-2 divide-black py-2 shadow-md"
                onClick={() => document.getElementById(-comment.id).showModal()}
              >
                <div className="m-1 flex w-full flex-row">
                  <div className="flex w-1/2 flex-row truncate text-left md:w-1/3 lg:w-1/6">
                    {userName}
                  </div>
                  <div className="w-1/2 truncate text-left text-gray-400 md:w-2/3 lg:w-5/6">
                    {commentTime}
                  </div>
                </div>
                <div className="flex h-auto w-full flex-row pt-2">
                  <div className="mx-2 w-full overflow-auto whitespace-normal text-left font-normal leading-5">
                    {content}
                  </div>
                </div>
              </button>
              <dialog id={-comment.id} className="modal">
                <div className="modal-box space-y-4">
                  <h3 className="text-lg font-bold">留言</h3>
                  <div className="modal-body m-4">
                    <div className="flex w-full flex-col space-y-4">
                      <div className="flex w-full flex-row">
                        <div className="w-1/3">用户</div>
                        <Link
                          className="flex w-2/3 flex-row overflow-auto whitespace-normal "
                          href={`/profile/visitor/${userName}`}
                        >
                          {userName}
                        </Link>
                      </div>
                      <div className="flex w-full flex-row">
                        <div className="w-1/3">时间</div>
                        <div className="w-2/3 overflow-auto whitespace-normal ">
                          {commentTime}
                        </div>
                      </div>
                      <div className="flex w-full flex-row">
                        <div className="w-1/3">内容</div>
                        <div className="w-2/3 overflow-auto whitespace-normal ">
                          {content}
                        </div>
                      </div>
                      {/* TODO */}
                      {/* <textarea
                        placeholder={`Reply to ${userName}...`}
                        className="textarea textarea-bordered textarea-lg h-48 w-full text-sm"
                      ></textarea> */}
                    </div>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      {/* <button className="btn mx-2">Reply</button> */}
                      <button className="btn mx-2">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          );
        })}
      </div>
    </div>
  );
}
