import { createSlice } from '@reduxjs/toolkit';
interface IBreadCrumbs {
  id: string;
  name: string;
  url: string;
}

interface IInitialState {
  breadcrumbs: IBreadCrumbs[] | [];
}

const initialState: IInitialState = {
  breadcrumbs: []
};

const breadCrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    updateBreadCrumbs: (state, action) => {
      const groupIndex = state.breadcrumbs.findIndex(
        (each) => each.id === action.payload.id && each.name === action.payload.name
      );
      if (groupIndex === -1) {
        return { breadcrumbs: [...state.breadcrumbs, action.payload] };
      } else {
        return { breadcrumbs: [...state.breadcrumbs.slice(0, groupIndex + 1)] };
      }
    },
    removeBreadCrumbs: (state, action) => {
      return { ...state, breadcrumbs: [action.payload] };
    },
    updateBreadCrumbName: (state, action) => {
      const breadcrumbs = state.breadcrumbs.map((each) => {
        if (each.id === action.payload.id) {
          return { ...each, name: action.payload.name };
        }
        return each;
      });
      return { breadcrumbs };
    }
  }
});

export default breadCrumbsSlice.reducer;

export const breadCrumbsActions = breadCrumbsSlice.actions;
