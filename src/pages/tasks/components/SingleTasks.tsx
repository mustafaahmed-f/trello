import React, { useEffect } from "react";
import OptionsDropList from "./OptionsDropList";

interface SingleTasksProps {
  task: any;
}

function SingleTasks({ task }: SingleTasksProps) {
  const { 0: showDropList, 1: setShowDropList } = React.useState(false);

  useEffect(() => {
    const showOptionsBtn = document.querySelector(`.showOptions-${task.id}`);
    function handleClick(e: any) {
      const optionsDropList = document.querySelector(".optionsDropList");
      if (e.target.closest(`.showOptions-${task.id}`)) {
        setShowDropList(!showDropList);
      } else if (optionsDropList && optionsDropList.contains(e.target)) {
        return;
      } else if (showDropList && !optionsDropList?.contains(e.target)) {
        setShowDropList(!showDropList);
      }
    }
    showOptionsBtn?.addEventListener("click", handleClick);
    return () => {
      showOptionsBtn?.removeEventListener("click", handleClick);
    };
  }, [showDropList, setShowDropList, task.id]);

  return (
    <div className="flex-col items-center gap-2 p-3 bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <p
          className={`p-1 rounded-md bg-state ${
            task.priority === "low" || task.priority === "medium"
              ? "text-stateText"
              : "text-highStateText"
          }`}
        >
          {task.priority}
        </p>
        <div className="relative">
          <img
            src="/src/assets/dots.svg"
            alt="dots"
            className={`cursor-pointer showOptions-${task.id}`}
          />
          {showDropList && <OptionsDropList taskId={task.id} />}
        </div>
      </div>
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p>
        {task?.description?.substring(0, 25)}{" "}
        {task?.discription?.length > 25 ? "..." : ""}
      </p>
    </div>
  );
}

export default SingleTasks;
