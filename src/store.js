import { configureStore, createSlice } from "@reduxjs/toolkit";

let savedUser = null;
try {
  savedUser =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("vendor")) ||
    JSON.parse(localStorage.getItem("admin"));
} catch (e) {
  savedUser = null;
}

const initialState = {
  user: savedUser || null,
  isAuthenticated: !!savedUser,
};
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
