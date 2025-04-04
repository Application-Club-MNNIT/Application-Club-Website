import {backend} from "../../AxiosRequests/backendRequestAxios.js";
import {
    loginFailed,
    loginSuccess,
    logoutSuccess,
    otpVerified,
    resetAll,
    verifyPlatformFail,
    verifyPlatformSuccess
} from "../authSlice.js";
import {toast} from "react-toastify";
import to from "await-to-js";
import {Dispatch} from "@reduxjs/toolkit";
import ISignupResponse from "../../interfaces/ISignupResponse";
import {dictionaryUpdate} from "../dictionarySlice.js";
import {updateProfile} from "../userSlice.js";

export const login: (dispatch: Dispatch, body: any) => Promise<{
    status: boolean,
    message: string
}> = async (dispatch: Dispatch, body: any) => {

    //please notice: how a toast is being created. toast is that "popup". we are storing id as we will update it later
    const id = toast.loading("Logging you in");

    // api call
    //please notice: to(...) returns [err, res] containing error or response. if api call gives error, err has something otherwise res has something. simple. ?
    const [err, res]: [any, ISignupResponse] = await to(backend.post("/user/login", body));
    if (err) {
        dispatch(loginFailed());
        const message = err.response?.data?.message || err.response?.data || err.message || "Some error occurred please try again later";
        toast.update(id, {
            render: message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
        });
        return {status: false, message};
    } else {

        // TODO: user should probably be username, I'm not sure.
        // Must check again after authSlice is implemented
        dispatch(loginSuccess(res.data.user));
        toast.update(id, {
            render: "Login success!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });
    }
    return {status: true, message: "Login success!"};
};


export const getRandomString = async () => {
    const id = toast.loading("Generating verification strings...");

    const [err, res]: any[] = await to(backend.post("/user/getCodingPlatformVerificationString"));

    if (err) {
        const message = err.response?.data?.message || err.response?.data || err.message || "Some error occurred, please try again later";
        toast.update(id, {
            render: message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
        });
        return {status: false, message, unverifiedPlatforms: []};
    } else {
        const {randomString} = res.data;

        toast.update(id, {
            render: "Verification strings generated successfully!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });

        return {status: true, message: "Verification strings generated successfully!", randomString};
    }
};


export const verifyHandle: (
    dispatch: Dispatch,
    body: IPlatformVerifyData
) => Promise<{ status: boolean; message: string; verified: boolean }> = async (
    dispatch: Dispatch,
    body: IPlatformVerifyData
) => {
    const id = toast.loading("Verifying handle...");

    const [err, res]: [any, any] = await to(backend.post("/user/verifyCodingPlatform", body));

    if (err) {
        dispatch(verifyPlatformFail());
        const message =
            err.response?.data?.message || err.response?.data || err.message || "Verification failed. Please try again.";

        toast.update(id, {
            render: message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
        });

        return {status: false, message, verified: false};
    } else {
        dispatch(verifyPlatformSuccess({platform: body.platform, username: body.username}));

        toast.update(id, {
            render: "Handle verified successfully!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });

        return {status: true, message: "Handle verified successfully!", verified: true};
    }
};

export const isUsernameAvailable = async (username: string) => {
    let [err, res]: any[] = await to(backend.post("/user/isUsernameAvailable", {username}));
    if (err) {
        console.error("Error while checking username availability: ", err.response?.data?.message || err.response?.data || err.message);
        return false;
    } else {
        return res.data.available;
    }
}

export const signup = async (dispatch: Dispatch, formData: ISignUpFormData) => {
    // Performing data validation
    const id = toast.loading("Signing you in");
    if (!formData.username || !formData.name || !formData.email || !formData.phone || !formData.password) {
        toast.update(id, {
            render: "All fields are required!",
            type: "error",
            isLoading: false,
            autoClose: 2000,
        });
        return false;
    }

    dispatch(resetAll());
    const [err, response]: [any, ISignupResponse] = await to(
        backend.post("/user/signup", formData)
    );
    if (err || ((response.status / 100) | 0) !== 2) {
        const errorMessage =
            err.response?.data?.message ||
            err.response?.data ||
            "Some error occurred! please try again later.";
        toast.update(id, {
            render: errorMessage,
            type: "error",
            isLoading: false,
            autoClose: 2000,
        });
        return false;
    } else {
        dispatch(loginSuccess({...response.data.user, password: formData.password}));
        toast.update(id, {
            render: "Signup successful!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });
        return true;
    }
};

export const verifyOTP = async (dispatch: Dispatch<any>, formData: { email: string, otp: number }) => {
    // Performing data validation
    const id = toast.loading("Verifying OTP");
    if (!formData.email || !formData.otp) {
        toast.update(id, {
            render: "Invalid Email or OTP",
            type: "error",
            isLoading: false,
            autoClose: 5000,
        });
        return false;
    }

    const [err, response]: [any, ISignupResponse] = await to(
        backend.post("/user/verifyEmail", formData)
    );
    if (err || ((response.status / 100) | 0) !== 2) {
        const errorMessage =
            err.response?.data?.message ||
            err.response?.data ||
            "Some error occurred! Please try again later.";
        toast.update(id, {
            render: errorMessage,
            type: "error",
            isLoading: false,
            autoClose: 5000,
        });
        return false;
    } else {
        dispatch(otpVerified());
        toast.update(id, {
            render: "Signup successful!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
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
        return {status: true, message: "Logged out successfully!"};
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.response?.data || err.message || "Some error occurred please try again later";
        dispatch(loginFailed(errorMessage));
        toast.update(id, {
            render: errorMessage,
            type: "error",
            isLoading: false,
            autoClose: 0,
        });
        return {status: true, message: errorMessage};
    }
};

export const getDictionary = async (dispatch: Dispatch) => {
    const response = await backend.get("/user/getDictionary");
    dispatch(dictionaryUpdate(response.data["dictionary"]));
    return {status: true, message: "Dictionary retrieved!", dictionary: response.data["dictionary"]};
}
//
// export const getProfileData = async (dispatch: Dispatch) => {
//     const response = await backend.post("/user/getProfileData");
//     dispatch(updateProfile(response.data["user"]));
//     return {status: true, message: "Profile retrieved!", profileData: response.data["user"]};
//
// }

export const getSubmissions = async (platform: string, page: number) => {
    const response = await backend.get(`/user/getSubmissions/${platform}?page=${page || 1}`);
    return response.data.data;
}