/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const initialState: { open: boolean } = {
  open: false,
};

const customProgramSlice = createSlice({
  name: "custom program",
  initialState,
  reducers: {
    updateCustomProgramFlag: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default customProgramSlice.reducer;
export const customProgramActions = customProgramSlice.actions;
