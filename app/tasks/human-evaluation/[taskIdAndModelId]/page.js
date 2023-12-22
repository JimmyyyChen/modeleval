"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import {
  ChevronLeftIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function HumanEvalDisplay({ params }) {
  // params.taskIdAndModelId is something like "1-2"
  const taskId = params.taskIdAndModelId.split("-")[0];
  const modelId = params.taskIdAndModelId.split("-")[1];
  const [task, setTask] = useState({});
  const taskname = task.taskName;
  const answers = task.answerjson ? task.answerjson[modelId].answers : [];
  // answer that "isCorrect" exist
  const answeredCount = answers.filter(
    (answer) => answer.isCorrect === true || answer.isCorrect === false,
  ).length;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/info/taskId/${taskId}`);
        const data = response.data[0];
        setTask(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [taskId]);

  const stickyTitle = (
    <div className="group sticky top-5 z-50 flex flex-col self-start rounded-3xl bg-secondary p-4 shadow-lg transition-all duration-300 hover:scale-110 hover:space-y-3 hover:p-7 hover:shadow-2xl">
      <div className="flex items-center space-x-3 transition-all duration-300">
        <Link href={`/tasks/${taskId}`}>
        <ChevronLeftIcon className="h-6 w-6 text-gray-500 transition-all duration-300" />
        </Link>
        <h1 className="text-lg font-bold text-primary transition-all duration-300 ">
          {taskname}
        </h1>
      </div>
      <progress
        className="progress h-0 w-0 transition-all duration-300 group-hover:h-3 group-hover:w-full"
        value="70"
        max="100"
      ></progress>
      <p className="h-0 text-sm text-gray-500 opacity-0  transition-all duration-300 group-hover:h-max group-hover:opacity-100">
        已完成 {answeredCount} 题, 剩余 {answers.length} 题
      </p>
    </div>
  );

  return (
    <div className="flex w-full flex-col space-y-3">
      {stickyTitle}

      {answers.map((answer, index) => {
        const question = answer.question;
        const generatedAnswer = answer.generatedAnswer;
        const isCorrect = answer.isCorrect;
        return QuestionCard(index + 1, question, generatedAnswer, isCorrect);
      })}
    </div>
  );
}

function QuestionCard(id, question, generatedAnswer, isCorrect) {
  // this id is not the exact question id store in the database
  const correctButtonStyle =
    isCorrect === true
      ? "btn btn-success text-white"
      : "btn btn-success bg-white border-success text-success";
  const wrongButtonStyle =
    isCorrect === false
      ? "btn btn-error text-white"
      : "btn btn-error bg-white border-error text-error";

  return (
    <div className="space-y-3 rounded-3xl border bg-base-100 p-6">
      <p className=" text-xl font-bold ">问题 {id}</p>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-primary">{question}</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-secondary">
          {generatedAnswer}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-5 ">
        <div className="flex justify-center space-x-10">
          <button className={correctButtonStyle}>
            <CheckCircleIcon className="h-5 w-5" />
            正确
          </button>
          <button className={wrongButtonStyle}>
            <XCircleIcon className="h-5 w-5" />
            错误
          </button>
        </div>
      </div>
    </div>
  );
}
