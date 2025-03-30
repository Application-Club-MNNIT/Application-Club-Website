import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {ToastContainer, Zoom} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Root from "./pages/Root.js";
import LandingPage from "./pages/LandingPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import SignupPage from "./pages/SignupPage.js";
import LoginPage from "./pages/LoginPage.js";
import React from "react";
import ProfileVerificationPage from "./pages/ProfileVerificationPage.js";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store.js";
import {getRandomString} from "./redux/apiCalls/userCalls.js";
import PotdAdditionPage from "./pages/admin/PotdAdditionPage.js";

const App: React.FC = () => {

    const PrivateRoute = ({children}: { children: JSX.Element }) => {
        const user = useSelector((state: RootState) => state.auth.isLoggedIn && state.auth.verified);
        return user ? children : <Navigate to="/login" replace/>;
    };

    const PublicOnlyRoute = ({children}: { children: JSX.Element }) => {
        const user = useSelector((state: RootState) => state.auth.isLoggedIn && state.auth.verified);
        return user ? <Navigate to="../" replace/> : children;
    };

    const AdminOnlyRoute = ({children}: { children: JSX.Element }) => {
        const user = useSelector((state: RootState) => state.auth.isLoggedIn && state.auth.verified && state.auth.isLead);
        return user ? children : <Navigate to="../" replace/>;
    };


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
                    element: <PublicOnlyRoute><SignupPage/></PublicOnlyRoute>,
                },
                {
                    path: "login",
                    element: <PublicOnlyRoute><LoginPage/></PublicOnlyRoute>,
                },
                {
                    path: "profileVerification",
                    loader: async () => {
                        const {randomString} = await getRandomString();
                        return {randomName: randomString || "randomstring"};
                    },
                    element: <ProfileVerificationPage/>,
                },
                {
                    path: "addPotd",
                    element: <AdminOnlyRoute><PotdAdditionPage/></AdminOnlyRoute>
                }
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
