import { createSlice, CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit";
import { TrendingProduct, TrendingProducts } from "../../pages/HomePage";



type TrendingState={
    products:TrendingProducts|null,
    productKeys:string[]|null
}

const initialState:TrendingState={
    products:null,
    productKeys:null
}




const trendingSlicer=createSlice({
    initialState,
    name:"trendingProduct",
    reducers:{
        setTrendingProduct:(state:TrendingState,action:PayloadAction<TrendingState>)=>{
            state=action.payload

            return state    
        }
    }

})


export const trendingProduct=trendingSlicer.reducer

export const {setTrendingProduct}=trendingSlicer.actions
export type {TrendingState}