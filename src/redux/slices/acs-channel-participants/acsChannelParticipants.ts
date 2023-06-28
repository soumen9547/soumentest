import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';

interface IInitialState {
  loading: boolean;
  error: boolean;
  errorText: string;
  data: [];
}

const initialState: IInitialState = {
  loading: false,
  error: false,
  errorText: '',
  data: []
};

export const fetchAcsChannelParticipants = createAsyncThunk(
  'acs/channelParticipants',
  async ({ acsToken, threadId }: { acsToken: string; threadId: string }) => {
    const response = await API.getACSThreadParticipants(acsToken, threadId);
    return response.data;
  }
);

export const acsChannelParticipants = createSlice({
  name: 'getChannelParticipants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcsChannelParticipants.pending, (state, action) => {
        state.loading = true;
        state.data = initialState.data;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchAcsChannelParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchAcsChannelParticipants.rejected, (state, action) => {
        state.loading = false;
        state.data = initialState.data;
        state.error = true;
        state.errorText = action.error.message || '';
      });
  }
});

export default acsChannelParticipants.reducer;
