import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../_lib/Store/Store";
import { setUser } from "../../_lib/Store/Slices/UserSlice";
import { checkUserSession } from "../../_lib/checkUserSession";
import Loader from "../../components/Loader";
import { getTasks } from "../../_lib/APIs/TaskAPIs";
import { fetchTasks } from "../../_lib/Store/Slices/TasksSlice";
interface TasksProps {}

function Tasks({}: TasksProps) {
  const { 0: isLoading, 1: setIsLoading } = useState(false);
  const user = useAppSelector((store) => store.user);
  const dipatch = useAppDispatch();
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

  return isLoading ? <Loader /> : <div></div>;
}

export default Tasks;
