/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  activeChatEntities: chatKindEnum[];
}

interface IAtnExpandChatPayload {
  keepPrevious: boolean;
  chatKind: chatKindEnum;
}

const initialState: IInitialState = {
  activeChatEntities: ['Channels', 'Direct_Messages']
};

export const acsChatActivities = createSlice({
  name: 'acsChatActivities',
  initialState,
  reducers: {
    atnExpandChat: (state, action: { type: string; payload: IAtnExpandChatPayload }) => {
      if (state.activeChatEntities.includes(action.payload.chatKind)) {
        if (!action.payload.keepPrevious) {
          state.activeChatEntities = state.activeChatEntities.filter((each) => each !== action.payload.chatKind);
        }
      } else {
        state.activeChatEntities.push(action.payload.chatKind);
      }
    }
  }
});

export const acsChatActivitiesActions = acsChatActivities.actions;
export default acsChatActivities.reducer;
