import { TextField } from "@mui/material";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFields } from "./NewTaskDialog";

interface DialogTextFieldProps {
  field: keyof FormFields;
  errors: FieldErrors<FormFields>;
  register: UseFormRegister<FormFields>;
}

function DialogTextField({ field, errors, register }: DialogTextFieldProps) {
  return (
    <TextField
      required
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

export default DialogTextField;
