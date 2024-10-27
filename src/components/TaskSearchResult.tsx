import { useAppSelector } from "../_lib/Store/Store";
import ViewTask from "../pages/tasks/components/ViewTask";

interface TaskSearchResultProps {
  index: number;
  taskTitle: string;
  taskId: number;
}

function TaskSearchResult({ index, taskTitle }: TaskSearchResultProps) {
  const { tasks } = useAppSelector((store) => store.tasks);
  const task = tasks.find((task) => task.title === taskTitle);
  return (
    <div
      className={`py-3 px-4 cursor-pointer ${
        index % 2 === 0 ? "bg-white" : "bg-neutral-200"
      } hover:bg-neutral-300`}
    >
      <ViewTask task={task} setHideDropList={() => {}}>
        {taskTitle}
      </ViewTask>
    </div>
  );
}

export default TaskSearchResult;
