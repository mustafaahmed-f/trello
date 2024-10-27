import * as yup from "yup";

const generalValidations = {
  userName: yup
    .string()
    .min(3, "Min. length 3")
    .max(20, "Max. length 20")
    .matches(
      /^[a-zA-Z0-9]{3,20}$/,
      "userName should consist of letters and numbers only"
    ),
  email: yup.string().email(),
  password: yup
    .string()
    .min(8, "Min. length of password is 8")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password should contain at least number and capital letter with min. length 8"
    ),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password should match"),

  Image: yup.string(),
  Title: yup.string().min(3, "Min. length 3").max(20, "Max. length 20"),
  Description: yup.string().min(3, "Min. length 3").max(100, "Max. length 100"),
  Priority: yup
    .string()
    .matches(/^(high|medium|low)$/, "Priority should be high, medium or low"),
  State: yup
    .string()
    .matches(/^(todo|doing|done)$/, "State should be todo, doing or done")
    .default("todo"),
};

export default generalValidations;
