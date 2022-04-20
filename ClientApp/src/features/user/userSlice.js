import { createSlice } from "@reduxjs/toolkit";
import {user} from "../data";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    getUser: (state, action) => {},
    editUser: (state, action) => {},
    removeUser: (state, action) => {},
    addUser: (state, action) => {},
  },
});

export const { editUser, addUser, removeUser ,getUser} = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => state.user.user;
