import React, { useEffect, useRef } from "react";
import OptionsDropList from "./OptionsDropList";
import dotsImage from "/src/assets/dots.svg";
import { useDraggable } from "@dnd-kit/core";
import { useAppSelector } from "../../../_lib/Store/Store";
interface SingleTasksProps {
  task: any;
}

function SingleTasks({ task }: SingleTasksProps) {
  const { userId } = useAppSelector((store) => store.user);
  //// this state is used to delay drag so we can click on the options drop list
  const { 0: dragging, 1: setDragging } = React.useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${task.id}-${task.created_by === userId}-${task.state}`,
  });
  const { 0: showDropList, 1: setShowDropList } = React.useState(false);
  //// This is used to make opacity 0 of drop list when clicking on any option.
  const { 0: hideDropList, 1: setHideDropList } = React.useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  let timeOut = useRef<NodeJS.Timeout | null>(null);

  function handleDragging() {
    timeOut.current = setTimeout(() => {
      setDragging(true);
    }, 60);
  }

  function handleStopDrag() {
    setDragging(false);
    if (timeOut.current) {
      clearTimeout(timeOut.current);
      timeOut.current = null;
    }
  }

  useEffect(() => {
    return () => {
      if (timeOut.current) {
        clearTimeout(timeOut.current);
      }
    };
  }, []);

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
    <div
      onMouseDown={handleDragging}
      onMouseUp={handleStopDrag}
      className="relative flex flex-col gap-4 p-3 bg-white rounded-lg cursor-grab"
      ref={setNodeRef}
      {...(dragging ? listeners : {})}
      {...attributes}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
    >
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
            <img src={dotsImage} alt="dots" />
          </div>
          {showDropList && (
            <div
              ref={dropdownRef}
              className={hideDropList ? "opacity-0" : "opacity-100"}
            >
              <OptionsDropList task={task} setHideDropList={setHideDropList} />
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
