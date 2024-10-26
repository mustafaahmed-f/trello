import React from "react";
import { useAppSelector } from "../../_lib/Store/Store";
import SearchDiv from "../SearchDiv";
import { Link } from "react-router-dom";
import ProfileTag from "../ProfileTag";

interface HeaderProps {}

function Header({}: HeaderProps) {
  const { token } = useAppSelector((store) => store.user);
  return (
    <div className="flex items-center justify-between px-5 py-3 flex-nowrap bg-primary-200">
      <Link
        to={token ? "/tasks" : "/"}
        className="flex items-center gap-2 text-3xl font-bold sm:text-4xl logo text-start"
      >
        <img src="public/icons8-task-64.png" />
        <p>Trello</p>
      </Link>
      <div className="flex items-center gap-2">
        {token && <SearchDiv />}
        {token ? (
          <ProfileTag />
        ) : (
          <Link to="/login" className="text-lg font-semibold">
            Log in
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
