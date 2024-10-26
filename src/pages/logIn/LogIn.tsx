import { logInSchema } from "../../_lib/validations/logInValidation";
import AuthForm from "../../components/Auth/AuthForm";
import SettingsIcon from "@mui/icons-material/Settings";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../_lib/APIs/AuthApis";
interface LogInProps {}

function LogIn({}: LogInProps) {
  const { 0: isLoading, 1: setIsLoading } = useState(false);
  const schema = logInSchema;
  const navigate = useNavigate();
  async function logInFunc(data: any) {
    const loading = toast.loading("Logging ..");
    try {
      setIsLoading(true);
      await logIn(data);
      toast.dismiss(loading);
      toast.success("logged in successfully !");
      navigate("/tasks");
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Failed to login");
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }
  const fieldsArr = [
    { field: "email", label: "Email" },
    { field: "password", label: "Password" },
  ];

  const mainPragraphs = [
    "Organize your projects effortlessly with boards, lists, and cards for a clear view of your tasks.",
    "Collaborate seamlessly with your team by assigning tasks, setting deadlines, and tracking progress in real time.",
    "Stay on top of every project with customizable workflows, notifications, and calendar integrations.",
    "Sign in to streamline your tasks, prioritize work, and achieve your goals faster in one unified platform.",
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="hidden w-1/2 p-4 md:flex sm:flex-col sm:items-center">
        <h2 className="mb-3 text-3xl font-bold text-center">
          Log in and get started with the best UI experience
        </h2>
        {mainPragraphs.map((el, i) => (
          <div
            key={i}
            className="flex items-center gap-3 my-4 text-lg font-semibold"
          >
            {i === 0 && <SettingsIcon />}
            {i === 1 && <ThumbUpIcon />}
            {i === 2 && <FavoriteIcon />}
            {i === 3 && <AutoFixHighIcon />}
            <p>{el}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center w-full px-2 py-5 bg-primary-200 md:w-1/2 sm:px-3">
        <div className="my-auto bg-white rounded-md bg-opacity-90 px-9 py-9 opacity-80 backdrop-blur-xl lg:py-10">
          <h2 className="mb-10 text-3xl font-semibold lg:text-4xl">Sign in</h2>
          <AuthForm
            isLoading={isLoading}
            fields={fieldsArr}
            purpose={"Sign in"}
            mySchema={schema}
            extraField={"Dont' have acccount ?"}
            extraLink="/signup"
            submitFunction={logInFunc}
          />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
