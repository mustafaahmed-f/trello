import { useAppSelector } from "../../../_lib/Store/Store";
import DeleteDialog from "./DeleteDialog";
import EditTaskDialog from "./EditTaskDialog";
import ViewTask from "./ViewTask";

interface OptionsDropListProps {
  taskId: number;
  setHideDropList: React.Dispatch<React.SetStateAction<boolean>>;
}

function OptionsDropList({ taskId, setHideDropList }: OptionsDropListProps) {
  const { tasks } = useAppSelector((store) => store.tasks);
  const task = tasks.find((task) => task.id === taskId);
  return (
    <div className="optionsDropList bg-gray-200 absolute z-[9999999] translate-y-[104%] bottom-0 right-0 rounded-md overflow-hidden">
      <ViewTask setHideDropList={setHideDropList} task={task} />
      <EditTaskDialog setHideDropList={setHideDropList} taskId={taskId} />
      <DeleteDialog setHideDropList={setHideDropList} taskId={taskId} />
    </div>
  );
}

export default OptionsDropList;
