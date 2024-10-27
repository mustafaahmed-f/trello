import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateTask } from "../../../_lib/APIs/TaskAPIs";
import { updateTaskSlice } from "../../../_lib/Store/Slices/TasksSlice";
import { useAppDispatch, useAppSelector } from "../../../_lib/Store/Store";
import { editTaskSchema } from "../../../_lib/validations/editTaskValidation";
import { newTaskSchema } from "../../../_lib/validations/newTaskValidation";
import EditTaskTextDialog from "./EditTaskTextDialog";

interface EditTaskDialogProps {
  taskId: number;
}

export interface FormFields {
  title: string;
  description: string;
  priority: string;
  state: string;
  image: string;
}

function EditTaskDialog({ taskId }: EditTaskDialogProps) {
  const { 0: isLoading, 1: setIsLoading } = React.useState(false);
  const { tasks } = useAppSelector((store) => store.tasks);
  const dipatch = useAppDispatch();
  const currentTask = tasks.find((task) => task.id === taskId);
  const schema = editTaskSchema;
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema, { stripUnknown: true }),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const loading = toast.loading("Updating task");
    await updateTask(taskId, data);
    dipatch(updateTaskSlice({ ...data, id: taskId }));
    toast.dismiss(loading);
    toast.success("Task updated successfully !");
    setIsLoading(false);
    handleClose();
  };

  const fields = Object.keys(newTaskSchema.fields) as (keyof FormFields)[];

  return (
    <React.Fragment>
      <Button
        variant="contained"
        className="px-3 py-2 w-fit"
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>New Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add you task by filling all the following fields :
            </DialogContentText>
            {fields.map((field, i) => (
              <EditTaskTextDialog
                key={i}
                currentTask={currentTask}
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
            <Button
              type="submit"
              disabled={isLoading || Object.keys(errors).length ? true : false}
            >
              Edit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default EditTaskDialog;
