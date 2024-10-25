import React from "react";

interface TaskSearchResultProps {
  index: number;
  taskTitle: string;
  taskId: number;
}

function TaskSearchResult({ index, taskTitle, taskId }: TaskSearchResultProps) {
  return (
    <div
      className={`py-3 px-4 ${
        index % 2 === 0 ? "bg-white" : "bg-neutral-200"
      } hover:bg-neutral-300`}
    >
      {taskTitle}
    </div>
  );
}

export default TaskSearchResult;
