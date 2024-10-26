import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../_lib/Store/Store";
import { useNavigate } from "react-router-dom";

interface UnAuthProtectedProps {
  children: ReactNode;
}

function UnAuthProtected({ children }: UnAuthProtectedProps) {
  const { isAuth } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuth) navigate("/tasks");
    },
    [isAuth, navigate]
  );

  return !isAuth ? children : null;
}

export default UnAuthProtected;
