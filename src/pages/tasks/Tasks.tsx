import { useEffect, useState } from "react";
import { getTasks } from "../../_lib/APIs/TaskAPIs";
import { fetchTasks } from "../../_lib/Store/Slices/TasksSlice";
import { useAppDispatch, useAppSelector } from "../../_lib/Store/Store";
import { checkUserSession } from "../../_lib/checkUserSession";
import Loader from "../../components/Loader";
import NewTaskDialog from "./components/NewTaskDialog";
import TaskList from "./components/TaskList";
interface TasksProps {}

function Tasks({}: TasksProps) {
  const { 0: isLoading, 1: setIsLoading } = useState(true);
  const user = useAppSelector((store) => store.user);
  const dipatch = useAppDispatch();
  const { tasks } = useAppSelector((store) => store.tasks);
  useEffect(() => {
    async function checkUser() {
      if (!user.isAuth) {
        await checkUserSession();
      }
    }

    checkUser();
  }, [user.isAuth, dipatch]);

  useEffect(() => {
    async function tasks() {
      setIsLoading(true);
      const tasks = await getTasks();
      setIsLoading(false);
      if (tasks) {
        dipatch(fetchTasks(tasks));
      }
    }

    tasks();
  }, [dipatch, setIsLoading]);

  const toDoTasks = tasks.filter((task) => task.state === "todo");
  const inProgressTasks = tasks.filter((task) => task.state === "doing");
  const doneTasks = tasks.filter((task) => task.state === "done");
  // console.log(toDoTasks);
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="flex gap-3 mb-3">
        <NewTaskDialog />
      </div>
      <div className="max-sm:flex max-sm:flex-col items-center justify-between w-full gap-3 sm:grid sm:grid-cols-[1fr_1fr_1fr]">
        <TaskList tasks={toDoTasks} state="To Do" />
        <TaskList tasks={inProgressTasks} state="On Progress" />
        <TaskList tasks={doneTasks} state="Done" />
      </div>
    </>
  );
}

export default Tasks;
