import * as yup from "yup";
import generalValidations from "./generalValidations";

export const editTaskSchema = yup
  .object({
    title: generalValidations.Title,
    description: generalValidations.Description,
    priority: generalValidations.Priority,
    state: generalValidations.State.required("State is required"),
    image: generalValidations.Image,
  })
  .required();
