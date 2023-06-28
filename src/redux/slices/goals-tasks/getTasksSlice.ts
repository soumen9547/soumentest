/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";

export interface ITaskInterface {
  taskPosition: number;
  name: string;
}

export interface ILevelInterface {
  level: number;
  tasks: ITaskInterface;
  name: string;
}

export interface IAllTaskInterface {
  levels: ILevelInterface[];
}

interface IInitialState {
  loading: boolean;
  data: IAllTaskInterface[] | undefined;
  error: boolean;
  errorText: string;
}

const initialState: IInitialState = {
  loading: false,
  data: undefined,
  error: false,
  errorText: "",
};

export const fetchAllTasks = createAsyncThunk(
    "goalTasks",
    async ({ grpId, templateId }: { grpId: string; templateId: string }) => {
      const response = await API.getAllTasks({ grpId, templateId });
      return response.data;
    }
  );

const TasksSlice = createSlice({
  name: "goal Tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state, action) => {
      state.loading = true;
      state.data = undefined;
      state.error = false;
      state.errorText = "";
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
      state.errorText = "";
    });
    builder.addCase(fetchAllTasks.rejected, (state, action) => {
      state.loading = false;
      state.data = undefined;
      state.error = true;
      state.errorText = action.error.message || "Something went wrong";
    });
  },
});

export default TasksSlice.reducer;
