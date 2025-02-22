import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isFetching: false,
    errorMessage: null,
  },
  reducers: {
    startFetch: (state) => {
      state.isFetching = true;
      state.errorMessage = null;
    },
    resetExceptUser: (state) => {
      state.isFetching = false;
      state.errorMessage = false;
    },
    resetAll: (state) => {
      state.isFetching = false;
      state.user = null;
      state.errorMessage = null;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload.user;
    },
    loginFailed: (state, action) => {
      state.isFetching = false;
      state.user = null;
      state.errorMessage = action.payload;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.user = null;
    },
    logoutFailed: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    },
    clearAll: (state) => {
      state.user = null;
      state.isFetching = null;
      state.errorMessage = null;
    },
  },
});

export const {
  startFetch,
  logoutFailed,
  logoutSuccess,
  resetExceptUser,
  loginFailed,
  loginSuccess,
  resetAll,
  clearAll,
} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
