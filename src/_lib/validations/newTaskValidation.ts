import * as yup from "yup";
import generalValidations from "./generalValidations";

export const newTaskSchema = yup
  .object({
    title: generalValidations.Title.required("Title is required"),
    description: generalValidations.Description.required(
      "Description is required"
    ),
    priority: generalValidations.Priority.required("Priority is required"),
    state: generalValidations.State.required("State is required"),
    image: generalValidations.Image.required("Image is required"),
    assigned_to: generalValidations.assigned_to.required("User is required"),
  })
  .required();
