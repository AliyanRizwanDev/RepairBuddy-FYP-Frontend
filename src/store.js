import {configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") || localStorage.getItem("vendor") || localStorage.getItem("vendor") || false  ,
    isAuthenticated: false
}
const userSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      LoggedIn(state, action) {
        state.user = action.payload;
        state.isAuthenticated = true;
      },
  
      LoggedOut(state, action) {
        state.user = {};
        state.isAuthenticated = false;
      },
    },
  });
  
  const store = configureStore({
    reducer: userSlice.reducer,
  });
  
  export const userActions = userSlice.actions;
  export default store;
