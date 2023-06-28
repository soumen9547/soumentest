import _ from 'lodash';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';

interface IAcsOrgUser {
  id: {
    communicationId: string;
  };
  displayName: string;
}

interface IInitialState {
  loading: boolean;
  error: boolean;
  errorText: string;
  data: IAcsOrgUser[];
}

const initialState: IInitialState = {
  loading: false,
  error: false,
  errorText: '',
  data: []
};

export const fetchACSOrgMembers = createAsyncThunk(
  'acs/getAcsOrgMember',
  async ({
    orgId
  }: // location
  {
    orgId: string;
    // location: string
  }) => {
    const response: any = await API.getACSOrgUsers(orgId);
    if (response.status === 200) {
      if (!_.isEmpty(response)) {
        const filteredUserProfile = response.data.memberResponse.map((each: IAcsOrgUser) => ({
          id: { ...each.id, communicationUserId: _.get(each, 'id.communicationId', '') },
          displayName: _.get(each, 'displayName', ''),
          userId: _.get(each, 'userId')
        }));
        return filteredUserProfile;
      }
    } else {
      return [];
    }
  }
);

export const acsTokenSlice = createSlice({
  name: 'getToken',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchACSOrgMembers.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchACSOrgMembers.fulfilled, (state, action: { type: string; payload: any[] }) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchACSOrgMembers.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = true;
        state.errorText = action.error.message || '';
      });
  }
});

export default acsTokenSlice.reducer;
