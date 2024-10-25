import { combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./Slices/TasksSlice";
import userReducer from "./Slices/UserSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
});
