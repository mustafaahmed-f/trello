import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../_lib/Store/Store";
import { useNavigate } from "react-router-dom";

interface UnAuthProtectedProps {
  children: ReactNode;
}

function UnAuthProtected({ children }: UnAuthProtectedProps) {
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (token) navigate("/tasks");
    },
    [token, navigate]
  );

  return !token ? children : null;
}

export default UnAuthProtected;
