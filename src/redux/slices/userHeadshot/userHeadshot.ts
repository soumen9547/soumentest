import { createSlice } from '@reduxjs/toolkit';
import { getUserDetails } from '../../../utils/orgName';

interface IHadshot {
  src: string;
}

const initialState: IHadshot = {
  src: getUserDetails().picture
};

const userHeadshotSlice = createSlice({
  name: 'headshot',
  initialState,
  reducers: {
    update: (state, action) => {
      state.src = action.payload;
    }
  }
});

export default userHeadshotSlice.reducer;
export const { update } = userHeadshotSlice.actions;
