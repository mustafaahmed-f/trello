import React, { useEffect } from "react";
import { useAppSelector } from "../../_lib/Store/Store";
import SearchDiv from "../SearchDiv";
import { Link } from "react-router-dom";
import ProfileTag from "../ProfileTag";
import { Trie } from "../../_lib/Trie";
import { useSearchContext } from "../../context/SearchProvider";

interface HeaderProps {}

function Header({}: HeaderProps) {
  const { isAuth } = useAppSelector((store) => store.user);
  const { tasks } = useAppSelector((store) => store.tasks);
  const { searchVal } = useSearchContext();
  let tasksArr: any[] = [];
  let trie = new Trie();
  tasks.forEach((task) => {
    trie.addTask(task.title, task.id);
  });

  tasksArr = trie.search(searchVal);

  return (
    <div className="flex flex-col items-center justify-between px-5 py-3 max-sm:gap-4 sm:flex-row flex-nowrap bg-primary-200">
      <div className="flex items-center justify-between w-full">
        <Link
          to={isAuth ? "/tasks" : "/"}
          className="flex items-center gap-2 text-3xl font-bold sm:text-4xl logo text-start"
        >
          <img src="public/icons8-task-64.png" />
          <p>Trello</p>
        </Link>
        <div className="block sm:hidden">
          {isAuth ? (
            <ProfileTag />
          ) : (
            <Link to="/login" className="text-lg font-semibold">
              Log in
            </Link>
          )}
        </div>
      </div>
      {isAuth && (
        <div className="block w-full sm:hidden">
          <SearchDiv tasksArr={tasksArr} />
        </div>
      )}
      <div className="items-center hidden gap-2 sm:flex">
        {isAuth && <SearchDiv tasksArr={tasksArr} />}
        {isAuth ? (
          <ProfileTag />
        ) : (
          <Link to="/login" className="text-lg font-semibold text-nowrap">
            Log in
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
