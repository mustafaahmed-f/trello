import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFields } from "./EditTaskDialog";

interface EditTaskTextDialogProps {
  field: keyof FormFields;
  errors: FieldErrors<FormFields>;
  register: UseFormRegister<any>;
  currentTask: any;
  isCreated: boolean;
}

function EditTaskTextDialog({
  field,
  errors,
  register,
  currentTask,
  isCreated,
}: EditTaskTextDialogProps) {
  return (
    <TextField
      defaultValue={currentTask[field]}
      disabled={!isCreated && field !== "state"}
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
