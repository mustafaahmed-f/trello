interface TaskSearchResultProps {
  index: number;
  taskTitle: string;
  taskId: number;
}

function TaskSearchResult({ index, taskTitle }: TaskSearchResultProps) {
  return (
    <div
      className={`py-3 px-4 cursor-pointer ${
        index % 2 === 0 ? "bg-white" : "bg-neutral-200"
      } hover:bg-neutral-300`}
    >
      {taskTitle}
    </div>
  );
}

export default TaskSearchResult;
