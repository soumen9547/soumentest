/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  disable: false,
};

const disabilityPopupSlice = createSlice({
  name: "disability popup",
  initialState,
  reducers: {
    handleDisabilityPopup: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export default disabilityPopupSlice.reducer;
export const disabilityPopupActions = disabilityPopupSlice.actions;
