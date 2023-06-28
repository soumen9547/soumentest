/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

interface IInitialData {
  dialogName: string;
  dialogDetails?: any;
  title?: string;
}

interface IOpenDialogPayload {
  type: string;
  payload: IInitialData;
}

const initialState: IInitialData = {
  dialogName: "",
  dialogDetails: null,
};

const dialogSlice = createSlice({
  name: "dialogSlice",
  initialState,
  reducers: {
    atnOpenDialog: (state, action: IOpenDialogPayload) => {
      state.dialogName = action.payload.dialogName;
      state.dialogDetails = action.payload.dialogDetails;
      state.title = action.payload.title;
    },
    atnCloseDialog: (state) => {
      state.dialogName = "";
      state.dialogDetails = null;
      state.title = "";
    },
  },
});

export const dialogActions = dialogSlice.actions;
export default dialogSlice.reducer;
