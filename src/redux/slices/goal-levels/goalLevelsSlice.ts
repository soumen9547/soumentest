/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";

export interface ITask {
  taskName: string;
}

export interface ILevel {
  level: number;
  levelName: string;
  checkWithMentor: boolean;
  _id: string;
  tasks: ITask[];
}

export interface ILevelData {
  levels: ILevelData;
  templateId: string;
}

interface IInitialState {
  loading: boolean;
  data: ILevelData | undefined;
  error: boolean;
  errorText: string;
}

const initialState: IInitialState = {
  loading: false,
  data: undefined,
  error: false,
  errorText: "",
};

export const fetchGoalLevels = createAsyncThunk(
  "goals/levels",
  ({ grpId, goalId }: { grpId: string; goalId: string }) => {
    return API.getAllLevels({ grpId, goalId }).then(
      (response) => response.data
    );
  }
);

const goalLevelsSlice = createSlice({
  name: "goal levels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoalLevels.pending, (state, action) => {
      state.loading = true;
      state.data = undefined;
      state.error = false;
      state.errorText = "";
    });
    builder.addCase(fetchGoalLevels.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
      state.errorText = "";
    });
    builder.addCase(fetchGoalLevels.rejected, (state, action) => {
      state.loading = false;
      state.data = undefined;
      state.error = true;
      state.errorText = action.error.message || "Something went wrong";
    });
  },
});

export default goalLevelsSlice.reducer;
