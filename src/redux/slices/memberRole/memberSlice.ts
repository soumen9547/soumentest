/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API } from "../../../api"

interface IMemberRoleArray{
    id:string
   role:number
    description:string
}

interface IInitialState{
    loading:boolean
    error:boolean
    payload:IMemberRoleArray | undefined,
    errorText:string
} 

const initialState: IInitialState = {
    loading:false,
    error:false,
    payload:undefined,
    errorText:''
}

export const getMemberRoles = createAsyncThunk("member/roles",
({ token, orgId, userId }: { token: string; orgId: string, userId:string }) => {
    return API.getMemberRoles(token, orgId, userId).then((response)=>response.data)
  }
)

const memberSlice = createSlice({
    name:'memberRole',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
            builder.addCase(getMemberRoles.pending,(state)=>{
                state.loading = true
                state.payload = undefined
                state.error = false
                state.errorText = ''
            }).addCase(getMemberRoles.fulfilled,(state,action)=>{
                state.loading = false
                state.error= false
                state.payload = action.payload
                state.errorText = ''
            }).addCase(getMemberRoles.rejected,(state,action)=>{
                state.loading = false
                state.error= true
                state.payload = undefined
                state.errorText = action.error.message || 'Unable to get roles'
            })
    }
})

export default memberSlice.reducer