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
import ImageUploader from "../../../components/ImageUploader";

interface EditTaskDialogProps {
  taskId: number;
  setHideDropList: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormFields {
  title: string;
  description: string;
  priority: string;
  state: string;
  image: string;
}

function EditTaskDialog({ taskId, setHideDropList }: EditTaskDialogProps) {
  const { 0: isLoading, 1: setIsLoading } = React.useState(false);
  const { 0: isImageUploaded, 1: setIsImageUploaded } = React.useState(false);
  const { tasks } = useAppSelector((store) => store.tasks);
  const dipatch = useAppDispatch();
  const currentTask = tasks.find((task) => task.id === taskId);
  const schema = editTaskSchema;
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(schema, { stripUnknown: true }),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const handleClickOpen = () => {
    setOpen(true);
    setHideDropList(true);
  };
  const handleClose = () => {
    setOpen(false);
    setHideDropList(false);
  };

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
        variant="outlined"
        className="w-full px-3 py-2"
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
            {fields.slice(0, 4).map((field, i) => (
              <EditTaskTextDialog
                key={i}
                currentTask={currentTask}
                field={field}
                errors={errors}
                register={register}
              />
            ))}
            <div className="my-3">
              <ImageUploader
                onUploadComplete={(uploaded) => setIsImageUploaded(uploaded)}
                register={register}
                setValue={setValue}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} type="button" disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !isValid ? true : false}
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
