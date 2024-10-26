import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersStateType } from "./UsersStateType";

const initialState: usersStateType = {
  token: "",
  userName: "",
  email: "",
  image: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<usersStateType>) => {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.id = action.payload.id;
    },
    logOut: (state) => {
      state.token = "";
      state.userName = "";
      state.email = "";
      state.image = "";
      state.id = "";
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
