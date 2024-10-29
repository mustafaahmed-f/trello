import { useAppSelector } from "../../../_lib/Store/Store";
import DeleteDialog from "./DeleteDialog";
import EditTaskDialog from "./EditTaskDialog";
import ViewTask from "./ViewTask";

interface OptionsDropListProps {
  task: any;
  setHideDropList: React.Dispatch<React.SetStateAction<boolean>>;
}

function OptionsDropList({ task, setHideDropList }: OptionsDropListProps) {
  const { userId } = useAppSelector((store) => store.user);
  return (
    <div className="optionsDropList bg-gray-200 absolute z-[9999999] translate-y-[104%] bottom-0 right-0 rounded-md overflow-hidden">
      <ViewTask setHideDropList={setHideDropList} task={task} />
      <EditTaskDialog setHideDropList={setHideDropList} task={task} />
      {userId === task?.created_by && (
        <DeleteDialog setHideDropList={setHideDropList} task={task} />
      )}
    </div>
  );
}

export default OptionsDropList;
