import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getAssignedTasks,
  getTasks,
  getUsersToAssign,
} from "../../_lib/APIs/TaskAPIs";
import { fetchTasks } from "../../_lib/Store/Slices/TasksSlice";
import { useAppDispatch, useAppSelector } from "../../_lib/Store/Store";
import { checkUserSession } from "../../_lib/checkUserSession";
import supabase from "../../_lib/supabase";
import Loader from "../../components/Loader";
import FilterBtn from "./components/FilterBtn";
import NewTaskDialog from "./components/NewTaskDialog";
import TasksTabs from "./components/TasksTabs";
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
  const { tasks: createdTasks, assignedTasks } = useAppSelector(
    (store) => store.tasks
  );

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

      if (!createdTasks.length) {
        setIsLoading(true);
        const {
          0: fetchedTasks,
          1: assignUsers,
          2: assignedTasks,
        } = await Promise.all([
          getTasks(),
          getUsersToAssign(user!.id),
          getAssignedTasks(),
        ]);
        // const fetchedTasks = await getTasks();
        setIsLoading(false);
        if (fetchedTasks) {
          dipatch(fetchTasks({ tasks: fetchedTasks, assignedTasks }));
        }
        if (assignUsers) {
          setUsersToAssign(assignUsers);
        }
      } else {
        setIsLoading(false);
      }
    }

    tasks();
  }, [dipatch, setIsLoading, createdTasks.length, setUsersToAssign]);

  let finalcreatedTasks =
    selectedValue === "" || selectedValue === "none"
      ? createdTasks
      : createdTasks.filter((task) => task.priority === selectedValue);

  let finalAssignedTasks =
    selectedValue === "" || selectedValue === "none"
      ? assignedTasks
      : assignedTasks.filter((task) => task.priority === selectedValue);

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

      <TasksTabs
        createdTasks={finalcreatedTasks}
        assignedTasks={finalAssignedTasks}
      />
    </>
  );
}

export default Tasks;
