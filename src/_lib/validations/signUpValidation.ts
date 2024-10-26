import * as yup from "yup";
import generalValidations from "./generalValidations";

export const signUpSchema = yup
  .object({
    userName: generalValidations.userName.required("userName is required"),
    email: generalValidations.email.required("Email is required"),
    password: generalValidations.password.required("Password is required"),
    rePassword: generalValidations.rePassword.required(
      "Re-Password is required"
    ),
  })
  .required();
