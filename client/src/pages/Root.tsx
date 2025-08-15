import React, {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

const Root = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [location]);

    return (
        <main className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="flex-1">
                <Outlet/>
            </div>
            <Footer/>
        </main>
    );
};

export default Root;
