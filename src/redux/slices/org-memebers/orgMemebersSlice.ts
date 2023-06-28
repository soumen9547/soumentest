/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";

interface IInitialState {
  loading: boolean;
  error: boolean;
  errorText: string;
  data: any[];
}

const initialState: IInitialState = {
  loading: false,
  error: false,
  errorText: "", 
  data: [], 
};

export const fetchOrganizationMembers = createAsyncThunk(
  "organization/members",
  async ({ token, orgId, communicationId }: { token: string; orgId: string; communicationId: string }) => {
    const response = await API.getUsersMetaByOrgId(token, orgId);
    return response.data;
  }
);

const organizationsMemberSlice = createSlice({
  initialState,
  name: "members",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizationMembers.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorText = "";
      })
      .addCase(fetchOrganizationMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        state.errorText = "";
      })
      .addCase(fetchOrganizationMembers.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = false;
        state.errorText = action.error.message || "";
      });
  },
});

export default organizationsMemberSlice.reducer;
