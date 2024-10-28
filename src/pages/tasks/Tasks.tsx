import { useEffect, useState } from "react";
import { getTasks, getUsersToAssign } from "../../_lib/APIs/TaskAPIs";
import { fetchTasks } from "../../_lib/Store/Slices/TasksSlice";
import { useAppDispatch, useAppSelector } from "../../_lib/Store/Store";
import { checkUserSession } from "../../_lib/checkUserSession";
import Loader from "../../components/Loader";
import NewTaskDialog from "./components/NewTaskDialog";
import TaskList from "./components/TaskList";
import { Button } from "@mui/material";
import FilterBtn from "./components/FilterBtn";
import supabase from "../../_lib/supabase";
interface TasksProps {}

function Tasks({}: TasksProps) {
  const { 0: isLoading, 1: setIsLoading } = useState(true);
  const { 0: open, 1: setOpen } = useState(false);
  //// value of filtering
  const { 0: selectedValue, 1: setSelectedValue } = useState("");
  //// users to assign state will be sent to the new task dialog
  const { 0: usersToAssign, 1: setUsersToAssign } = useState<
    {
      userName: string;
      user_id: string;
    }[]
  >([]);

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
      //// used to get logged in user's id to use it in getUsersToAssign API
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!reduxTasks.length) {
        setIsLoading(true);
        const { 0: fetchedTasks, 1: assignUsers } = await Promise.all([
          getTasks(),
          getUsersToAssign(user!.id),
        ]);
        // const fetchedTasks = await getTasks();
        setIsLoading(false);
        if (fetchedTasks) {
          dipatch(fetchTasks(fetchedTasks));
        }
        if (assignUsers) {
          setUsersToAssign(assignUsers);
        }
      }
    }

    tasks();
  }, [dipatch, setIsLoading, reduxTasks.length, setUsersToAssign]);

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
          <NewTaskDialog usersToAssign={usersToAssign} />
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
