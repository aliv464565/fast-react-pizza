import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import user from './features/user/userSlice'
import Carts from "./features/cart/cartSlice";

const store = configureStore({
    reducer: {
        user,
        Carts
    }
})
export default store