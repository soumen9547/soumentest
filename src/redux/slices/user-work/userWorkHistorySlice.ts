import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';
import { getUserDetails } from '../../../utils/orgName';

interface IInitialState {
  loading: boolean;
  error: boolean;
  data: any[];
  updated_data: any[];
  errorText: string;
}

const initialState: IInitialState = {
  loading: false,
  error: false,
  data: [],
  updated_data: [],
  errorText: ''
};

export const fetchUserWorkHistory = createAsyncThunk('user/workHistory', async (userId: string) => {
  const response = await API.getWorkHistory({ location: getUserDetails().location, userId: userId });
  return response.data;
});

const userWorkHistorySlice = createSlice({
  name: 'user-work-history',
  initialState,
  reducers: {
    clearWorkHistory: (state, action) => {
      state.loading = false;
      state.error = false;
      state.errorText = '';
      state.data = [];
      // state.updated_data = []
    },
    updateWorkHistory: (state, action) => {
      state.loading = false;
      state.error = false;
      state.errorText = '';
      // state.data = []
      state.updated_data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWorkHistory.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchUserWorkHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.updated_data = action.payload;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchUserWorkHistory.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.updated_data = [];
        state.error = false;
        state.errorText = action.error.message || '';
      });
  }
});

export default userWorkHistorySlice.reducer;
export const userWorkHistoryActions = userWorkHistorySlice.actions;
