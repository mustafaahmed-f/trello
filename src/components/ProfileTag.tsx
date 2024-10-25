import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useCallback, useEffect } from "react";
import { useAppSelector } from "../_lib/Store/Store";
import ProfileSection from "./ProfileSection";

interface ProfileTagProps {}

function ProfileTag({}: ProfileTagProps) {
  const { image } = useAppSelector((store) => store.user);
  const { 0: showProfileSecion, 1: setShowProfileSecion } =
    React.useState(false);
  const { 0: isReverse, 1: setIsReverse } = React.useState(false);

  useEffect(() => {
    let timeOut: any = null;
    function toggle() {
      if (showProfileSecion) {
        setIsReverse(true);
        timeOut = setTimeout(() => {
          setShowProfileSecion(false);
          setIsReverse(false);
        }, 1200);
      } else {
        setShowProfileSecion(true);
      }
    }

    function handleClick(e: any) {
      const profileSection = document.querySelector(".profileSection");
      if (e.target.closest(".profileBtn")) {
        toggle();
      } else if (profileSection && profileSection.contains(e.target)) {
        return;
      } else if (showProfileSecion && !profileSection?.contains(e.target)) {
        toggle();
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);

      if (timeOut) clearTimeout(timeOut);
    };
  }, [showProfileSecion, setShowProfileSecion, setIsReverse]);

  return (
    <button className="relative flex gap-2 rounded-full cursor-pointer profileBtn">
      <div className="overflow-hidden rounded-full">
        <img
          src={image}
          alt="profile image "
          className="w-5 h-5 rounded-full"
        />
      </div>
      <KeyboardArrowDownIcon fontSize="small" />
      {showProfileSecion && <ProfileSection isReverse={isReverse} />}
    </button>
  );
}

export default ProfileTag;
