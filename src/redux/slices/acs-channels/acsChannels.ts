import { createSlice } from '@reduxjs/toolkit';

interface IPersonalThreads {
  displayNames: string[];
  id: string;
  lastMessageReceivedOn: string;
  topic: string;
}
interface IGroupMessage {
  // displayNames: string[];
  id: string;
  topic: string;
  lastMessageReceivedOn: string;
  image: string;
}

interface IChannels {
  groupThreads: IGroupMessage[];
  personalThreadsArr: IPersonalThreads[];
}

const initialState: IChannels = {
  groupThreads: [],
  personalThreadsArr: []
};

export const acsChannels = createSlice({
  name: 'acsChatActivities',
  initialState,
  reducers: {
    atnSaveChannels: (state, action: { type: string; payload: IChannels }) => {
      return action.payload;
    },
    updateAcsGroupChannesls: (state, action) => {
      return { ...state, groupThreads: action.payload };
    },
    updateAcsDirectChannesls: (state, action) => {
      return { ...state, personalThreadsArr: action.payload };
    },
    updateGroupInfo: (state, action) => {
      return {
        ...state,
        groupThreads: state.groupThreads.map((each) => {
          if (each.id === action.payload.threadId) {
            return { ...each, ...action.payload.info };
          }
          return each;
        })
      };
    },
    createGroupThread: (state, action) => {
      const index = state.groupThreads.find((each) => each.id === action.payload.id);
      if (index) {
        return {
          ...state,
          groupThreads: state.groupThreads.map((each) => {
            if (each.id === action.payload.id) {
              return { ...each, image: action.payload.image };
            }
            return each;
          })
        };
      }
      return { ...state, groupThreads: [...state.groupThreads, action.payload] };
    }
  }
});

export const acsChannelActions = acsChannels.actions;
export default acsChannels.reducer;
