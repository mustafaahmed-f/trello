import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../_lib/Store/Store";
import ProfileSection from "./ProfileSection";
interface ProfileTagProps {}

function ProfileTag({}: ProfileTagProps) {
  const { 0: showProfileSecion, 1: setShowProfileSecion } =
    React.useState(false);
  const { 0: isReverse, 1: setIsReverse } = React.useState(false);
  const { userName } = useAppSelector((store) => store.user);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeOut: NodeJS.Timeout | null = null;

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

    function handleClick(e: MouseEvent) {
      if (buttonRef.current && buttonRef.current.contains(e.target as Node)) {
        toggle(); // Toggle dropdown
      } else if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowProfileSecion(false); // Close dropdown if clicking outside
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      if (timeOut) clearTimeout(timeOut);
    };
  }, [showProfileSecion, setIsReverse, setShowProfileSecion]);

  return (
    <div
      ref={buttonRef}
      className="relative flex items-center gap-1 p-1 bg-white rounded-full cursor-pointer profileBtn"
    >
      <div className="overflow-hidden rounded-full">
        <Avatar>{userName[0]}</Avatar>
      </div>
      <KeyboardArrowDownIcon fontSize="small" />
      {showProfileSecion && (
        <div ref={dropdownRef}>
          <ProfileSection isReverse={isReverse} />
        </div>
      )}
    </div>
  );
}

export default ProfileTag;
