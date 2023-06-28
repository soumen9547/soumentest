/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";

export type IGroupUser = {
  userId: string;
  name: string;
  category: string;
  headshot: string;
  lastLogin: number;
  role: string;
};

export interface IGroupInvitedUser {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  role: string;
  email: string;
  userId: string;
  name: string;
  invitationId: string;
}

type IGroupUsers = {
  users: IGroupUser[];
  invitedUsers: IGroupInvitedUser[];
};

type IInitialState = {
  data: IGroupUsers | undefined;
  loading: boolean;
  error: boolean;
  errorText: string;
};

const initialState: IInitialState = {
  data: undefined,
  loading: false,
  error: false,
  errorText: "",
};

export const fetchGroupUsers = createAsyncThunk(
  "groupUsers",
  (grpId: string) => {
    return API.getGroupUsers(grpId).then((response) => response.data);
  }
);

const groupUsersSlice = createSlice({
  name: "group users",
  initialState,
  reducers: {
    updateGroupUsers: (state, action) => {
      const users = state.data?.users || [];
      const invitedUsers = state.data?.invitedUsers || [];
      return {
        ...state,
        data: { users: [...users, action.payload], invitedUsers },
      };
    },
    updateGroupInvitedUsers: (state, action) => {
      const users = state.data?.users || [];
      const invitedUsers = state.data?.invitedUsers || [];
      return {
        ...state,
        data: { users, invitedUsers: [...invitedUsers, action.payload] },
      };
    },
    updateInvitedUser: (state, action) => {
      const users = state.data?.users || [];
      const invitedUsers =
        state.data?.invitedUsers.map((each) => {
          if (each.userId === action.payload.userId) {
            return action.payload;
          }
          return each;
        }) || [];
      return { ...state, data: { users, invitedUsers } };
    },
    removeUser: (state, action) => {
      const users =
        state.data?.users.filter(
          (each) => each.userId !== action.payload.userId
        ) || [];
      const invitedUsers = state.data?.invitedUsers || [];
      return { ...state, data: { users, invitedUsers } };
    },
    removeInvitedUser: (state, action) => {
      const users = state.data?.users || [];
      const invitedUsers =
        state.data?.invitedUsers.filter(
          (each) => each.invitationId !== action.payload.invitationId
        ) || [];
      return { ...state, data: { users, invitedUsers } };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupUsers.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.data = undefined;
        state.errorText = "";
      })
      .addCase(fetchGroupUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
        state.errorText = "";
      })
      .addCase(fetchGroupUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.data = undefined;
        state.errorText = action.error.message || "Something went wrong";
      });
  },
});

export default groupUsersSlice.reducer;
export const groupUsersActions = groupUsersSlice.actions;
