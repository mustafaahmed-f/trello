import { useAppSelector } from "../_lib/Store/Store";
import ViewTask from "../pages/tasks/components/ViewTask";

interface TaskSearchResultProps {
  index: number;
  taskTitle: string;
  taskId: number;
  isCreated: boolean;
}

function TaskSearchResult({
  index,
  taskTitle,
  isCreated,
}: TaskSearchResultProps) {
  const { tasks, assignedTasks } = useAppSelector((store) => store.tasks);
  const targetTasks = isCreated ? tasks : assignedTasks;
  const task = targetTasks.find((task) => task.title === taskTitle);
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
