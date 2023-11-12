import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem} from "./cartSlice";

type Sort = {
    name: string;
    sort: 'rating' | 'title' | 'price';
}

interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    sortId: Sort;
    currentPage: number;
}

const initialState: FilterSliceState = {
    searchValue : '',
    categoryId: 0,
    sortId: {
        name: 'популярности',
        sort: 'rating'
    },
    currentPage: 1,
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSortId(state, action: PayloadAction<Sort>) {
            state.sortId = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage);
            state.sortId.sort = action.payload.sortId;
            state.categoryId = Number(action.payload.categoryId);
        },
    }
})

export const {setCategoryId, setSearchValue, setSortId, setCurrentPage, setFilters} = filterSlice.actions
export default filterSlice.reducer