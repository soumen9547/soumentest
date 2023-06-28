import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';

interface IDialogState {
  threadId: string;
  status: 'edit' | 'new';
  value: any;
}

const initialState: IDialogState[] = [];

const chatEditorSlice = createSlice({
  name: 'chatEditorState',
  initialState,
  reducers: {
    atnSetEditorState: (state, action: { type: string; payload: IDialogState }) => {
      const findByThreadId = current(state).find((each) => _.get(each, 'threadId') === action.payload.threadId);
      const findIndexByThreadId = current(state).findIndex(
        (each) => _.get(each, 'threadId') === action.payload.threadId
      );
      if (findByThreadId) {
        state.splice(findIndexByThreadId, 1, action.payload);
      } else {
        state.push(action.payload);
      }
    }
  }
});

export const chatEditorActions = chatEditorSlice.actions;
export default chatEditorSlice.reducer;
