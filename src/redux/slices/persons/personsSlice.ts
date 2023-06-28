/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit';
// import { addOrganization } from '../organization/organizationSlice'

const initialState: IPerson[] = [];

export const personsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    atnInvitePerson: (state, action) => {},
    atnChangePersonStatus: (state, action) => {},
    atnChangePersonRole: (state, action) => {}
  },
  extraReducers: (builder) => {
    // builder.addCase(addOrganization, (state,action)=>{
    //   // state.push(action.payload.members)
    //   // state.push(_.get(action,'payload.members',''))
    // })
  }
});

export const { atnInvitePerson, atnChangePersonRole, atnChangePersonStatus } = personsSlice.actions;

export default personsSlice.reducer;
