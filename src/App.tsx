import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Main from "./pages/main/main";
import UnAuthProtected from "./components/UnAuthProtected";
import LogIn from "./pages/logIn/logIn";
import AuthProtected from "./components/AuthProtected";
import Tasks from "./pages/tasks/tasks";
import SignUp from "./pages/signUp/signUp";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
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
