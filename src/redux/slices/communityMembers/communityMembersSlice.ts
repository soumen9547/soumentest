/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";

interface IInitialState {
  loading: boolean;
  data: any;
  error: boolean;
  errorText: string;
}

const initialState: IInitialState = {
  loading: false,
  data: undefined,
  error: false,
  errorText: "",
};

export const fetchCommunityMember = createAsyncThunk(
  "getCommunityMembers",
  ({
    orgId,
    location,
    role,
    category,
  }: {
    orgId: string;
    location: string;
    role: string | "";
    category: string | "";
  }) => {
    return API.getCommunityMembers(orgId, location,role,category).then(
      (response) => response.data
    );
  }
);

const communityMembersSlice = createSlice({
  name: "community member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityMember.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorText = "";
        state.data = undefined;
      })
      .addCase(fetchCommunityMember.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorText = "";
        state.data = action.payload;
      })
      .addCase(fetchCommunityMember.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorText = action.error.message || "";
        state.data = undefined;
      });
  },
});

export default communityMembersSlice.reducer;
