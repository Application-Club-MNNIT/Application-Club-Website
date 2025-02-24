import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ToastContainer, Zoom} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Root from "./pages/Root.js";
import LandingPage from "./pages/LandingPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import SignupPage from "./pages/SignupPage.js";
import LoginPage from "./pages/LoginPage.js";
import React from "react";
import OTPVerification from "./pages/OTPVerification.js";
import ProfileVerificationPage from "./pages/ProfileVerificationPage.js";

const App: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "",
                    element: <LandingPage/>,
                },
                {
                    path: "signup",
                    element: <SignupPage/>,
                },
                {
                    path: "login",
                    element: <LoginPage/>,
                },
                {
                    path: "verify",
                    element: <OTPVerification/>,
                },
                {
                    path: "profileVerification",
                    element: <ProfileVerificationPage/>,
                },
            ],
        },
    ]);

    return (
        <div>
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    closeOnClick={true}
                    transition={Zoom}
                    draggable={true}
                />
                <RouterProvider router={router}/>
            </div>
        </div>
    );
};

export default App;
