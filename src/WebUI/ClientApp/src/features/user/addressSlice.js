import { createSlice } from "@reduxjs/toolkit";
export const addressSlice = createSlice({
    name: "address",
    initialState: {
        addressList: [],
    },
    reducers: {
        addAddress: (state, action) => { },
        removeAddress: (state, action) => { },
        editAddress: (state, action) => { },
        getAddress: (state, action) => { },

        getAddressList: (state, action) => {

            state.addressList = action.payload
        }
    },
});

export const { addAddress, removeAddress, editAddress, getAddressList } = addressSlice.actions;

export default addressSlice.reducer;

export const selectAddresses = (state) => state.address.addressList;
