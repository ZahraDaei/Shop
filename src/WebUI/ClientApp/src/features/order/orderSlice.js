import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: [],
   
    },
    reducers: {
        createOrder: (state, action) => {
         
        },
        deleteOrder: (state, action) => {
            
        }
    },
});

export const { createOrder, deleteOrder } =
    orderSlice.actions;

export default orderSlice.reducer;

export const selectOrderProducts = (state) =>
    state.order.orderProducts;

export const selectCounts = (state) =>
    state.order.counts;

export const selectTotal = (state) =>
    state.order.total;

export const selectUser = (state) =>
    state.order.user;

