/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, IOptionalFields } from "../../../api";

export interface IGRoupDetails {
  orgId: string;
  name: string;
  orgParentGroup: boolean;
  members: number;
  childGroups: string[];
  admins: number;
  mentors: number;
  hierarchy: string[];
  createdAt: number;
  createdBy: string;
  updatedBy: string;
  chatChannel: boolean;
  chatChannelId: string;
  grpId: string;
  logo: string;
  endDate: number;
  optionalFields?: IOptionalFields;
  matchesSettings: {
    maxMatchesPerMentee: number;
    maxMatchesPerMentor: number;
  };
}

const grpInitialData = {
  orgId: "",
  name: "",
  orgParentGroup: false,
  members: 0,
  childGroups: [],
  admins: 0,
  mentors: 0,
  hierarchy: [],
  createdAt: 0,
  createdBy: "",
  updatedBy: "",
  chatChannel: false,
  chatChannelId: "",
  grpId: "",
  logo: "",
  endDate: 0,
  optionalFields: {
    gender: false,
    ethnicity: false,
    firstGenerationStudent: false,
    disabilityType: false,
    dob: false,
    country: false,
  },
  matchesSettings: {
    maxMatchesPerMentee: 1,
    maxMatchesPerMentor: 1,
  },
};

interface IInitialState {
  loading: boolean;
  data: IGRoupDetails | undefined;
  error: boolean;
  errorText: string;
}

const initialState: IInitialState = {
  data: undefined,
  loading: false,
  error: false,
  errorText: "",
};

export const fetchGroupDetails = createAsyncThunk(
  "getGroupDetails",
  (grpId: string) => {
    return API.getGroupDetails(grpId).then((response) => response.data);
  }
);

const groupDetailsSlice = createSlice({
  name: "group details",
  initialState,
  reducers: {
    updateGroupInfo: (state, action) => {
      const grpData = state.data ? state.data : grpInitialData;
      return { ...state, data: { ...grpData, ...action.payload } };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupDetails.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.data = undefined;
        state.errorText = "";
      })
      .addCase(fetchGroupDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
        state.errorText = "";
      })
      .addCase(fetchGroupDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.data = undefined;
        state.errorText = action.error.message || "Something went wrong";
      });
  },
});

export default groupDetailsSlice.reducer;
export const grpDetailsActions = groupDetailsSlice.actions;
