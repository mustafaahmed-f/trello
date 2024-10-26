import * as yup from "yup";
import generalValidations from "./generalValidations";

export const logInSchema = yup
  .object({
    email: generalValidations.email.required("Email is required"),
    password: generalValidations.password.required("Password is required"),
  })
  .required();
