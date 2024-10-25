import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../_lib/Store/Store";
import { useNavigate } from "react-router-dom";

interface AuthProtectedProps {
  children: ReactNode;
}

function AuthProtected({ children }: AuthProtectedProps) {
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!token) navigate("/login");
    },
    [token, navigate]
  );

  return token ? children : null;
}

export default AuthProtected;
