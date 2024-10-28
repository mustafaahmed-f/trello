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
import { addTask } from "../../../_lib/APIs/TaskAPIs";
import { addTaskSlice } from "../../../_lib/Store/Slices/TasksSlice";
import { useAppDispatch } from "../../../_lib/Store/Store";
import { newTaskSchema } from "../../../_lib/validations/newTaskValidation";
import DialogTextField from "./DialogTextField";
import ImageUploader from "../../../components/ImageUploader";
import AssignUsersSelector from "./AssignUsersSelector";

interface NewTaskDialogProps {
  usersToAssign: any[];
}

export interface FormFields {
  title: string;
  description: string;
  priority: string;
  state: string;
  image: string;
  assigned_to: string;
}

function NewTaskDialog({ usersToAssign }: NewTaskDialogProps) {
  const { 0: isLoading, 1: setIsLoading } = React.useState(false);
  const { 0: isImageUploaded, 1: setIsImageUploaded } = React.useState(false);
  const schema = newTaskSchema;
  const dipatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    // watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });
  // console.log(watch("assigned_to"));
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
    reset();
    handleClose();
  };

  const fields = Object.keys(newTaskSchema.fields) as (keyof FormFields)[];

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>New Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add you task by filling all the following fields :
            </DialogContentText>
            {fields.slice(0, 4).map((field, i) => (
              <DialogTextField
                key={i}
                field={field}
                errors={errors}
                register={register}
              />
            ))}
            <div className="my-3">
              <AssignUsersSelector
                usersToAssign={usersToAssign}
                errors={errors}
                register={register}
              />
            </div>
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
              disabled={
                isLoading || !isValid || !isImageUploaded ? true : false
              }
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default NewTaskDialog;
