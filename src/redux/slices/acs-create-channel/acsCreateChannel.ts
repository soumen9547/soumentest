import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';

interface IInitialState {
  loading: boolean;
  data: any;
  error: boolean;
  errorText: string;
}

const initialState: IInitialState = {
  loading: false,
  data: undefined,
  error: false,
  errorText: ''
};

export const fetchACSCreateChannel = createAsyncThunk(
  'createACSThread',
  ({ acsToken, data, orgId }: { acsToken: string; data: any; orgId: string }) => {
    return API.createACSThread(acsToken, data, orgId).then((response) => response.data);
  }
);

const fetchACSCreateChannelSlice = createSlice({
  name: 'community member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchACSCreateChannel.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
        state.data = undefined;
      })
      .addCase(fetchACSCreateChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorText = '';
        state.data = action.payload;
      })
      .addCase(fetchACSCreateChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorText = action.error.message || '';
        state.data = undefined;
      });
  }
});

export default fetchACSCreateChannelSlice.reducer;
