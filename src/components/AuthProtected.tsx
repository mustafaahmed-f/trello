import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../_lib/Store/Store";
import { useNavigate } from "react-router-dom";

interface AuthProtectedProps {
  children: ReactNode;
}

function AuthProtected({ children }: AuthProtectedProps) {
  const { isAuth } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuth) navigate("/login");
    },
    [isAuth, navigate]
  );

  return isAuth ? children : null;
}

export default AuthProtected;
