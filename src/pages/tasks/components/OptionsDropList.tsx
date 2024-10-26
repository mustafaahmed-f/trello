import React from "react";
import ViewTask from "./ViewTask";
import { useAppSelector } from "../../../_lib/Store/Store";
import EditTaskDialog from "./EditTaskDialog";
import DeleteDialog from "./DeleteDialog";

interface OptionsDropListProps {
  taskId: number;
}

function OptionsDropList({ taskId }: OptionsDropListProps) {
  const { tasks } = useAppSelector((store) => store.tasks);
  const task = tasks.find((task) => task.id === taskId);
  return (
    <div className="optionsDropList bg-gray-300 absolute z-50 translate-y-[104%] bottom-0 right-0 rounded-md overflow-hidden">
      <ViewTask task={task} />
      <EditTaskDialog taskId={taskId} />
      <DeleteDialog taskId={taskId} />
    </div>
  );
}

export default OptionsDropList;
