import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

type SortId = {
    sort: string;
}

interface FetchPizza {
    currentPage: string;
    categoryId: number;
    sortId: SortId;
    searchValue: string;
}

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    testo: number[];
    size: number[];
    rating: number;
}

interface PizzasSliceState {
    pizzas: Pizza[];
    status: Status;
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params: FetchPizza) => {
        const {currentPage, categoryId, sortId, searchValue} = params;
        const {data} = await axios.get<Pizza[]>(`https://651d472344e393af2d597c5b.mockapi.io/pizzas?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortId.sort}&order=desc${searchValue !== '' ? `&search=${searchValue}` : ''}`);

        return data as Pizza[];
    }
)

const initialState: PizzasSliceState = {
    pizzas: [],
    status: Status.LOADING,
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.pizzas = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.pizzas = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.pizzas = [];
        });
    }
});

export const {setPizzas} = pizzasSlice.actions
export default pizzasSlice.reducer