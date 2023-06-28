import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';
import moment from 'moment';
const initialState: any = [];

const acsMessages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    atnSaveMessage: (state, action) => {
      return action.payload;
    },

    atnSendMessage: (
      state,
      action: {
        type: string;
        payload: {
          status: string;
          message: string;
          communicationUserId: string;
          contentId: number;
          id: string;
          sequenceId?: number | null;
        };
      }
    ) => {
      // const incrementLastSeqId = _.parseInt(_.get(_.first(current(state)),'sequenceId','')) + 1
      const isContentIdExistsData = _.find(
        current(state),
        (each) => _.get(each, 'contentId') === action.payload.contentId
      );
      const isContentIdExistsIndex = _.findIndex(
        current(state),
        (each) => _.get(each, 'contentId') === action.payload.contentId
      );

      if (_.size(isContentIdExistsData)) {
        state.splice(isContentIdExistsIndex, 1, {
          ...isContentIdExistsData,
          id: action.payload.id,
          type: 'text',
          version: '',
          senderDisplayName: '',
          createdOn: moment().utc().format(),
          metadata: {
            hasReactions: 'false',
            Reactions: '[]'
          },
          content: {
            message: action.payload.message
          },
          sender: {
            kind: 'communicationUser',
            communicationUserId: action.payload.communicationUserId
          },
          senderCommunicationIdentifier: {
            rawId: action.payload.communicationUserId
          },
          status: action.payload.status,
          contentId: action.payload.contentId
        });
      } else {
        state.push({
          id: action.payload.id,
          type: 'text',
          sequenceId: action.payload.sequenceId?.toString(),
          version: '',
          senderDisplayName: '',
          createdOn: moment().utc().format(),
          metadata: {
            hasReactions: 'false',
            Reactions: '[]'
          },
          content: {
            message: action.payload.message
          },
          sender: {
            kind: 'communicationUser',
            communicationUserId: action.payload.communicationUserId
          },
          senderCommunicationIdentifier: {
            rawId: action.payload.communicationUserId
          },
          status: action.payload.status,
          contentId: action.payload.contentId
        });
      }
    },

    atnUpdateMessage: (state, action: { type: string; payload: { status: string; message: string; id: string } }) => {
      const isIdExistsIndex = _.findIndex(current(state), (each) => _.get(each, 'id') === action.payload.id);
      state[isIdExistsIndex].content.message = action.payload.message;
      state[isIdExistsIndex].status = action.payload.status;
      state[isIdExistsIndex].editedOn = moment().utc().format();
    },
    atnClearMessage: (state, action) => {
      return [];
    }

    // here changing status of message (loading => success, loading => Failed)

    // Here removing the cached success messages
  }
});
export const acsMessageActions = acsMessages.actions;
export default acsMessages.reducer;
