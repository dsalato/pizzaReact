import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {currentPage, categoryId, sortId, searchValue} = params;
        const {data} = await axios.get(`https://651d472344e393af2d597c5b.mockapi.io/pizzas?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortId.sort}&order=desc${searchValue !== '' ? `&search=${searchValue}` : ''}`);
        return data;
    }
)

const initialState = {
    pizzas: [],
    status: 'loading',
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.pizzas = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.pizzas = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.pizzas = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.pizzas = [];
        }
    }
});

export const {setPizzas} = pizzasSlice.actions
export default pizzasSlice.reducer