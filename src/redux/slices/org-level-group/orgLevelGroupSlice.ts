/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";

interface IOrgGroup {
    orgId:string;
    name:string;
    status:string;
    childGroups:string[];
    grpId:string;
    isOrgParentGrp:boolean
}

interface IInitialState {
    loading:boolean;
    data:IOrgGroup | undefined;
    error:boolean;
    errorText:string;
}

const initialState:IInitialState = {
    loading:false,
    data:undefined,
    error:false,
    errorText:''
}

export const fetchOrgLevelGroup = createAsyncThunk('getGroupByOrgId',(orgId:string)=>{
return API.getGroupByOrgId(orgId).then((response)=>response.data)
})

const orgLevelGroupSlice = createSlice({
    name:'org level group',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchOrgLevelGroup.pending,(state)=>{
                state.loading = true
                state.error = false
                state.errorText = ''
                state.data = undefined
        }).addCase(fetchOrgLevelGroup.fulfilled,(state,action)=>{
            state.loading = false
            state.error = false
            state.errorText = ''
            state.data = action.payload
    }).addCase(fetchOrgLevelGroup.rejected,(state,action)=>{
        state.loading = false
        state.error = true
        state.errorText = action.error.message || ''
        state.data = undefined
})
    }
})

export default orgLevelGroupSlice.reducer
