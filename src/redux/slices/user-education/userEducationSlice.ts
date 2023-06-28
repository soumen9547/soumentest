import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';
import { getUserDetails } from '../../../utils/orgName';

interface IInitialState {
  loading: boolean;
  error: boolean;
  data: any[];
  errorText: string;
}

const initialState: IInitialState = {
  loading: false,
  error: false,
  data: [],
  errorText: ''
};

export const fetchUserEducation = createAsyncThunk('user/education', async (userId: string) => {
  const response = await API.getEducationAndSkills({ location: getUserDetails().location, userId: userId });
  return response.data;
});

const userEducationSlice = createSlice({
  name: 'user-education',
  initialState,
  reducers: {
    clearEducation: (state, action) => {
      state.loading = false;
      state.error = false;
      state.errorText = '';
      state.data = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEducation.pending, (state) => {
        state.loading = true;
        state.data = [];
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchUserEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchUserEducation.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = false;
        state.errorText = action.error.message || '';
      });
  }
});

export default userEducationSlice.reducer;
export const userEducationActions = userEducationSlice.actions;
