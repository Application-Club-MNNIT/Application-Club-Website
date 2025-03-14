import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        username: null,
        name: null,
        phone: null,
        email: null,
        regNumber: null,
        branch: null,
        batch: null,
        leetcode: {
            verified: false,
            lastSubmissionTimestamp: 0,
            lastRequestTimestamp: 0,
            submissions: []
        },
        gfg: {
            verified: false,
            lastSubmissionTimestamp: 0,
            lastRequestTimestamp: 0,
            submissions: []
        },
        codeforces: {
            verified: false,
            lastSubmissionTimestamp: 0,
            lastRequestTimestamp: 0,
            submissions: []
        },
        github: {
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
            state.username = null;
            state.name = null;
            state.phone = null;
            state.email = null;
            state.regNumber = null;
            state.branch = null;
            state.batch = null;
            state.leetcode = {
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.gfg = {
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.codeforces = {
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.github = {
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
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.gfg = {
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.codeforces = {
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.github = {
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
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.gfg = {
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.codeforces = {
                verified: false,
                lastSubmissionTimestamp: 0,
                lastRequestTimestamp: 0,
                submissions: []
            };
            state.github = {
                verified: false
            };
            state.verified = false;
            state._id = null;
            state.createdAt = null;
            state.updatedAt = null;
        },
        otpVerified: (state) => {
            state.verified = true;
        },
        verifySuccess: (state, action) => {
            const { platform, username } = action.payload;
            if (state.username && state.verified && state[platform]) {
                state[platform].verified = true;
                state[platform].username = username;
            }
        },
        verifyFail: (state, action) => {
            const { platform } = action.payload;
            if (state.username && state.verified && state[platform]) {
                state[platform].verified = false;
            }
        }
    },
});

export const {
    logoutSuccess,
    loginFailed,
    loginSuccess,
    resetAll,
    otpVerified,
    verifyFail,
    verifySuccess,
} = authSlice.actions;
const userReducer = authSlice.reducer;
export default userReducer;
