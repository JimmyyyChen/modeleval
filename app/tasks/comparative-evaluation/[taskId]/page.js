"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Link from "next/link";

import {
  ChevronLeftIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

export default function HumanEvalDisplay({ params }) {
  const taskId = params.taskId;
  const [task, setTask] = useState({});
  const taskname = task.taskName;

  const [items, setItems] = useState(getItems(10)); // Initialize items state

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items, // use items directly
      result.source.index,
      result.destination.index,
    );

    setItems(newItems); // use setItems to update the state
  };

  const draggableList = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

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
        value={100}
        max={100}
      ></progress>
      <p className="h-0 text-sm text-gray-500 opacity-0  transition-all duration-300 group-hover:h-max group-hover:opacity-100">
        已完成 {100} 题, 剩余 {100} 题
      </p>
    </div>
  );

  return (
    <div className="flex w-full flex-col space-y-3">
      {stickyTitle}

      {/* TODO: add the dragable list here */}
      {draggableList}
    </div>
  );
}
