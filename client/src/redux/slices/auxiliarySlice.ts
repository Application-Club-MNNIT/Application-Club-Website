//this is being used as a way to save things to local storage

import {createSlice} from "@reduxjs/toolkit";

export const auxiliarySlice = createSlice({
    name: "auxiliary", initialState: {
        loginRedirect: null,
    }, reducers: {
        setLoginRedirect: (state, action) => {
            state.loginRedirect = action.payload;
        }, clearAll: (state) => {
            state.loginRedirect = null;
        },
    },
});

export const {setLoginRedirect} = auxiliarySlice.actions;
const auxiliaryReducer = auxiliarySlice.reducer;
export default auxiliaryReducer;
