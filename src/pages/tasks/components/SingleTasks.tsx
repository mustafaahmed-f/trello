import React, { useEffect, useRef } from "react";
import OptionsDropList from "./OptionsDropList";

interface SingleTasksProps {
  task: any;
}

function SingleTasks({ task }: SingleTasksProps) {
  const { 0: showDropList, 1: setShowDropList } = React.useState(false);
  //// This is used to make opacity 0 of drop list when clicking on any option.
  const { 0: hideDropList, 1: setHideDropList } = React.useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (buttonRef.current && buttonRef.current.contains(e.target as Node)) {
        setShowDropList((prev) => !prev); // Toggle dropdown
      } else if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !hideDropList
      ) {
        setShowDropList(false); // Close dropdown if clicking outside
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [setShowDropList, hideDropList]);

  return (
    <div className="relative flex flex-col gap-4 p-3 bg-white rounded-lg">
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
          <div
            ref={buttonRef}
            className={`w-4 h-4 cursor-pointer rounded-full showOptions-${task.id}`}
          >
            <img src="/src/assets/dots.svg" alt="dots" />
          </div>
          {showDropList && (
            <div
              ref={dropdownRef}
              className={hideDropList ? "opacity-0" : "opacity-100"}
            >
              <OptionsDropList
                taskId={task.id}
                setHideDropList={setHideDropList}
              />
            </div>
          )}
        </div>
      </div>
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p>
        {task?.description?.substring(0, 25)}{" "}
        {task?.description?.length > 25 ? "..." : ""}
      </p>
    </div>
  );
}

export default SingleTasks;
