import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';

interface IInitialState {
  loading: boolean;
  error: boolean;
  errorText: string;
  data: any[];
}

const initialState: IInitialState = {
  loading: false,
  error: false,
  errorText: '',
  data: []
};

export const fetchAllTags = createAsyncThunk(
  'getTagsList',
  async ({ orgId, location }: { orgId: string; location: string }) => {
    const response = await API.getTagsList(orgId, location);
    return response.data.tagListResponse;
  }
);

export const alltagslistSlice = createSlice({
  name: 'alltags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTags.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchAllTags.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchAllTags.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = false;
        state.errorText = action.error.message || '';
      });
  }
});

export const tagsActions = alltagslistSlice.actions;

export default alltagslistSlice.reducer;
