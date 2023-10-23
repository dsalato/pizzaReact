import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortId(state, action) {
            state.sortId = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.sortId.sort = action.payload.sortId;
            state.categoryId = Number(action.payload.categoryId);
        },
    }
})

export const {setCategoryId, setSortId, setCurrentPage, setFilters} = filterSlice.actions
export default filterSlice.reducer