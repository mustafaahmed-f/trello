import { useAppSelector } from "../_lib/Store/Store";
import TaskSearchResult from "./TaskSearchResult";

interface AutoCompleteProps {
  tasksArr: { taskName: string; taskId: number; created_by: string }[];
}

function AutoComplete({ tasksArr }: AutoCompleteProps) {
  const { userId } = useAppSelector((store) => store.user);
  return (
    <div
      className="autoCompleteDialog bg-gray-400 overflow-x-hidden overflow-y-scroll rounded-bl-md rounded-br-md z-10 flex flex-col absolute translate-y-[104%] -bottom-0 left-0 w-full max-h-48 sm:max-h-60"
      suppressHydrationWarning
    >
      {!tasksArr.length && <p className="px-4 py-3">No results were found.</p>}
      {tasksArr.map((el, i) => (
        <TaskSearchResult
          index={i}
          key={el.taskId}
          taskId={el.taskId}
          taskTitle={el.taskName}
          isCreated={el.created_by === userId}
        />
      ))}
    </div>
  );
}

export default AutoComplete;
