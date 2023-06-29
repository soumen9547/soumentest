/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";
// import { error } from "console";

export interface IGroupData {
    orgId:string;
    name:string;
    childGroups:number;
    grpId:string;
    status:string;
    enrolled:number;
    startDate:number;
    endDate:number;
    logo:string;
}

export interface IGroup{
groups:IGroupData[],
total:number,
mainGroup:boolean;
mainGroupName:string;
}

interface IInitialState {
    loading:boolean;
    data:IGroup | undefined;
    error:boolean;
    errorText:string;
}

const initialState:IInitialState = {
    loading:false,
    data:undefined,
    error:false,
    errorText:''
}

export const fetchAllGroups = createAsyncThunk('getAllGroups', async ({ orgId, grpId }: { orgId: string, grpId: string }) => {
    try {
        const response = await API.getAllGroups({ orgId, grpId });
        return response.data;
    } catch (error) {
        // Handle the error here
        // console.error(error);
        throw error; // Rethrow the error to be captured by the rejected action
    }
  });
  

const getAllGroupsSlice = createSlice({
    name:'get all groups',
    initialState,
    reducers:{
        addGroup:(state,action)=>{
            const groups = state.data?.groups || []
            const total = state.data?.total || 0
            const mainGroup = state.data?.mainGroup || false
            const mainGroupName = state.data?.mainGroupName || ''
            return {...state,data:{groups:[...groups,action.payload],total:total+1,mainGroup,mainGroupName}}
        }, 
        deleteGroup:(state,action)=>{
            const filteredGroups = state.data?.groups.filter((each)=>each.grpId !== action.payload) || []
            const total = state.data?.total || 0
            const mainGroup = state.data?.mainGroup || false
            const mainGroupName = state.data?.mainGroupName || ''
            return {...state,data:{mainGroupName,groups:filteredGroups,total:total-1, mainGroup}}

        },
        updateMainGroupName:(state,action)=>{
            const data = state.data ? {...state.data,mainGroupName:action.payload} : {mainGroupName:'',groups:[],total:0, mainGroup:false}
            return {...state,data}
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllGroups.pending,(state)=>{
            state.loading = true
            state.error = false
            state.errorText = ''
            state.data = undefined
        }).addCase(fetchAllGroups.fulfilled,(state,action)=>{
            state.loading = false
            state.error = false
            state.errorText = ''
            state.data = action.payload
        }).addCase(fetchAllGroups.rejected,(state,action)=>{
            state.loading = false
            state.error = true
            // console.error(action.error)
            state.errorText =action.error.message || 'Something went wrong'
            state.data = undefined
        })

    }
})

export const groupActions = getAllGroupsSlice.actions;

export default getAllGroupsSlice.reducer

