import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type CartItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    testo: string,
    size: number,
    count: number,
}

interface CartSliceState {
    totalPrice: number;
    pizzas: CartItem[];
}

const initialState: CartSliceState = {
    totalPrice: 0,
    pizzas: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzas(state, action: PayloadAction<CartItem>) {
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
        minusPizza(state, action: PayloadAction<string>) {
            const findItem = state.pizzas.find(obj => obj.id === action.payload);

            if (findItem) {
                findItem.count--;
            }
        },
        remotePizzas(state, action: PayloadAction<string>) {
            state.pizzas = state.pizzas.filter(obj => obj.id !== action.payload);
        },
        clearPizzas(state) {
            state.pizzas = [];
            state.totalPrice = 0;
        },
    }
})
export const selectCart = (state: RootState) => state.cart;
export const selectCartById = (id: string) => (state: RootState) => state.cart.pizzas.find(obj => obj.id === id);

export const {addPizzas, minusPizza, remotePizzas, clearPizzas} = cartSlice.actions

export default cartSlice.reducer