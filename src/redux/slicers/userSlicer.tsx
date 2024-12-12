import { createSlice, CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit";


interface UserDataState{
    fname:string,
    lname:string,
    area:string,
    building:string,
    city:string,
    email:string,
    phone:string,
    pincode:string|number,
    state:string,
    loaded?:boolean
}

const initialState:UserDataState={
    fname:"",
    lname:"",
    area:"",
    building:"",
    city:"",
    email:"",
    phone:'',
    pincode:"",
    state:'',
    loaded:false
}

type SetUserAction={
    user:UserDataState
}

const userSlice=createSlice({
    initialState,
    name:"user",
    reducers:{
        setUser:(state:UserDataState,action:PayloadAction<SetUserAction>)=>{
           console.log(action.payload.user,"payload data")
            if(!action.payload.user)return state

            state={...action.payload.user,loaded:true}
            return state
        },
        unsetUser:(state)=>{
            state=initialState
        }
    }

}  )

export const user= userSlice.reducer
export const {setUser,unsetUser} =userSlice.actions;
export  type UserData = UserDataState