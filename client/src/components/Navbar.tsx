import React, {Fragment} from "react";
import {NavLink, useNavigate, useNavigation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../redux/apiCalls/userCalls.js";
import ACLogo from "../assets/images/logos/discord_emoji.png";
import {RootState} from "../redux/store.js";

const Navbar = () => {
    const user = useSelector((state: RootState) => state.auth.isLoggedIn && state.auth.verified);
    const isAdmin = useSelector((state: RootState) => state.auth.isLoggedIn && state.auth.verified && state.auth.isLead);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const progressStyle: React.CSSProperties & Record<string, string> = {
        "--progress-color": "#FACA15",
    };

    async function handleLogout() {
        await logoutUser(dispatch);
        navigate("/"); // Redirect to Home after logout
    }

    const underlineIfActive = ({isActive}) =>
        `cursor-pointer ${isActive ? "box-border transition-all border-b-2 border-white" : ""}`;

    const links = (
        <>
            <NavLink to="" className={underlineIfActive}>
                Home
            </NavLink>

            {/* Public Routes */}
            <NavLink to="/leaderboard" className={underlineIfActive}>
                Leaderboard
            </NavLink>
            <NavLink to="/opcLeaderboard" className={underlineIfActive}>
                OPC Leaderboard
            </NavLink>

            {/* Auth Routes */}
            {!user && (
                <>
                    <NavLink to="/login" className={underlineIfActive}>
                        Login
                    </NavLink>
                    <NavLink to="/signup" className={underlineIfActive}>
                        Signup
                    </NavLink>
                </>
            )}

            {/* Private Routes (Logged in users) */}
            {user && (
                <>
                    <NavLink to="/profile" className={underlineIfActive}>
                        Profile
                    </NavLink>
                    <NavLink to="/seniors" className={underlineIfActive}>
                        Seniors
                    </NavLink>
                    <NavLink to="/addPaper" className={underlineIfActive}>
                        Add Paper
                    </NavLink>
                    <NavLink to="/listPapers" className={underlineIfActive}>
                        View Papers
                    </NavLink>
                </>
            )}

            {/* Admin Only Routes */}
            {isAdmin && (
                <div className="relative group">
                    <span className="cursor-pointer">Admin</span>
                    <div
                        className="absolute hidden group-hover:block right-0 mt-2 py-2 w-48 bg-neutral-800 rounded-lg shadow-xl">
                        <NavLink to="/leadDashboard/addPotd" className="block px-4 py-2 hover:bg-neutral-700">
                            Add POTD
                        </NavLink>
                        <NavLink to="/leadDashboard/allLeads" className="block px-4 py-2 hover:bg-neutral-700">
                            All Leads
                        </NavLink>
                        <NavLink to="/leadDashboard/potdStatus" className="block px-4 py-2 hover:bg-neutral-700">
                            POTD Status
                        </NavLink>
                        <NavLink to="/leadDashboard/sheetStatus" className="block px-4 py-2 hover:bg-neutral-700">
                            Sheet Status
                        </NavLink>
                        <NavLink to="/leadDashboard/juniorsStatus" className="block px-4 py-2 hover:bg-neutral-700">
                            Juniors Status
                        </NavLink>
                        <NavLink to="/leadDashboard/addSeniorInterview"
                                 className="block px-4 py-2 hover:bg-neutral-700">
                            Add Senior Interview
                        </NavLink>
                        <NavLink to="/leadDashboard/teachersDashboard" className="block px-4 py-2 hover:bg-neutral-700">
                            Manage Teachers
                        </NavLink>
                        <NavLink to="/leadDashboard/subjectDashboard" className="block px-4 py-2 hover:bg-neutral-700">
                            Manage Subjects
                        </NavLink>
                        <NavLink to="/leadDashboard/adminPapersPage" className="block px-4 py-2 hover:bg-neutral-700">
                            Manage Papers
                        </NavLink>
                    </div>
                </div>
            )}

            {/* Logout for logged in users */}
            {user && (
                <span onClick={handleLogout} className="cursor-pointer">
                    Logout
                </span>
            )}
        </>
    );

    return (
        <div className="sticky top-0 font-montserrat w-full bg-black text-white p-1 z-50">
            <div className="flex justify-between items-center">
                <div className="p-1 bg-black rounded-md h-12 w-12 flex justify-center items-center">
                    <img src={ACLogo} alt="AC Logo" className=""/>
                </div>
                <span className="flex items-center gap-6">{links}</span>
            </div>

            {/* keep the component below as it is, it is a loading bar that is activated whenever page is under navigation */}
            <div className="h-1 w-full relative">
                {navigation.state === "loading" ? (
                    <progress
                        className="progress progress-primary absolute h-[5px] border-b-2 border-black bg-stone-700"
                        style={progressStyle}
                    ></progress>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Navbar;
