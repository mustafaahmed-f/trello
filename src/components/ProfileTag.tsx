import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
import React, { useEffect } from "react";
import { useAppSelector } from "../_lib/Store/Store";
import ProfileSection from "./ProfileSection";
interface ProfileTagProps {}

function ProfileTag({}: ProfileTagProps) {
  const { 0: showProfileSecion, 1: setShowProfileSecion } =
    React.useState(false);
  const { 0: isReverse, 1: setIsReverse } = React.useState(false);
  const { userName } = useAppSelector((store) => store.user);

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

    const showProfileBtn = document.querySelector(".profileBtn");
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
    showProfileBtn?.addEventListener("click", handleClick);
    return () => {
      showProfileBtn?.removeEventListener("click", handleClick);

      if (timeOut) clearTimeout(timeOut);
    };
  }, [showProfileSecion, setShowProfileSecion, setIsReverse]);

  return (
    <div className="relative flex items-center gap-1 p-1 bg-white rounded-full cursor-pointer profileBtn">
      <div className="overflow-hidden rounded-full">
        <Avatar>{userName[0]}</Avatar>
      </div>
      <KeyboardArrowDownIcon fontSize="small" />
      {showProfileSecion && <ProfileSection isReverse={isReverse} />}
    </div>
  );
}

export default ProfileTag;
