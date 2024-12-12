
import { CartState } from '../redux/slicers/cartSlice'
import { FavState } from '../redux/slicers/favSlice'
import axios from '../request'

import { AxiosResponse } from 'axios'

export async function refreshCart():Promise<boolean|CartState>{
 
    type Response={
        sts:boolean,
        msg?:string,
        cart?:CartState
    }
    let res:AxiosResponse<Response>=await axios.get('/cart/get-data')


    if(!res.data.sts)return false

    return res.data.cart!
}

export async function refreshFav():Promise<boolean|FavState> {
    type Response={
        sts:boolean,
        msg?:string,
        fav?:FavState
    }
    let res:AxiosResponse<Response>=await axios.get('/fav/get-data')


    if(!res.data.sts)return false

    return res.data.fav!
}