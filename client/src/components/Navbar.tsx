import React, { useState } from "react";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/apiCalls/userCalls.js";
import ACLogo from "../assets/images/logos/discord_emoji.png";
import { RootState } from "../redux/store.js";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const user = useSelector(
    (state: RootState) => state.auth.isLoggedIn && state.auth.verified
  );
  const isAdmin = useSelector(
    (state: RootState) =>
      state.auth.isLoggedIn && state.auth.verified && state.auth.isLead
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const progressStyle: React.CSSProperties & Record<string, string> = {
    "--progress-color": "#FACA15",
  };

  async function handleLogout() {
    await logoutUser(dispatch);
    navigate("/"); // Redirect to Home after logout
    setMenuOpen(false);
  }

  const underlineIfActive = ({ isActive }: { isActive: boolean }) =>
    `cursor-pointer block py-2 md:py-0 ${
      isActive ? "border-b-2 border-white" : ""
    }`;

  const links = (
    <>
      <NavLink
        to="/"
        className={underlineIfActive}
        onClick={() => setMenuOpen(false)}
      >
        Home
      </NavLink>

      {/* Public Routes */}
      <NavLink
        to="/leaderboard"
        className={underlineIfActive}
        onClick={() => setMenuOpen(false)}
      >
        Leaderboard
      </NavLink>
      <NavLink
        to="/opcLeaderboard"
        className={underlineIfActive}
        onClick={() => setMenuOpen(false)}
      >
        OPC Leaderboard
      </NavLink>

      {/* Auth Routes */}
      {!user && (
        <>
          <NavLink
            to="/login"
            className={underlineIfActive}
            onClick={() => setMenuOpen(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={underlineIfActive}
            onClick={() => setMenuOpen(false)}
          >
            Signup
          </NavLink>
        </>
      )}

      {/* Private Routes */}
      {user && (
        <>
          <NavLink
            to="/profile"
            className={underlineIfActive}
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </NavLink>
          <NavLink
            to="/seniors"
            className={underlineIfActive}
            onClick={() => setMenuOpen(false)}
          >
            Seniors
          </NavLink>
          <NavLink
            to="/addPaper"
            className={underlineIfActive}
            onClick={() => setMenuOpen(false)}
          >
            Add Paper
          </NavLink>
          <NavLink
            to="/listPapers"
            className={underlineIfActive}
            onClick={() => setMenuOpen(false)}
          >
            View Papers
          </NavLink>
        </>
      )}

      {/* Admin Only Routes */}
      {isAdmin && (
        <div className="relative group">
          <span className="cursor-pointer block py-2 md:py-0">Admin</span>
          <div className="md:absolute hidden md:group-hover:block right-0 mt-2 py-2 w-48 bg-neutral-800 rounded-lg shadow-xl">
            <NavLink
              to="/leadDashboard/addPotd"
              className="block px-4 py-2 hover:bg-neutral-700"
            >
              Add POTD
            </NavLink>
            <NavLink
              to="/leadDashboard/allLeads"
              className="block px-4 py-2 hover:bg-neutral-700"
            >
              All Leads
            </NavLink>
            <NavLink
              to="/leadDashboard/potdStatus"
              className="block px-4 py-2 hover:bg-neutral-700"
            >
              POTD Status
            </NavLink>
            <NavLink
              to="/leadDashboard/sheetStatus"
              className="block px-4 py-2 hover:bg-neutral-700"
            >
              Sheet Status
            </NavLink>
            <NavLink
              to="/leadDashboard/juniorsStatus"
              className="block px-4 py-2 hover:bg-neutral-700"
            >
              Juniors Status
            </NavLink>
            <NavLink
              to="/leadDashboard/addSeniorInterview"
              className="block px-4 py-2 hover:bg-neutral-700"
            >
              Add Senior Interview
            </NavLink>
            <NavLink
              to="/leadDashboard/teachersDashboard"
              className="block px-4 py-2 hover:bg-neutral-700"
            >
              Manage Teachers
            </NavLink>
            <NavLink
              to="/leadDashboard/subjectDashboard"
              className="block px-4 py-2 hover:bg-neutral-700"
            >
              Manage Subjects
            </NavLink>
            <NavLink
              to="/leadDashboard/adminPapersPage"
              className="block px-4 py-2 hover:bg-neutral-700"
            >
              Manage Papers
            </NavLink>
          </div>
        </div>
      )}

      {/* Logout */}
      {user && (
        <span
          onClick={handleLogout}
          className="cursor-pointer block py-2 md:py-0"
        >
          Logout
        </span>
      )}
    </>
  );

  return (
    <div className="sticky top-0 font-montserrat w-full bg-black text-white p-2 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="p-1 bg-black rounded-md h-12 w-12 flex justify-center items-center">
          <img src={ACLogo} alt="AC Logo" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">{links}</div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen mt-2" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2 bg-neutral-900 rounded-lg p-4">
          {links}
        </div>
      </div>

      {/* Loading bar */}
      <div className="h-1 w-full relative">
        {navigation.state === "loading" ? (
          <progress
            className="progress progress-primary absolute h-[5px] border-b-2 border-black bg-stone-700"
            style={progressStyle}
          ></progress>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
