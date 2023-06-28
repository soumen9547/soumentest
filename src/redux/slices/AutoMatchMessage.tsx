import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  message: string;
}

const initialState: MessageState = {
  message: ''
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessageAuto: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    }
  }
});

export const { setMessageAuto } = messageSlice.actions;
export default messageSlice.reducer;
