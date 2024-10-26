import React from "react";
import { newTaskSchema } from "../../_lib/validations/newTaskValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import DialogTextField from "./DialogTextField";

interface NewTaskDialogProps {}

export interface FormFields {
  title: string;
  description: string;
  priority: string;
  state: string;
  image: string;
}

function NewTaskDialog({}: NewTaskDialogProps) {
  const schema = newTaskSchema;
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data: any) => {
    console.log(data);
    handleClose();
  };

  const fields = Object.keys(newTaskSchema.fields) as (keyof FormFields)[];

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>New Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add you task by filling all the following fields :
            </DialogContentText>
            {fields.map((field) => (
              <DialogTextField
                field={field}
                errors={errors}
                register={register}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} type="button">
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default NewTaskDialog;
