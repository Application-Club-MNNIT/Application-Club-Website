import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IUserState = {
    username: "",
    name: "",
    email: "",
    regNumber: "",
    branch: "",
    batch: 0,
    phone: 0,
    leetcode: {
        username: "",
        submissions: [],
        verified: false,
        lastSubmissionTimestamp: undefined,
        lastRequestTimestamp: undefined,
    },
    gfg: {
        username: "",
        submissions: [],
        verified: false,
        lastSubmissionTimestamp: undefined,
        lastRequestTimestamp: undefined,
    },
    codeforces: {
        username: "",
        submissions: [],
        verified: false,
        lastSubmissionTimestamp: undefined,
        lastRequestTimestamp: undefined,
    },
    github: {
        username: "",
        verified: false,
        randomName: undefined,
    },
    past14Days: [],
    sheets: [],
    potds: {
        status: "",
        sumOfTime: 0,
        count: 0,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<IUserState>) => {
            return {...state, ...action.payload};
        },
    },
});

export const {updateProfile} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
