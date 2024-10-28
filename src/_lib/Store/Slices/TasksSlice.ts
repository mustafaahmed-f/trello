import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskType } from "../../taskType";
import { tasksStateType } from "./TasksStateType";

const initialState: tasksStateType = {
  tasks: [],
  assignedTasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasks: (state, action: PayloadAction<tasksStateType>) => {
      state.tasks = action.payload.tasks;
      state.assignedTasks = action.payload.assignedTasks;
    },
    addTaskSlice: (state, action: PayloadAction<taskType>) => {
      state.tasks.push(action.payload);
    },
    deleteTaskSlice: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(
        (task: taskType) => task.id !== action.payload
      );
    },
    updateTaskSlice: (state, action: PayloadAction<taskType>) => {
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
export const { addTaskSlice, deleteTaskSlice, updateTaskSlice, fetchTasks } =
  tasksSlice.actions;
