import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export interface FilterBtnProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function FilterBtn(props: FilterBtnProps) {
  const { onClose, selectedValue, open } = props;
  const filterArr = ["none", "low", "medium", "high"];
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle color="primary" fontWeight="bold" fontSize={"1.5rem"}>
        Filter tasks
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters className="flex flex-col gap-3">
          {filterArr.map((el, i) => (
            <ListItemButton
              key={i}
              autoFocus
              onClick={() => handleListItemClick(el)}
            >
              <ListItemText
                className="text-center"
                primary={el[0].toUpperCase() + el.slice(1)}
              />
            </ListItemButton>
          ))}
        </ListItem>
      </List>
    </Dialog>
  );
}
