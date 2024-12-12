import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type FavState=string[]

const initialState:FavState=[]


const favSlice=createSlice({
    initialState,
    name:'fav',
    reducers:{
        updateFav:(state:FavState,action:PayloadAction<FavState>)=>{
            state=action.payload

            return state
        }
    }
})

export const fav=favSlice.reducer
export const {updateFav}=favSlice.actions
export type {FavState}