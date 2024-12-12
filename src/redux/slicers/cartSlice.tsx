import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type CartState={
    [key:string|number]:number
}

const initialState:CartState={

}

const cartSlice=createSlice({
    initialState,
    name:'cart',
    reducers:{
        updateCart:(state:CartState,action:PayloadAction<CartState>)=>{
            console.log(action.payload,'in cart')
            return state=action.payload
        }
    }
})

export const cart=cartSlice.reducer
export const {updateCart}=cartSlice.actions

export type {CartState}