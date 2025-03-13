import { backend } from "../../AxiosRequests/backendRequestAxios.js";
import {
    loginFailed,
    loginSuccess,
    logoutSuccess,
    resetAll,
} from "../authSlice.js";
import { toast } from "react-toastify";
import to from "await-to-js";
import { Dispatch } from "@reduxjs/toolkit";

export const login: (dispatch: Dispatch, body: any) => Promise<{
    status: boolean,
    message: string
}> = async (dispatch: Dispatch, body: any) => {

    //please notice: how a toast is being created. toast is that "popup". we are storing id as we will update it later
    const id = toast.loading("Logging you in");

    // api call
    //please notice: to(...) returns [err, res] containing error or response. if api call gives error, err has something otherwise res has something. simple. ?
    const [err, res]: any[] = await to(backend.post("/user/login", body));
    if (err) {
        dispatch(loginFailed());
        const message = err.response?.data?.message || err.response?.data || err.message || "Some error occurred please try again later";
        toast.update(id, {
            render: message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
        });
        return { status: false, message };
    } else {
        // please notice: how dispatch is being used
        // update state if login successfully
        dispatch(loginSuccess({ user: res.data.user }));
        toast.update(id, {
            render: "Login success!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });
    }
    return { status: true, message: "Login success!" };
};

export const isUsernameAvailable = async (username: string) => {
    let [err, res]: any[] = await to(backend.post("/user/isUsernameAvailable", { username }));
    if (err) {
        console.error("Error while checking username availability: ", err.response?.data?.message || err.response?.data || err.message);
        return false;
    } else {
        return res.data.available;
    }
}

//please notice: below is code i copied from previous projects, make appropriate changes. good luck
export const signup = async (dispatch, formData) => {
    dispatch(resetAll());
    dispatch(startFetch());
    const id = toast.loading("Signing you in");
    // Making it any[] for now , might have to change it later
    const [err, response]: any[] = await to(
        backend.post("/user/signup", formData)
    );
    if (err || ((response.status / 100) | 0) !== 2) {
        const errorMessage =
            err.response?.data?.message ||
            err.response.data ||
            "Some error occurred! please try again later.";
        toast.update(id, {
            render: errorMessage,
            type: "error",
            isLoading: false,
            autoClose: 0,
        });
        return false;
    } else {
        dispatch(loginSuccess({ user: response.data.user }));
        toast.update(id, {
            render: "Signup successful!",
            type: "success",
            isLoading: false,
            autoClose: 1000,
        });
        return true;
    }
};

export const logoutUser = async (dispatch: Dispatch) => {
    const id = toast.loading("Logging out!");
    try {
        const response = await backend.post("/user/logout");
        if (((response.status / 100) | 0) !== 2) throw new Error();
        dispatch(logoutSuccess());
        toast.update(id, {
            render: "Logged out successfully!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });
        return { status: true, message: "Logged out successfully!" };
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.response?.data || err.message || "Some error occurred please try again later";
        dispatch(loginFailed(errorMessage));
        toast.update(id, {
            render: errorMessage,
            type: "error",
            isLoading: false,
            autoClose: 0,
        });
        return { status: true, message: errorMessage };
    }
};
