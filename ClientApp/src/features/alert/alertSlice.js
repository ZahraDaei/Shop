import { createSlice } from '@reduxjs/toolkit'


export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        alertObj: {
            variant: null,
            message: null
        }
    },
    reducers: {
        showAlert: (state, action) => {
            state.alertObj = { variant: action.payload.variant, message: action.payload.message }
        },
        hideAlert: (state) => {
            state.alertObj = { variant: null, message: null }
        },

    }
})

export const { showAlert, hideAlert } = alertSlice.actions

export default alertSlice.reducer



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectAlert = state => state.alert.alertObj;