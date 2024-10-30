import SingleTasks from "./SingleTasks";
import { useDroppable } from "@dnd-kit/core";

interface TaskListProps {
  tasks: any[];
  state: string;
}

function TaskList({ tasks, state }: TaskListProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${
      state === "To Do" ? "todo" : state === "On Progress" ? "doing" : "done"
    }`,
  });
  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver ? "opacity-35" : "opacity-100"
      } flex-grow h-full px-2 py-3 overflow-y-scroll rounded-lg taskList max-sm:w-full bg-primary-200 max-h-[900px] min-h-64`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={` w-2 rounded-full h-2 ${
            state === "To Do"
              ? "bg-todo"
              : state === "On Progress"
              ? "bg-onProgress"
              : "bg-done"
          }`}
        ></span>
        <p className="text-lg font-semibold">{state}</p>
      </div>
      <div
        className={`mb-3 w-full h-1  ${
          state === "To Do"
            ? "bg-todo"
            : state === "On Progress"
            ? "bg-onProgress"
            : "bg-done"
        }`}
      ></div>
      <div className="flex flex-col gap-3">
        {!tasks.length ? (
          <p className="text-center">There are no tasks.</p>
        ) : (
          tasks.map((task) => <SingleTasks key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

export default TaskList;
