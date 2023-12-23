"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import { ChevronLeftIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// TODO: dropabble cause warning, but i'm tired of fixing it .....

// reorder the list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Answer {
  constructor(questionContent, modelId, answerText, rank) {
    this.questionContent = questionContent; // answer to this question
    this.modelId = modelId; // generated by this model
    this.answerText = answerText;
    this.rank = rank; // ranking of this answer, it can be undefined
  }
}

class Question {
  constructor(questionText, questionIndex) {
    this.questionContent = questionText;
    this.questionIndex = questionIndex; // id in database
    this.isRanked = false;
    this.answers = []; // answers to this question, ordered by rankings
  }
  addAnswer(answer) {
    this.answers.push(answer);
    // TODO: sort the answers by ranking
  }
}

export default function HumanEvalDisplay({ params }) {
  const taskId = parseInt(params.taskId);
  const [task, setTask] = useState({});
  const taskname = task.taskName;

  // make an array of questions sorted by questionIndex
  const [questionsArray, setQuestionsArray] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/info/taskId/${taskId}`);
        const data = response.data[0];
        setTask(data);

        const answerjson = data.answerjson;
        const answerCount = Object.keys(answerjson).length;

        let questions = {};
        // Iterate through the answer json and create questions
        for (let modelIdKey in answerjson) {
          const answers = answerjson[modelIdKey].answers;
          for (let questionIndex in answers) {
            // Extract details from the answer object
            // Note that rank could be null
            const { question, rank, generatedAnswer } = answers[questionIndex];

            // Check if the question already exists
            if (!questions[question]) {
              questions[question] = new Question(question, questionIndex);
            }

            // Create a new answer and add it to the question
            const answer = new Answer(
              question,
              modelIdKey,
              generatedAnswer,
              rank,
            );
            questions[question].addAnswer(answer);
            // if this question's has answers length equal to answerCount, and all the answer's rank is defined, then this question is ranked
            if (
              questions[question].answers.length === answerCount &&
              questions[question].answers.every(
                (answer) => answer.rank !== undefined,
              )
            ) {
              questions[question].isRanked = true;
            }
          }
        }
        const questionsArray = Object.values(questions).sort(
          (a, b) => a.questionIndex - b.questionIndex,
        );
        setQuestionsArray(questionsArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [taskId, questionsArray]);


  const isRankedCount = questionsArray.filter((question) => question.isRanked).length;
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
        // number of questions that are ranked
        value={isRankedCount}
        max={questionsArray.length}
      ></progress>
      <p className="h-0 text-sm text-gray-500 opacity-0  transition-all duration-300 group-hover:h-max group-hover:opacity-100">
        已完成 {isRankedCount} 题, 剩余 {questionsArray.length-isRankedCount} 题
      </p>
    </div>
  );

  return (
    <div className="flex w-full flex-col space-y-3">
      {stickyTitle}

      {questionsArray.map((question) => (
        <QuestionAnswersCard
          question={question}
          key={question.questionIndex}
          taskId={taskId}
        />
      ))}
    </div>
  );
}

function QuestionAnswersCard({ question, taskId }) {
  const questionIndex = question.questionIndex;
  const questionContent = question.questionContent;
  const isRanked = question.isRanked;
  let initAnswers = question.answers;

  // if the question isn't ranked, then shuffle the answers
  if (!isRanked) {
    initAnswers = initAnswers.sort(() => Math.random() - 0.5);
  } else {
    initAnswers = initAnswers.sort((a, b) => a.rank - b.rank);
  }

  const [rankedAnswers, setRankedAnswers] = useState(initAnswers);
  const [isReordered, setIsReordered] = useState(false);

  const handleClick = async () => {
    // rank is something like [3, 9, 5, 1], which means the answer generated by modelId 3 is ranked 1st, modelId 9 is ranked 2nd, etc.
    const rank = rankedAnswers.map((answer) => parseInt(answer.modelId));

    const response = await axios.post(
      `http://localhost:3000/api/tasks/scores/updateOnceAd`,
      {
        id: taskId,
        index: questionIndex,
        rank: rank,
      },
    );
    console.log(response);

    setIsReordered(false);
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newRankedAnswers = reorder(
      rankedAnswers, // this is the array to be reordered when drag ends
      result.source.index,
      result.destination.index,
    );

    setRankedAnswers(newRankedAnswers); // update the state
    if (newRankedAnswers !== initAnswers) {
      setIsReordered(true);
    }
  };

  return (
    // TODO: encounter error "Invariant failed: Cannot finish a drop animating when no drop is occurring". Check https://github.com/atlassian/react-beautiful-dnd/issues/2507
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3 rounded-3xl border bg-base-100 p-6"
          >
            <div className="flex items-center space-x-3">
              <p className=" text-xl font-bold ">
                问题 {parseInt(questionIndex) + 1}
              </p>

              {!isRanked ? (
                <span className="font-bold text-error">未排序</span>
              ) : isReordered ? (
                <span className="font-bold text-accent">修改排序中</span>
              ) : (
                <span className="font-bold text-success">已排序</span>
              )}
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-primary">
                {questionContent}
              </div>
            </div>

            {rankedAnswers.map((answer, index) => (
              <Draggable
                key={answer.modelId}
                draggableId={answer.modelId}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="group chat chat-start items-center space-x-5"
                  >
                    <ChevronUpDownIcon className="h-7 w-7 transition-all group-hover:scale-110 group-active:scale-125 " />
                    <div className="group- chat-bubble chat-bubble-secondary transition-all group-hover:scale-105 group-active:scale-110 group-active:shadow-lg">
                      {answer.answerText}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {/* 提交按钮 */}
            <div className="flex justify-center">
              {isRanked ? (
                <div
                  className={`flex space-x-5 transition-all ${
                    isReordered ? "opacity-100" : "h-0 opacity-0"
                  }`}
                >
                  <button
                    disabled={!isReordered}
                    onClick={() => {
                      setRankedAnswers(initAnswers);
                      setIsReordered(false);
                    }}
                  >
                    ↺
                  </button>

                  <button
                    className="btn btn-accent"
                    onClick={handleClick}
                    disabled={!isReordered}
                  >
                    修改
                  </button>
                </div>
              ) : (
                <button className="btn btn-accent" onClick={handleClick}>
                  提交
                </button>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
