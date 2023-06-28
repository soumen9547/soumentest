import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState: { notifications: any[] } = {
  notifications: []
};

const acsMessageNotificationsSlice = createSlice({
  name: 'notification-messages',
  initialState,
  reducers: {
    atnSaveNotification: (state, action) => {
      const isMessageExists = _.find(
        current(state.notifications),
        (each) => _.get(each, 'id') === _.get(action.payload, 'id')
      );
      if (_.size(isMessageExists)) {
        state.notifications = _.map(current(state.notifications), (each) =>
          _.get(each, 'id') === _.get(action.payload, 'id') ? action.payload : each
        );
      } else {
        state.notifications.push(action.payload);
      }
    },
    atnRemoveNotifications: (state, action) => {
      // console.log(current(state.notifications), action.payload);
      const filterNotificationsUsingThreadId = _.filter(
        current(state.notifications),
        (each) => _.get(each, 'threadId') !== action.payload
      );
      state.notifications = filterNotificationsUsingThreadId;
    }
  }
});
export const acsMessageNotificationActions = acsMessageNotificationsSlice.actions;
export default acsMessageNotificationsSlice.reducer;
