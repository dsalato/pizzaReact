import { configureStore } from '@reduxjs/toolkit'
import filterSlice from '../redux/slices/filterStore'
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizzas: pizzasSlice,
    },
})