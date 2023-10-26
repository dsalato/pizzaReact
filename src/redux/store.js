import { configureStore } from '@reduxjs/toolkit'
import filterSlice from '../redux/slices/filterStore'
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
    },
})