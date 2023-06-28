import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';
export interface IUserData {
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  timezone: string;
  headshot: string;
  dob: string;
  phoneNumber: string;
  phonePrefix: string;
  gender: string;
  ethnicity: string;
  firstGenStudent: string;
  isActive: boolean;
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
    linkedIn: string;
  };
  // social: string[];
  disability: string[];
  category: string;
  hobbies: string[];
  // photo?: File;
}

interface IData {
  personal_details: IUserData;
  admins: string[];
  mentee: string[];
  mentors: string[];
  settings: {
    gender: boolean;
    country: boolean;
    firstGenerationStudent: boolean;
    ethnicity: boolean;
    dob: boolean;
    disabilityType: boolean;
  };
  videoIntro: string;
}

interface IUser {
  loading: boolean;
  error: boolean;
  errorText: string;
  data: IData | undefined;
}

const initialState: IUser = {
  loading: false,
  error: false,
  errorText: '',
  data: undefined
};

export const fetchUserProfile = createAsyncThunk('userprofile', () => {
  return API.getUserProfile()
    .then((response) => {
      return response.data;
    })
    .catch((err) => {});
});

const userProfileSlice = createSlice({
  name: 'user profile',
  initialState,
  reducers: {
    update: (state, action) => {
      state.data = action.payload;
    },
    userHobbiesUpdate: (state, action) => {
      if (state.data) {
        state.data.personal_details.hobbies = action.payload;
      }
    },
    userDisabilityUpdate: (state, action) => {
      if (state.data) {
        state.data.personal_details.disability = action.payload;
      }
    },
    userSocialUpdate: (state, action) => {
      if (state.data) {
        state.data.personal_details.social = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
        state.data = undefined;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorText = '';
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorText = action.error.message || 'Something Went Wrong';
        state.data = undefined;
      });
  }
});

export default userProfileSlice.reducer;

export const userInfoUpdate = userProfileSlice.actions.update;

export const { userHobbiesUpdate } = userProfileSlice.actions;

export const { userDisabilityUpdate } = userProfileSlice.actions;

export const { userSocialUpdate } = userProfileSlice.actions;
