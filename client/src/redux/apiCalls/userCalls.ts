//example code, please change this accordingly

import { backend } from "../../AxiosRequests/backendRequestAxios.js";
import {
  loginFailed,
  loginSuccess,
  logoutSuccess,
  resetAll,
  startFetch,
} from "../slices/userSlice.js";
import { toast } from "react-toastify";
import to from "await-to-js";

export const loginUser = async (dispatch, body) => {
  dispatch(resetAll());
  dispatch(startFetch());
  const id = toast.loading("Logging you in");
  try {
    // api call
    // Doing it any for now, might have to change it later to make it more strict
    const [err, res]: any[] = await to(backend.post("/user/login", body));
    if (err) {
      toast.update(id, {
        render: `${
          err.response.data.message ||
          err.response.data ||
          "Some error occurred please try again later"
        }`,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return false;
    } else {
      // update state if login successfully
      dispatch(loginSuccess({ user: res.data.data.user }));
      toast.update(id, {
        render: "Login success!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    }
    return true;
  } catch (error) {
    dispatch(loginFailed(error?.response?.data?.message));
    toast.update(id, {
      render: error?.response?.data?.message,
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
    return false;
  }
};

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
    console.log(response);
    console.log(response.data.data.user);
    dispatch(loginSuccess({ user: response.data.data.user }));
    toast.update(id, {
      render: "Signup successful!",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    return true;
  }
};

export const logoutUser = async (dispatch) => {
  dispatch(startFetch());
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
    return true;
  } catch (e) {
    const errorMessage =
      e.response?.data?.message ||
      "Some error occurred! please try again later.";
    dispatch(loginFailed(errorMessage));
    toast.update(id, {
      render: errorMessage,
      type: "error",
      isLoading: false,
      autoClose: 0,
    });
    return false;
  }
};
