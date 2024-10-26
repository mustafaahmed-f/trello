import { TextField } from "@mui/material";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFields } from "./EditTaskDialog";

interface EditTaskTextDialogProps {
  field: keyof FormFields;
  errors: FieldErrors<FormFields>;
  register: UseFormRegister<FormFields>;
  currentTask: any;
}

function EditTaskTextDialog({
  field,
  errors,
  register,
  currentTask,
}: EditTaskTextDialogProps) {
  return (
    <TextField
      required
      defaultValue={currentTask[field]}
      margin="dense"
      label={field[0].toUpperCase() + field.substring(1)}
      type="text"
      fullWidth
      variant="standard"
      {...register(`${field}`)}
      error={!!errors[`${field}`]}
      helperText={errors[`${field}`] ? errors[`${field}`]?.message : ""}
    />
  );
}

export default EditTaskTextDialog;
