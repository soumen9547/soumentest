/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";

export interface IAllTemplatesInterface {
  id: string;
  name: string;
}

interface IInitialState {
  loading: boolean;
  data: IAllTemplatesInterface[] | undefined;
  error: boolean;
  errorText: string;
}

const initialState: IInitialState = {
  loading: false,
  data: undefined,
  error: false,
  errorText: "",
};

export const fetchAllTemplates = createAsyncThunk(
  "goalTemplates",
  (grpId: string) => {
    return API.getAllTemplates({ grpId }).then((resposne) => resposne.data);
  }
);

const goalsTemplatesSlice = createSlice({
  name: "goals templates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTemplates.pending, (state, action) => {
      state.loading = true;
      state.data = undefined;
      state.error = false;
      state.errorText = "";
    });
    builder.addCase(fetchAllTemplates.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
      state.errorText = "";
    });
    builder.addCase(fetchAllTemplates.rejected, (state, action) => {
      state.loading = false;
      state.data = undefined;
      state.error = true;
      state.errorText = action.error.message || "Something went wrong";
    });
  },
});

export default goalsTemplatesSlice.reducer;
