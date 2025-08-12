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
import {
    getDictionary,
    getHomeStats,
    getRandomString,
    getSheetPotdDaysData,
    getSubmissions,
} from "./redux/apiCalls/userCalls.js";
import LeaderBoard from "./pages/LeaderBoard.js";
import OPCLeaderboard from "./pages/OpcLeaderBoard.js";
import PotdAdditionPage from "./pages/Lead/PotdAdditionPage.js";
import LeadPage from "./pages/Lead/LeadPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import AllLeadPage from "./pages/Lead/AllLeadPage.js";
import PotdStatusPage from "./pages/Lead/PotdStatusPage.js";
import SheetStatusPage from "./pages/Lead/SheetStatusPage.js";
import JuniorsStatusPage from "./pages/Lead/JuniorsStatusPage.js";
import SeniorsPage from "./pages/SeniorsPage.js";
import SeniorPage from "./pages/SeniorPage.js";
import AddSeniorForm from "./test/AddSenior.js";
import TeacherDashboard from "./pages/TeacherDashboard.js";
import SubjectDashboard from "./pages/SubjectDashboard.js";
import AddPaperPage from "./pages/AddPaperPage.js";
import PapersListPage from "./pages/PapersListPage.js";
import AdminPapersPage from "./pages/AdminPapersPage.js";

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
                        const sheetPotdDaysData = await getSheetPotdDaysData()
                        return {leetcode, gfg, codeforces, sheetPotdDaysData};
                    },
                },
                {
                    path: "leadDashboard",
                    element: <AdminOnlyRoute><LeadPage/></AdminOnlyRoute>,
                    children: [
                        {
                            path: "addPotd",
                            element: <PotdAdditionPage/>,

                        },
                        {
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
                        },
                        {
                            path: "addSeniorInterview",
                            element: <AddSeniorForm/>,
                        },
                        {
                            path: "teachersDashboard",
                            element: <TeacherDashboard/>
                        },
                        {
                            path: "subjectDashboard",
                            element: <SubjectDashboard/>
                        },
                        {
                            path: "adminPapersPage",
                            element: <AdminPapersPage/>
                        }
                    ]
                },
                {
                    path: "seniors",
                    element: <SeniorsPage/>,
                },
                {
                    path: "seniors/:id",
                    element: <PrivateRoute><SeniorPage/></PrivateRoute>,
                },
                {
                    path: "leaderboard",
                    element: <LeaderBoard/>,
                },
                {
                    path: "opcLeaderboard",
                    element: <OPCLeaderboard/>,
                },
                {
                    path: "addPaper",
                    element: <PrivateRoute><AddPaperPage/></PrivateRoute>
                },
                {
                    path: "listPapers",
                    element: <PrivateRoute><PapersListPage/></PrivateRoute>
                }
            ],
        },
    ]);

    return (
        <div>
            <div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    closeOnClick={true}
                    transition={Zoom}
                    draggable={true}
                    theme="dark"
                    toastClassName="font-mono bg-neutral-900 text-white"
                    style={{fontSize: '14px'}}
                    progressClassName="bg-teal-500"
                    bodyClassName="text-white"
                />
                <RouterProvider router={router}/>
            </div>
        </div>
    );
};

export default App;
