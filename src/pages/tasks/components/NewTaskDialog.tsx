import React from "react";
import { newTaskSchema } from "../../../_lib/validations/newTaskValidation";
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
import toast from "react-hot-toast";
import { addTaskSlice } from "../../../_lib/Store/Slices/TasksSlice";
import { addTask } from "../../../_lib/APIs/TaskAPIs";
import { useAppDispatch } from "../../../_lib/Store/Store";

interface NewTaskDialogProps {}

export interface FormFields {
  title: string;
  description: string;
  priority: string;
  state: string;
  image: string;
}

function NewTaskDialog({}: NewTaskDialogProps) {
  const { 0: isLoading, 1: setIsLoading } = React.useState(false);
  const schema = newTaskSchema;
  const dipatch = useAppDispatch();
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

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const loading = toast.loading("Creating task");
    await addTask(data);
    dipatch(addTaskSlice(data));
    toast.dismiss(loading);
    toast.success("Task added successfully !");
    setIsLoading(false);
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
            <Button onClick={handleClose} type="button" disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default NewTaskDialog;
