/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit';

const initialState: IChatProfileState = {
  chatProfileDetails: null
};

const chatProfileSlice = createSlice({
  name: 'chatProfileState',
  initialState,
  reducers: {
    atnSetChatProfileState: (state, action: { type: string; payload: IChatProfileState | null }) => {
      state.chatProfileDetails = action.payload;
    }
  }
});

export const chatProfileActions = chatProfileSlice.actions;
export default chatProfileSlice.reducer;
