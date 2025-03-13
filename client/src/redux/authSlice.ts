import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
    },
    reducers: {
        // yes there was no need for all variations of reducers that are basically making user null, but nvm
        resetAll: (state) => {
            state.user = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
        },
        loginFailed: (state) => {
            state.user = null;
        },
        logoutSuccess: (state) => {
            state.user = null;
        }
    },
});

export const {
    logoutSuccess,
    loginFailed,
    loginSuccess,
    resetAll,
} = authSlice.actions;
const userReducer = authSlice.reducer;
export default userReducer;
