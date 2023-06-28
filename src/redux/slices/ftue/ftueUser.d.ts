/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

export interface IUserData{
    id:string
    name:string
    email:string
    orgId:string
    role:string
}

export interface IUserMetadata{
    communicationId:string
    displayName:string
    ftue:boolean
}

export interface IUserFtue {
    user_id:string
    user_metadata:IUserMetaData
    picture:string
    email:string
}