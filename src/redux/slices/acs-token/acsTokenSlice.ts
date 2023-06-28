import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';

interface IInitialState {
  loading: boolean;
  error: boolean;
  errorText: string;
  data: { token: string; expiresOn: string };
}

const initialState: IInitialState = {
  loading: false,
  error: false,
  errorText: '',
  data: { token: '', expiresOn: '' }
};

export const fetchAcsToken = createAsyncThunk(
  'acs/getToken',
  async ({ communicationId }: { communicationId: string }) => {
    const response = await API.getACSToken(communicationId);
    window.localStorage.setItem('acsToken', response.data?.token);
    return response.data;
  }
);

export const acsTokenSlice = createSlice({
  name: 'getToken',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcsToken.pending, (state, action) => {
        state.loading = true;
        state.data = initialState.data;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchAcsToken.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchAcsToken.rejected, (state, action) => {
        state.loading = false;
        state.data = initialState.data;
        state.error = true;
        state.errorText = action.error.message || '';
      });
  }
});

export default acsTokenSlice.reducer;
