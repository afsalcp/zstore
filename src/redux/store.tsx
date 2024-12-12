import {configureStore} from "@reduxjs/toolkit"
import { alert } from "./slicers/alertSlicer"
import { user } from "./slicers/userSlicer";
import { trendingProduct } from "./slicers/trendingSlice";
import { cart } from "./slicers/cartSlice";
import { fav } from "./slicers/favSlice";


const store=configureStore({
    reducer:{
        alert,
        user,
        trendingProduct,
        cart,
        fav
    }
})

export type StoreType=ReturnType<(typeof store)['getState']>;

export default store