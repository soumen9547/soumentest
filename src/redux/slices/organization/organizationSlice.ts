/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";

interface IOrgActions {
  loading: boolean;
  error: boolean;
  errorText: string;
  success: boolean;
}

interface IOrgAction {
  delete: IOrgActions;
  update: IOrgActions;
}

interface IInitialState {
  loading: boolean;
  error: boolean;
  errorText: string;
  data: IOrgResponse;
  actions: IOrgAction;
}

const initialState: IInitialState = {
  loading: false,
  error: false,
  errorText: "",
  data: {
    organizations: [],
    start: 0,
    limit: 0,
    total: 0,
    page: 0,
    per_page: 0,
  },
  actions: {
    delete: {
      loading: false,
      error: false,
      errorText: "",
      success: false,
    },
    update: {
      loading: false,
      error: false,
      errorText: "",
      success: false,
    },
  },
};

export const fetchOrganizations = createAsyncThunk(
  "organizations/getOrg",
  async ({
    token,
    currentPageNo,
    perPage,
  }: {
    token: string;
    currentPageNo: number;
    perPage: number;
  }) => {
    const response = await API.getOrganizations(token, currentPageNo, perPage);
    return response.data;
  }
);

export const deleteOrganization = createAsyncThunk(
  "organizations/deleteOrg",
  async ({
    token,
    orgId,
    dataLocation,
  }: {
    token: string;
    orgId: string;
    dataLocation: string;
  }) => {
    const response = await API.removeOrganization(token, orgId, dataLocation);
    return response;
  }
);

export const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.data.organizations = [];
        state.loading = true;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.data.organizations = [];
        state.error = true;
        state.errorText = action.error.message || "";
      })

      .addCase(deleteOrganization.pending, (state) => {
        state.actions.delete.loading = true;
        state.actions.delete.error = false;
        state.actions.delete.success = false;
        state.actions.delete.errorText = "";
      })
      .addCase(deleteOrganization.fulfilled, (state) => {
        state.actions.delete.loading = false;
        state.actions.delete.error = false;
        state.actions.delete.errorText = "";
        state.actions.delete.success = true;
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.actions.delete.loading = false;
        state.actions.delete.error = true;
        state.actions.delete.errorText = action.error.message || "";
        state.actions.delete.success = false;
      });
  },
});

export default organizationSlice.reducer;
