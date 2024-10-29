import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import toast from "react-hot-toast";
import { updateTask } from "../../../_lib/APIs/TaskAPIs";
import {
  updateAssignedTasksSlice,
  updateCreatedTasksSlice,
} from "../../../_lib/Store/Slices/TasksSlice";
import { useAppDispatch, useAppSelector } from "../../../_lib/Store/Store";
import { editTaskSchema } from "../../../_lib/validations/editTaskValidation";
import { newTaskSchema } from "../../../_lib/validations/newTaskValidation";
import ImageUploader from "../../../components/ImageUploader";
import EditTaskTextDialog from "./EditTaskTextDialog";

interface EditTaskDialogProps {
  task: any;
  setHideDropList: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormFields {
  title?: string;
  description?: string;
  priority?: string;
  state: string;
  image?: string;
  assigned_to?: string;
}

function EditTaskDialog({ task, setHideDropList }: EditTaskDialogProps) {
  const { 0: isLoading, 1: setIsLoading } = React.useState(false);
  const { 0: isImageUploaded, 1: setIsImageUploaded } = React.useState(false);
  const { userId } = useAppSelector((store) => store.user);

  //// this variable is used to make button enabled by default when we edit assigned tasks:
  const isCreated = task.created_by === userId;

  const dipatch = useAppDispatch();
  const currentTask = task;

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

  // console.log(isImageUploaded);
  const handleClickOpen = () => {
    setOpen(true);
    setHideDropList(true);
  };
  const handleClose = () => {
    setOpen(false);
    setHideDropList(false);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    let finalData = {
      ...data,
      id: currentTask.id,
      title: currentTask.title,
      description: currentTask.description,
      priority: currentTask.priority,
      created_by: currentTask.created_by,
      assigned_to: currentTask.assigned_to,
    };
    setIsLoading(true);
    const loading = toast.loading("Updating task");
    await updateTask(currentTask.id, finalData);
    if (task.created_by !== userId) {
      dipatch(updateAssignedTasksSlice(finalData));
    } else {
      dipatch(updateCreatedTasksSlice(finalData));
    }
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
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            {fields.slice(0, 4).map((field, i) => (
              <EditTaskTextDialog
                key={i}
                currentTask={currentTask}
                field={field}
                errors={errors}
                register={register}
                isCreated={isCreated}
              />
            ))}
            {isCreated && (
              <div className="my-3">
                <ImageUploader
                  onUploadComplete={(uploaded) => setIsImageUploaded(uploaded)}
                  register={register}
                  setValue={setValue as UseFormSetValue<any>}
                />
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} type="button" disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || (isCreated && !isValid)}
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
