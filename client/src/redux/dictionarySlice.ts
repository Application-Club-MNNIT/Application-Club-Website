import {createSlice} from "@reduxjs/toolkit";

export const dictionarySlice = createSlice({
    name: "dictionary", initialState: {
        data: null
    }, reducers: {
        dictionaryUpdate: (state, action) => {
            state.data = action.payload;
        }
        , clearAll: (state) => {
            state.data = null;
        },
    },
});

export const {dictionaryUpdate, clearAll} = dictionarySlice.actions;
const dictionaryReducer = dictionarySlice.reducer;
export default dictionaryReducer;
