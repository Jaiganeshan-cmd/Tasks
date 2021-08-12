import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTask: (state, action) => {
      const index = state.tasks.findIndex(
        (item) => item.user === action.payload.user
      );
      let newTasks = [...state.tasks];
      if (index >= 0) {
        newTasks.splice(index, 1);
      } else {
        alert("no such items");
      }
      state.tasks = newTasks;
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (item) => item.id === action.payload.id
      );
      let newTasks = [...state.tasks];
      if (index >= 0) {
        newTasks.splice(index, 1);
      } else {
        alert("no such items");
      }
      newTasks.push(action.payload);
      state.tasks = newTasks;
    },
  },
});
export const allTasks = (state) => state.tasks.tasks;
export const { addTask, removeTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
