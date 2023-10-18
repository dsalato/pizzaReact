import { configureStore } from '@reduxjs/toolkit'
import filterSlice from '../redux/slices/filterStore'

export const store = configureStore({
    reducer: {
        filter: filterSlice,
    },
})