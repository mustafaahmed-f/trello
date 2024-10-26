import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import toast from "react-hot-toast";
import { deleteTask } from "../../../_lib/APIs/TaskAPIs";
import { useAppDispatch } from "../../../_lib/Store/Store";
import { deleteTaskSlice } from "../../../_lib/Store/Slices/TasksSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog({ taskId }: { taskId: number }) {
  const [open, setOpen] = React.useState(false);
  const { 0: isLoading, 1: setIsLoading } = React.useState(false);
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTask = async () => {
    setIsLoading(true);
    const loading = toast.loading("Deleting task");
    await deleteTask(taskId);
    dispatch(deleteTaskSlice(taskId));
    toast.dismiss(loading);
    toast.success("Task deleted successfully !");
    setIsLoading(false);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        className="px-3 py-2 w-fit"
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancle
          </Button>
          <Button onClick={handleDeleteTask} disabled={isLoading}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
