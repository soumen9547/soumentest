/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { API } from '../../../api';
import { getUserDetails } from '../../../utils/orgName';

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

export const fetchTags = createAsyncThunk('tags/getTags', async () => {
  const response = await API.getTags({ location: getUserDetails().location });
  return _.get(response, 'data.tagListResponse', []);
});

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = false;
        state.errorText = action.error.message || '';
      });
  }
});

export const tagsActions = tagsSlice.actions;

export default tagsSlice.reducer;
