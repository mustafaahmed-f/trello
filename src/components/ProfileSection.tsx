import React from "react";
import { useAppDispatch, useAppSelector } from "../_lib/Store/Store";
import { logOut } from "../_lib/Store/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../_lib/APIs/AuthApis";

let localStorageKey = import.meta.env.VITE_LOCALSTORAGE_KEY;
interface ProfileSectionProps {
  isReverse: boolean;
}

function ProfileSection({ isReverse }: ProfileSectionProps) {
  const { userName } = useAppSelector((store) => store.user);
  console.log(userName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  async function handleLogOut() {
    try {
      await logout();
      dispatch(logOut());
      localStorage.removeItem(localStorageKey);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className={`profileSection absolute ${
        isReverse ? "animate-profileTagReverse" : "animate-profileTag"
      } bottom-0 right-0 translate-y-[104%] cursor-default z-50 flex flex-col rounded-md bg-gray-400 overflow-hidden`}
    >
      <p className="px-3 py-2 border-b-2 border-neutral-600">
        Welcome , {userName}
      </p>
      <button
        className="px-3 py-3 cursor-pointer hover:bg-gray-300"
        onClick={handleLogOut}
      >
        Log out
      </button>
    </div>
  );
}

export default ProfileSection;
