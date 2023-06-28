/* eslint-disable no-useless-catch */
/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";

interface IMenteeObject {
  bio: {
    userId: string;
    workHistory: {
      companyName: string;
      role: string;
    };
    education: {
      university: string;
      major: string;
    };
  };
  displayName: string;
  id: string;
  headshot: string;
}

interface IMentorObject {
  bio: {
    userId: string;
    workHistory: {
      companyName: string;
      role: string;
    };
    education: {
      university: string;
      major: string;
    };
  };
  displayName: string;
  id: string;
  headshot: string;
}

interface IMatches {
  id: string;
  isConfirmed: boolean;
  grpId: string;
  matchStatus : string;
  mentee: {
    displayName: string;
    userId: string;
    headshot: string;
    bio: {
      workHistory: {
        companyName: string;
        role: string;
      };
      education: {
        university: string;
        major: string;
      };
    };
  };
  mentor: {
    displayName: string;
    id: string;
    headshot: string;
    bio: {
      workHistory: {
        companyName: string;
        role: string;
      };
      education: {
        university: string;
        major: string;
      };
    };
  };
}
interface IMatch {
  mentees: IMenteeObject[];
  mentors: IMentorObject[];
  matches: IMatches[];
}

interface IInitialState {
  loading: boolean;
  data: IMatch | undefined;
  error: boolean;
  errorText: string;
}

const initialState: IInitialState = {
  loading: false,
  data: undefined,
  error: false,
  errorText: "",
};

export const fetchMatches = createAsyncThunk(
  "getAllMatches",
  async ({ orgId, groupId }: { orgId: string; groupId: string }) => {
    try {
      const response = await API.getAllMatches({ orgId, groupId });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const getAllMatchesSlice = createSlice({
  name: "getAllMatches",
  initialState,
  reducers: {
    updateMenteesMentors: (state, action) => {
      const mentees =
        state.data?.mentees.filter(
          (each) => each.id !== action.payload.menteeId
        ) || [];
      const mentors =
        state.data?.mentors.filter(
          (each) => each.id !== action.payload.mentorId
        ) || [];
      const matches = state.data?.matches || [];
      return { ...state, data: { mentees, mentors, matches } };
    },

    updateConfirmStatus: (state, action) => {
      const mentees = state.data?.mentees || [];
      const mentors = state.data?.mentors || [];
      const matches = (state.data?.matches || []).map((ele) => {
        if (ele.id === action.payload) {
          return { ...ele, isConfirmed: true };
        }

        return ele;
      });

      return { ...state, data: { mentees, mentors, matches } };
    },
    updateConfirmStatusAll: (state ) => {
      const mentees = state.data?.mentees || [];
      const mentors = state.data?.mentors || [];
      const matches = (state.data?.matches || []).map((ele) => ({
        ...ele,
        isConfirmed: true,
      }));
    
      return { ...state, data: { ...state.data, matches , mentees , mentors } };
    },

    endMatch : (state , action) => {
      const mentees = state.data?.mentees || [];
      const mentors = state.data?.mentors || [];
      const matches = (state.data?.matches || []).map((ele) => {
        if (ele.id === action.payload) {
          return { ...ele, matchStatus: "Inactive" };
        }

        return ele;
      });      return { ...state , data : {
        ...state.data , matches , mentees , mentors
      }}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorText = "";
        state.data = undefined;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorText = "";
        state.data = action.payload as IMatch;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorText = action.error.message || "Something went wrong";
        state.data = undefined;
      });
  },
});
export const matchesActions = getAllMatchesSlice.actions;

export default getAllMatchesSlice.reducer;
