import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { getUserById } from "../../../_lib/APIs/AuthApis";
import Loader from "../../../components/Loader";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ViewTask({
  task,
  setHideDropList,
  children,
}: {
  task: any;
  setHideDropList: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const { 0: isLoading, 1: setIsLoading } = React.useState(true);
  const { 0: assignedUserName, 1: setAssignedUserName } = React.useState("");
  const { 0: creatorUserName, 1: setCreatorUserName } = React.useState("");
  console.log(task?.created_by);
  const handleClickOpen = () => {
    setOpen(true);
    setHideDropList(true);
  };
  const handleClose = () => {
    setOpen(false);
    setHideDropList(false);
  };

  React.useEffect(() => {
    async function getAssined() {
      try {
        let assignedUser = task?.assigned_to;
        let creator = task?.created_by;
        let results = await Promise.allSettled([
          getUserById(creator),
          getUserById(assignedUser),
        ]);

        const createdByUser =
          results[0].status === "fulfilled" ? results[0].value : null;
        const assignedToUser =
          results[1].status === "fulfilled" ? results[1].value : null;
        setAssignedUserName(assignedToUser?.userName);
        setCreatorUserName(createdByUser?.userName);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    getAssined();
  }, [
    setIsLoading,
    setAssignedUserName,
    task?.assigned_to,
    task?.created_by,
    setCreatorUserName,
  ]);

  return (
    <React.Fragment>
      <Button
        variant={children ? "text" : "outlined"}
        onClick={handleClickOpen}
        className="w-full text-black"
        color="primary"
      >
        {children ?? "View"}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          fontWeight={"bold"}
        >
          {task?.title} ({task?.state})
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        {isLoading ? (
          <Loader />
        ) : (
          <DialogContent dividers className="flex flex-col gap-6">
            <Typography gutterBottom>
              <span className="font-semibold underline me-2 underline-offset-1">
                Created by :
              </span>
              {creatorUserName}
            </Typography>
            <Typography gutterBottom>
              <span className="font-semibold underline me-2 underline-offset-1">
                Assigned to :
              </span>
              {assignedUserName ?? "Not assigned"}
            </Typography>
            <Typography gutterBottom>
              <span className="font-semibold underline me-2 underline-offset-1">
                Description :
              </span>
              {task?.description}
            </Typography>

            <Typography gutterBottom>
              <img src={task?.image} />
            </Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
