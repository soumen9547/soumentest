/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';

interface IInitialState {
  loading: boolean;
  error: boolean;
  errorText: string;
  data: IUser[];
}

const initialState: IInitialState = {
  loading: false,
  error: false,
  errorText: '',
  data: []
};

export const fetchUsers = createAsyncThunk(
  'users/getUsers',
  async ({ token, orgId }: { token: string; orgId: string }) => {
    const response = await API.getUsersByOrgId(token, orgId);
    return response.data;
  }
);

const userSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = false;
        state.errorText = action.error.message || '';
      });
  }
});

export default userSlice.reducer;
