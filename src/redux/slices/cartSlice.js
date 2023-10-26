import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    pizzas: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzas(state, action) {
            const findItem = state.pizzas.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.pizzas.push({
                    ...action.payload,
                    count: 1
                });
            }

            state.totalPrice = state.pizzas.reduce((sum, obj) => {
                return sum + obj.price * obj.count;
            }, 0);
        },
        minusPizza(state, action) {
            const findItem = state.pizzas.find(obj => obj.id === action.payload);

            if (findItem) {
                findItem.count--;
            }
        },
        remotePizzas(state, action) {
            state.pizzas = state.pizzas.filter(obj => obj.id !== action.payload);
        },
        clearPizzas(state) {
            state.pizzas = [];
            state.totalPrice = 0;
        },
    }
})

export const {addPizzas, minusPizza, remotePizzas, clearPizzas} = cartSlice.actions
export default cartSlice.reducer