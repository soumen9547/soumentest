import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';

interface IInitialState {
  loading: boolean;
  data:
    | {
        orgId: string;
        name: string;
        display_name: string;
        authOrgId: string;
      }
    | undefined;
  error: boolean;
  errorText: string;
}

const initialState: IInitialState = {
  loading: false,
  data: undefined,
  error: false,
  errorText: ''
};
export const fetchOrgId = createAsyncThunk('org/id', (orgName: string) => {
  return API.getOrgId(orgName).then((response) => response.data);
});

const orgIdSlice = createSlice({
  name: 'orgId',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgId.pending, (state) => {
        state.loading = true;
        state.data = undefined;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchOrgId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchOrgId.rejected, (state, action) => {
        state.loading = false;
        state.data = undefined;
        state.error = true;
        state.errorText = action.error.message || '';
      });
  }
});

export default orgIdSlice.reducer;
