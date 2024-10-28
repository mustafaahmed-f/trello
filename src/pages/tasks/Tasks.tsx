import { useEffect, useState } from "react";
import { getTasks } from "../../_lib/APIs/TaskAPIs";
import { fetchTasks } from "../../_lib/Store/Slices/TasksSlice";
import { useAppDispatch, useAppSelector } from "../../_lib/Store/Store";
import { checkUserSession } from "../../_lib/checkUserSession";
import Loader from "../../components/Loader";
import NewTaskDialog from "./components/NewTaskDialog";
import TaskList from "./components/TaskList";
import { Button } from "@mui/material";
import FilterBtn from "./components/FilterBtn";
interface TasksProps {}

function Tasks({}: TasksProps) {
  const { 0: isLoading, 1: setIsLoading } = useState(true);
  const { 0: open, 1: setOpen } = useState(false);
  //// value of filtering
  const { 0: selectedValue, 1: setSelectedValue } = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const user = useAppSelector((store) => store.user);
  const dipatch = useAppDispatch();
  const { tasks: reduxTasks } = useAppSelector((store) => store.tasks);
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
      const fetchedTasks = await getTasks();
      console.log(fetchedTasks);
      setIsLoading(false);
      if (fetchedTasks) {
        dipatch(fetchTasks(fetchedTasks));
      }
    }

    tasks();
  }, [dipatch, setIsLoading]);

  let finalTasks =
    selectedValue === "" || selectedValue === "none"
      ? reduxTasks
      : reduxTasks.filter((task) => task.priority === selectedValue);

  const toDoTasks = finalTasks.filter((task) => task.state === "todo");
  const inProgressTasks = finalTasks.filter((task) => task.state === "doing");
  const doneTasks = finalTasks.filter((task) => task.state === "done");
  // console.log(toDoTasks);
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col gap-3 mb-3">
        <div className="flex gap-3 ">
          <NewTaskDialog />
          <Button variant="outlined" onClick={handleClickOpen}>
            Filter
          </Button>
          <FilterBtn
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </div>
        {selectedValue && selectedValue !== "none" && (
          <p>
            <span className="font-bold underline underline-offset-1 me-1">
              Filtered By :
            </span>
            {selectedValue}
          </p>
        )}
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
