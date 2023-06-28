import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';
const initialState: any = [];

export const acsHoldMessages = createSlice({
  name: 'holdMessages',
  initialState,
  reducers: {
    holdMessage: (state: any, action: { type: string; payload: any }) => {
      const findMessage = _.find(
        current(state),
        (each) => _.get(each, 'sentId') === _.get(action, 'payload.contentId')
      );
      const findIndexOfMessage = _.findIndex(
        current(state),
        (each) => _.get(each, 'sentId') === _.get(action, 'payload.contentId')
      );
      if (findMessage) {
        state.splice(findIndexOfMessage, 1, action.payload);
      } else {
        state.push(action.payload);
      }
    },
    // here changing status of message (loading => success, loading => Failed)
    removeMessages: (
      state: any,
      action: {
        type: string;
        payload: { data: any; threadId: string; status: string; sentId: string; sentDate: string };
      }
    ) => {
      const changeStatus = state.map((each: any) => {
        if (
          action.payload.status === 'success' &&
          _.get(each, 'contentId') === _.get(action, 'payload.data.contentId')
        ) {
          return {
            ...each,
            status: 'success',
            sentId: _.get(action, 'payload.sentId', ''),
            sentDate: _.get(action, 'payload.sentDate')
          };
        } else if (
          action.payload.status === 'failed' &&
          _.get(each, 'contentId') === _.get(action, 'payload.data.contentId')
        ) {
          return { ...each, status: 'failed' };
        } else {
          return each;
        }
      });
      return changeStatus;
    },
    // Here removing the cached success messages
    removeMessagesWithThreadId: (state: any, action: { type: string; payload: { threadId: string } }) => {
      return state.filter((each: any) => {
        if (
          _.get(each, 'threadId') === action.payload.threadId &&
          (_.get(each, 'status') === 'success' || _.get(each, 'status') === 'loading')
        ) {
          return false;
        } else {
          return true;
        }
      });
    }
  }
});
export const acsHoldMessagesActions = acsHoldMessages.actions;
export default acsHoldMessages.reducer;
