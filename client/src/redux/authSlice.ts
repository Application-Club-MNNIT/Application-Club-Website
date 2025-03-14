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
        },
        verifySuccess: (state, action) => {
            const { platform,username } = action.payload; 
            if (state.user && state.user[platform]) {
                state.user[platform].verified = true;
                state.user[platform].username=username;
            }
        },
        verifyFail: (state, action) => {
            const { platform } = action.payload; 
            if (state.user && state.user[platform]) {
                state.user[platform].verified = false;
            }
        }
    },
});

export const {
    logoutSuccess,
    loginFailed,
    loginSuccess,
    resetAll,
    verifyFail,
    verifySuccess
} = authSlice.actions;
const userReducer = authSlice.reducer;
export default userReducer;
