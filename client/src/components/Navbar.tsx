import React, {Fragment} from "react";
import {Link, NavLink, useNavigate, useNavigation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../redux/apiCalls/userCalls.js";
import ACLogo from "../assets/images/logos/discord_emoji.png";
import {RootState} from "../redux/store.js";
import {PiCatLight} from "react-icons/pi";

const Navbar = () => {
    // TODO: Define a user type in global types.ts file
    const user = useSelector((state: RootState) => state.auth.user);
    // const user = false; // just temporarily for seeing how the user screen looks;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const progressStyle: React.CSSProperties & Record<string, string> = {
        "--progress-color": "#FACA15",
    };

    async function handleLogout() {
        await logoutUser(dispatch);
    }

    const underlineIfActive = ({isActive}) =>
        `${isActive ? "box-border transition-all border-black border-b-2" : ""}`;

    const links = (
        <>
            <NavLink to="" className={underlineIfActive}>
                Home
            </NavLink>
            {!user && (
                <NavLink to="/login" className={underlineIfActive}>
                    Login
                </NavLink>
            )}
            {!user && (
                <NavLink to="/signup" className={underlineIfActive}>
                    Signup
                </NavLink>
            )}
            {user && (
                <span onClick={handleLogout}>Logout</span>
            )}
        </>
    );

    return (
        <div className="sticky top-0 font-montserrat w-full bg-AC_Orange p-1 z-50">
            <div className="flex justify-between items-center">
                <div className="p-1 bg-black rounded-md h-12 w-12 flex justify-center items-center">
                    <img src={ACLogo} alt="AC Logo" className=""/>
                </div>
                <span className="flex gap-4">{links}</span>
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
