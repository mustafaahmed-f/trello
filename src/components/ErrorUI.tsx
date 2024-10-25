import React from "react";
import { useNavigate } from "react-router-dom";

interface ErrorUIProps {
  errMsg: string;
}

function ErrorUI({ errMsg }: ErrorUIProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 py-8 md:gap-6">
      <p className="text-center text-red-600 dark:text-red-400">{errMsg}</p>

      <div className="flex justify-center w-full">
        <img
          alt="Error"
          src="public/6029646.jpg"
          className="w-[90%] sm:w-[40%]"
        />
      </div>

      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}

export default ErrorUI;
