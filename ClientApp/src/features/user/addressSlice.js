import { createSlice } from "@reduxjs/toolkit";
import {addresses} from "../data";
export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
  },
  reducers: {
    addAddress: (state, action) => {},
    removeAddress: (state, action) => {},
    editAddress: (state, action) => {},
    getAddress:(state,action)=>{},
  },
});

export const { addAddress, removeAddress, editAddress } = addressSlice.actions;

export default addressSlice.reducer;

export const selectAddresses = (state) => state.address.addresses;
