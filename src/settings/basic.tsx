import { AxiosResponse } from "axios"
import axios from "../request"

export async function sleep(time:number):Promise<void>{
    return new Promise((res)=>{
        setTimeout(()=>res(),time)
    })
}

export async function checkAuth():Promise<boolean> {
    let data:AxiosResponse=await axios.get("/getData")

    return data.data.sts
}
