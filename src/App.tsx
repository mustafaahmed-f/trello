import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Main from "./pages/main/Main";
import UnAuthProtected from "./components/UnAuthProtected";
import LogIn from "./pages/logIn/LogIn";
import AuthProtected from "./components/AuthProtected";
import Tasks from "./pages/tasks/Tasks";
import SignUp from "./pages/signUp/SignUp";
import { loader as layoutLoader } from "./components/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    loader: layoutLoader,
    children: [
      {
        element: (
          <UnAuthProtected>
            <Main />
          </UnAuthProtected>
        ),
        path: "/",
      },
      {
        element: (
          <UnAuthProtected>
            <LogIn />
          </UnAuthProtected>
        ),
        path: "/login",
      },
      {
        element: (
          <UnAuthProtected>
            <SignUp />
          </UnAuthProtected>
        ),
        path: "/signup",
      },
      {
        element: (
          <AuthProtected>
            <Tasks />
          </AuthProtected>
        ),
        path: "/tasks",
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
