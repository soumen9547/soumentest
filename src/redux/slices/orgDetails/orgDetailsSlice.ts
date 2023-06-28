import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';

// {
//   "_id": "6413ed0b1198b8887494cb94",
//   "authId": "org_FTqKCy3FwwD4DWCn",
//   "name": "Starventure",
//   "oid": "starventure",
//   "orgLogo": "https://dosenv2storage.blob.core.windows.net/organizationprofilepicture/1684478846320_Dosenv1.jpg",
//   "description": "Actually it is starventure organization for testing renamed to test organization",
//   "dataLocation": "us",
//   "createdAt": 1684412855,
//   "createdBy": "maneesha@dosen.io",
//   "updatedAt": 1679291587,
//   "updatedBy": "maneesha@dosen.io",
//   "grpId": "64491e3bf529fcb3539746c7",
//   "orgType": "Government & Development Organisation"
// }

export interface IOrgData {
  _id: string;
  authId: string;
  name: string;
  orgLogo: string;
  description: string;
  orgType: string;
  userTypes: string[];
}

interface IInitialState {
  loading: boolean;
  data: IOrgData | undefined;
  error: boolean;
  errorText: string;
}

const initialState: IInitialState = {
  loading: false,
  data: undefined,
  error: false,
  errorText: ''
};

export const fetchOrgDetails = createAsyncThunk('org/name', (orgId: string) => {
  return API.getOrgName(orgId).then((response) => response.data);
});

const orgDetailsSlice = createSlice({
  name: 'orgDetails',
  initialState,
  reducers: {
    updateOrgSettings: (state, action) => {
      return { ...state, data: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchOrgDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchOrgDetails.rejected, (state, action) => {
        state.loading = false;
        state.data = undefined;
        state.error = true;
        state.errorText = action.error.message || '';
      });
  }
});

export default orgDetailsSlice.reducer;
export const orgSettingsActions = orgDetailsSlice.actions;
