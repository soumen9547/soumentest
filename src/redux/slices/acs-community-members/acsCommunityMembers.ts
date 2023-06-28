import _ from 'lodash';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';

interface IAcsOrgUser {
  id: {
    communicationId: string;
  };
  displayName: string;
  userId: string;
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

export const fetchCommunityMembers = createAsyncThunk(
  'acs/getCommunityMember',
  async ({ orgId, location }: { orgId: string; location: string }) => {
    const response = await API.getCommunityMembers(orgId, location);

    if (response.status === 200) {
      if (!_.isEmpty(response)) {
        const filteredUserProfile = response.data.memberResponse.map((each: any) => ({
          id: { ...each.id, communicationUserId: _.get(each, 'id.communicationId', '') },
          displayName: _.get(each, 'displayName', ''),
          userId: _.get(each, 'userId'),
          bio: _.get(each, 'bio', ''),
          digital_intro: _.get(each, 'digital_intro', '')
        }));
        return filteredUserProfile;
      }
    } else {
      return [];
    }
  }
);

export const acsCommunitySlice = createSlice({
  name: 'getToken',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityMembers.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchCommunityMembers.fulfilled, (state, action: { type: string; payload: any[] }) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchCommunityMembers.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = true;
        state.errorText = action.error.message || '';
      });
  }
});

export default acsCommunitySlice.reducer;
