import React from "react";
import { taskType } from "../_lib/taskType";
import TaskSearchResult from "./TaskSearchResult";

interface AutoCompleteProps {
  tasksArr: { taskName: string; taskId: number }[];
}

function AutoComplete({ tasksArr }: AutoCompleteProps) {
  return (
    <div
      className="autoCompleteDialog bg-gray-400 overflow-x-hidden overflow-y-scroll rounded-bl-md rounded-br-md z-50 flex flex-col absolute translate-y-[104%] -bottom-0 left-0 w-full max-h-48 sm:max-h-60"
      suppressHydrationWarning
    >
      {!tasksArr.length && <p className="px-4 py-3">No results were found.</p>}
      {tasksArr.map((el, i) => (
        <TaskSearchResult
          index={i}
          key={el.taskId}
          taskId={el.taskId}
          taskTitle={el.taskName}
        />
      ))}
    </div>
  );
}

export default AutoComplete;
