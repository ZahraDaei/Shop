import { createSlice } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        shoppingCartProducts: [],
        total: 0,
        user: null,
        counts: 0,
        selectedAddress:null
    },
    reducers: {
        addShoppingCart: (state, action) => {
            var index = state.shoppingCartProducts?.findIndex(
                (i) => i.id === action.payload.id
            );
            if (index !== -1) {
                state.shoppingCartProducts[index]["number"] =
                    state.shoppingCartProducts[index]["number"] + 1;
            } else {
                state.counts++;
                var addedProduct = {
                    id: action.payload.id,
                    number: 1,
                    product: action.payload,
                };
                state.shoppingCartProducts.push(addedProduct);
            }
            state.total = state.total + action.payload["price"];
        },
        removeShoppingCart: (state, action) => {
            var index = state.shoppingCartProducts?.findIndex(
                (i) => i.id === action.payload.id
            );
            if (index !== -1) {
                var num = state.shoppingCartProducts[index]["number"] - 1;
                if (num === 0) {
                state.counts--;
                    if (state.shoppingCartProducts.length === 1) state.shoppingCartProducts = []
                    state.shoppingCartProducts = state.shoppingCartProducts.filter(
                        (i) => i.id !== action.payload.id
                    );
                } else {
                    state.shoppingCartProducts[index]["number"] = num;
                }
            }
            state.total = state.total - action.payload["price"];
        },
        addUser: (state, action) => {
            state.user = action.payload
        },
        optShippingAddress: (state, action) => {
            state.selectedAddress = action.payload
        }
    },
});

export const { addShoppingCart, removeShoppingCart, addUser, optShippingAddress } =
    shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;

export const selectShoppingCartProducts = (state) =>
    state.shoppingCart.shoppingCartProducts;

export const selectCounts = (state) =>
    state.shoppingCart.counts;

export const selectTotal = (state) =>
    state.shoppingCart.total;

export const selectUser = (state) =>
    state.shoppingCart.user;

export const selectShippingAddress = (state) =>
    state.shoppingCart.selectedAddress