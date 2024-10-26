import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskType } from "../../taskType";
import { tasksStateType } from "./TasksStateType";

const initialState: tasksStateType = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasks: (state, action: PayloadAction<taskType[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<taskType>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<taskType>) => {
      state.tasks = state.tasks.filter(
        (task: taskType) => task.id !== action.payload.id
      );
    },
    updateTask: (state, action: PayloadAction<taskType>) => {
      state.tasks = state.tasks.map((task: taskType) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
    },
  },
});

export default tasksSlice.reducer;
export const { addTask, deleteTask, updateTask, fetchTasks } =
  tasksSlice.actions;
