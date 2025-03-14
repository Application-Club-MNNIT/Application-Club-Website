import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        username: null,
        name: null,
        phone: null,
        email: null,
        regNumber: null,
        branch: null,
        batch: null,
        leetcode: {
            username :null,
            verified: false,
            lastSubmissionTimestamp: 0,
            lastRequestTimestamp: 0,
            submissions: [],
        },
        gfg: {
            username:null,
            verified: false,
            lastSubmissionTimestamp: 0,
            lastRequestTimestamp: 0,
            submissions: []
        },
        codeforces: {
            username:null,
            verified: false,
            lastSubmissionTimestamp: 0,
            lastRequestTimestamp: 0,
            submissions: []
        },
        github: {
            username:null,
            verified: false
        },
        verified: false,
        _id: null,
        createdAt: null,
        updatedAt: null,
    } as IAuthState,
    reducers: {
        // yes there was no need for all variations of reducers that are basically making user null, but nvm
        resetAll: (state) => {
            state.isLoggedIn = false;
            state.username = null;
            state.name = null;
            state.phone = null;
            state.email = null;
            state.regNumber = null;
            state.branch = null;
            state.batch = null;
            state.leetcode = {
                username:null,
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.gfg = {
                username:null,
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.codeforces = {
                username:null,
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.github = {
                username:null,
                verified: false
            };
            state.verified = false;
            state._id = null;
            state.createdAt = null;
            state.updatedAt = null;
        },
        loginSuccess: (state, action: { payload: IAuthState }) => {
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.regNumber = action.payload.regNumber;
            state.branch = action.payload.branch;
            state.batch = action.payload.batch;
            state.leetcode = action.payload.leetcode;
            state.gfg = action.payload.gfg;
            state.codeforces = action.payload.codeforces;
            state.github = action.payload.github;
            state.verified = action.payload.verified;
            state._id = action.payload._id;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
        },
        loginFailed: (state) => {
            state.username = null;
            state.name = null;
            state.phone = null;
            state.email = null;
            state.regNumber = null;
            state.branch = null;
            state.batch = null;
            state.leetcode = {
                username:null,
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.gfg = {
                username:null,
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.codeforces = {
                username:null,
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.github = {
                username:null,
                verified: false
            };
            state.verified = false;
            state._id = null;
            state.createdAt = null;
            state.updatedAt = null;
        },
        logoutSuccess: (state) => {
            state.username = null;
            state.name = null;
            state.phone = null;
            state.email = null;
            state.regNumber = null;
            state.branch = null;
            state.batch = null;
            state.leetcode = {
                username:null,
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.gfg = {
                username:null,
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.codeforces = {
                username:null,
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.github = {
                username:null,
                verified: false
            };
            state.verified = false;
            state._id = null;
            state.createdAt = null;
            state.updatedAt = null;
        },
        otpVerified: (state) => {
            state.verified = true;
            state.isLoggedIn = true;
        },
        verifyPlatformSuccess: (state, action: { payload: IPlatformVerifyData }) => {
            state[action.payload.platform].verified=true;
            state[action.payload.platform].username=action.payload.username;
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
const userReducer = authSlice.reducer;
export default userReducer;
