import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trie } from "../../Trie";
import { tasksStateType } from "./TasksStateType";
import { taskType } from "../../taskType";

const initialState: tasksStateType = {
  tasks: [],
  trie: new Trie(),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasks: (state, action: PayloadAction<taskType[]>) => {
      state.tasks = action.payload;
      state.trie = new Trie();
      state.tasks.forEach((task: taskType) =>
        state.trie.addTask(task.Title, task.id)
      );
    },
    addTask: (state, action: PayloadAction<taskType>) => {
      state.tasks.push(action.payload);
      state.trie.addTask(action.payload.Title, action.payload.id);
    },
    deleteTask: (state, action: PayloadAction<taskType>) => {
      state.tasks = state.tasks.filter(
        (task: taskType) => task.id !== action.payload.id
      );
      state.trie.deleteTask(action.payload.Title);
    },
    updateTask: (state, action: PayloadAction<taskType>) => {
      state.tasks = state.tasks.map((task: taskType) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
      state.trie = new Trie();
      state.tasks.forEach((task: taskType) =>
        state.trie.addTask(task.Title, task.id)
      );
    },
  },
});

export default tasksSlice.reducer;
export const { addTask, deleteTask, updateTask, fetchTasks } =
  tasksSlice.actions;
