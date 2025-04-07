import React, {useEffect} from "react";
import {getAllLeads} from "../../redux/apiCalls/leadCalls.js";
import {Link, Outlet} from "react-router-dom";

function LeadPage() {

    const navlinks = [
        {
            name: "Add potd",
            path: "./addPotd"
        }, {
            name: "Get all leads",
            path: "./allLeads"
        }, {
            name: "Get potd status",
            path: "./potdStatus"
        }, {
            name: "Sheet status",
            path: "./sheetStatus"
        }, {
            name: "Juniors Status",
            path: "./juniorsStatus"
        }
    ]


    return (
        <div>
            <div>

                <div>Lead Page</div>

                <div className="flex gap-4">
                    {navlinks.map((link, i) => (
                        <Link key={link.path} className="underline text-blue-900" to={link.path}>{link.name}</Link>))}
                </div>


                <Outlet/>

            </div>
        </div>
    );
}

export default LeadPage;