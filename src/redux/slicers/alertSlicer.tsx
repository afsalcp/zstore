import {createSlice,CreateSliceOptions, PayloadAction} from '@reduxjs/toolkit'
import { sleep } from '../../settings/basic'


type State={
    show:boolean,
    msg:string|null,
    delay?:number|boolean
}

type ShowAction={
    msg:string,
    hide?:number|null
}

const initialState:State={
    show:false,
    msg:null,
    delay:false
}

const alertSlice=createSlice({
    initialState,
    name:"alert",
    reducers:{
        show:(state:State,action:PayloadAction<ShowAction>)=>{
            state.show=true
            state.msg=action.payload.msg
            if(action.payload.hide){
                state.delay=action.payload.hide
            }
        },
        hide:(state:State)=>{
            state.show=false
            state.msg=null
            state.delay=false
        }
    }
} as CreateSliceOptions     );

export const alert=alertSlice.reducer
export const {show:showAlert,hide:hideAlert}=alertSlice.actions
export type AlertStatetype=State