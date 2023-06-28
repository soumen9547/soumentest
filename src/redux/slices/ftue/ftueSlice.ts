/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";
import { IUserFtue } from "./ftueUser";

interface IInitialData {
    loading: boolean
    error: boolean
    errorText:string
    payload: IUserFtue | undefined
}

const initialState:IInitialData = {
    loading:false,
    error: false,
    errorText: '',
    payload:undefined
}

export const fetchUserFtue = createAsyncThunk('user/getFtue',
( {token,orgId}:{token:string, orgId:string}) => {
    return API.getUserMetadData(token, orgId).then((response=> response.data))
  })

const ftueSlice = createSlice({
    name:'ftue',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUserFtue.pending,(state)=>{
            state.loading = true
            state.error = false
            state.errorText = ''
            state.payload = undefined
        }).addCase(fetchUserFtue.fulfilled,(state, action)=>{
            state.loading = false
            state.error = false
            state.errorText = ''
            state.payload = action.payload
        }).addCase(fetchUserFtue.rejected,(state, action)=>{
            state.loading = false
            state.error = true
            state.errorText = action.error.message || ''
            state.payload = undefined
        })
    }
})

export default ftueSlice.reducer