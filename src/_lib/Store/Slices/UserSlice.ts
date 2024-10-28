import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersStateType } from "./UsersStateType";

const initialState: usersStateType = {
  isAuth: false,
  userName: "",
  email: "",
  userId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<usersStateType>) => {
      state.isAuth = true;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    logOut: (state) => {
      state.isAuth = false;
      state.userName = "";
      state.email = "";
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
