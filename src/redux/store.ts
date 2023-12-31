import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterStore'
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizzas: pizzasSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()