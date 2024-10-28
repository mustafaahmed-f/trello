import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFields } from "./NewTaskDialog";

export default function AssignUsersSelector({
  usersToAssign,
  errors,
  register,
}: {
  usersToAssign: any[];
  errors: FieldErrors<FormFields>;
  register: UseFormRegister<FormFields>;
}) {
  const [user, setUser] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Assign to</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
          label="Age"
          {...register("assigned_to", {
            required: true,
            onChange: handleChange,
          })}
        >
          {usersToAssign.map((user, i) => (
            <MenuItem key={i} value={user.user_id}>
              {user.userName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p className="my-1 text-red-500">{errors.assigned_to?.message}</p>
    </Box>
  );
}
