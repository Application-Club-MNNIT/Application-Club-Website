import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        username: null,
        isLead: false,
        name: null,
        phone: null,
        email: null,
        regNumber: null,
        branch: null,
        batch: null,
        password: null, // password is stored temporarily in state, will be removed after otp verification
        verified: false,
        _id: null,
        createdAt: null,
        updatedAt: null,
    } as IAuthState,
    reducers: {
        resetAll: (state) => {
            state.isLoggedIn = false;
            state.username = null;
            state.isLead = false;
            state.name = null;
            state.phone = null;
            state.email = null;
            state.regNumber = null;
            state.branch = null;
            state.batch = null;
            state.verified = false;
            state._id = null;
            state.createdAt = null;
            state.updatedAt = null;
        },
        loginSuccess: (state, action: { payload: IAuthState }) => {
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.isLead = action.payload.isLead;
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.regNumber = action.payload.regNumber;
            state.branch = action.payload.branch;
            state.batch = action.payload.batch;
            state.verified = action.payload.verified;
            state._id = action.payload._id;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
            // FIX: it will save password for login also, handle that
            state.password = action.payload.password;
        },
        loginFailed: (state) => {
            state.isLoggedIn = false;
            state.username = null;
            state.isLead = false;
            state.name = null;
            state.phone = null;
            state.email = null;
            state.regNumber = null;
            state.branch = null;
            state.batch = null;
            state.password = null;
            state.verified = false;
            state._id = null;
            state.createdAt = null;
            state.updatedAt = null;
        },
        logoutSuccess: (state) => {
            state.isLoggedIn = false;
            state.username = null;
            state.isLead = false;
            state.name = null;
            state.phone = null;
            state.email = null;
            state.regNumber = null;
            state.branch = null;
            state.batch = null;
            state.password = null;
            state.verified = false;
            state._id = null;
            state.createdAt = null;
            state.updatedAt = null;
        },
        otpVerified: (state) => {
            state.verified = true;
            state.isLoggedIn = true;
            state.password = null;
        },
        verifyPlatformSuccess: (state, action: { payload: IPlatformVerifyData }) => {
            state[action.payload.platform].verified = true;
            state[action.payload.platform].username = action.payload.username;
        },
        verifyPlatformFail: (state) => {

        }
    },
});

export const {
    logoutSuccess,
    loginFailed,
    loginSuccess,
    resetAll,
    otpVerified,
    verifyPlatformFail,
    verifyPlatformSuccess,
} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
