import React from "react";
import { useAppDispatch, useAppSelector } from "../_lib/Store/Store";
import { logOut } from "../_lib/Store/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
let localStorageKey = import.meta.env.VITE_LOCALSTORAGE_KEY;
interface ProfileSectionProps {
  isReverse: boolean;
}

function ProfileSection({ isReverse }: ProfileSectionProps) {
  const { userName } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  async function handleLogOut() {
    dispatch(logOut());
    localStorage.removeItem(localStorageKey);
    await logOut()
    navigate("/")
  }
  return (
    <div
      className={`profileSection absolute ${
        isReverse ? "animate-profileTagReverse" : "animate-profileTag"
      } bottom-0 translate-y-[104%] cursor-default z-[999999px] flex flex-col rounded-md bg-primary-100`}
    >
      <p className="px-3 py-2 border-b-2 border-neutral-600">
        Welcome , {userName}
      </p>
      <button
        className="px-3 py-3 cursor-pointer hover:bg-primary-200"
        onClick={handleLogOut}
      >
        Log out
      </button>
    </div>
  );
}

export default ProfileSection;
