import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../_lib/Store/Store";

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
