import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {ToastContainer, Zoom} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Root from "./pages/Root.js";
import HomePage from "./pages/HomePage.js";
import ErrorPage from "./pages/ErrorPage.js";
import SignupPage from "./pages/SignupPage.js";
import LoginPage from "./pages/LoginPage.js";
import React from "react";
import ProfileVerificationPage from "./pages/ProfileVerificationPage.js";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store.js";
import {getDictionary, getHomeStats, getRandomString, getSubmissions,} from "./redux/apiCalls/userCalls.js";
import PotdAdditionPage from "./pages/Lead/PotdAdditionPage.js";
import LeadPage from "./pages/Lead/LeadPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import AllLeadPage from "./pages/Lead/AllLeadPage.js";
import PotdStatusPage from "./pages/Lead/PotdStatusPage.js";
import SheetStatusPage from "./pages/Lead/SheetStatusPage.js";
import JuniorsStatusPage from "./pages/Lead/JuniorsStatusPage.js";

const App: React.FC = () => {

    //only logged in users have access to this page
    const PrivateRoute = ({children}: { children: JSX.Element }) => {
        const user = useSelector((state: RootState) => state.auth.isLoggedIn && state.auth.verified);
        return user ? children : <Navigate to="/login" replace/>;
    };

    //only non logged in users have access to this page
    const PublicOnlyRoute = ({children}: { children: JSX.Element }) => {
        const user = useSelector((state: RootState) => state.auth.isLoggedIn && state.auth.verified);
        return user ? <Navigate to="../" replace/> : children;
    };

    //only admins have access to this page
    const AdminOnlyRoute = ({children}: { children: JSX.Element }) => {
        const user = useSelector((state: RootState) => state.auth.isLoggedIn && state.auth.verified && state.auth.isLead);
        return user ? children : <Navigate to="../" replace/>;
    };

    const Dispatch = useDispatch();


    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "",
                    element: <HomePage/>,
                    loader: async () => {
                        return await getHomeStats()
                    }
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
                        return await getRandomString();
                    },
                    element: <PrivateRoute><ProfileVerificationPage/></PrivateRoute>,
                },
                {
                    path: "profile",
                    element: <PrivateRoute><ProfilePage/></PrivateRoute>,
                    loader: async () => {
                        await getDictionary(Dispatch);
                        const leetcode = await getSubmissions("leetcode", 1);
                        const codeforces = await getSubmissions("codeforces", 1);
                        const gfg = await getSubmissions("gfg", 1);
                        return {leetcode, gfg, codeforces};
                    },
                },
                {
                    path: "leadDashboard",
                    element: <AdminOnlyRoute><LeadPage/></AdminOnlyRoute>,
                    children: [
                        {
                            path: "addPotd",
                            element: <PotdAdditionPage/>,

                        }, {
                            path: "allLeads",
                            element: <AllLeadPage/>,
                        }, {
                            path: "potdStatus",
                            element: <PotdStatusPage/>
                        }, {
                            path: "sheetStatus",
                            element: <SheetStatusPage/>,
                        }, {
                            path: "juniorsStatus",
                            element: <JuniorsStatusPage/>,
                        }
                    ]
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
