import React, { useState } from "react";
import { signUpSchema } from "../../_lib/validations/signUpValidation";
import AuthForm from "../../components/Auth/AuthForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../_lib/APIs/AuthApis";

interface SignUpProps {}

function SignUp({}: SignUpProps) {
  const { 0: isLoading, 1: setIsLoading } = useState(false);
  const schema = signUpSchema;
  const navigate = useNavigate();

  async function signUpFunc(data: any) {
    console.log(data);
    const loading = toast.loading("Creating account...");
    try {
      setIsLoading(true);
      const res = await signUp(data);
      toast.dismiss(loading);
      toast.success("Account has been created successfully !");
      navigate("/login");
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Failed to create account");
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  const fieldsArr = [
    { field: "userName", label: "Username" },
    { field: "email", label: "Email" },
    { field: "password", label: "Password" },
    { field: "rePassword", label: "Re-Password" },
  ];
  return (
    <div className="flex flex-col justify-center w-full px-2 py-5 mx-auto bg-primary-200 md:w-1/2 sm:px-3">
      <div className="my-auto bg-white rounded-md bg-opacity-90 px-9 py-9 opacity-80 backdrop-blur-xl lg:py-10">
        <h2 className="mb-10 text-3xl lg:text-4xl">Sign up</h2>
        <AuthForm
          isLoading={isLoading}
          fields={fieldsArr}
          purpose={"Sign up"}
          mySchema={schema}
          extraField={"Already have acccount ?"}
          extraLink="/login"
          submitFunction={signUpFunc}
        />
      </div>
    </div>
  );
}

export default SignUp;
