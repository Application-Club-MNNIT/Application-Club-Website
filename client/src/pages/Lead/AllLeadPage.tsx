import React, {useEffect} from "react";
import {getAllLeads} from "../../redux/apiCalls/leadCalls.js";

function AllLeadPage() {
    const [leads, setLeads] = React.useState([]);
    useEffect(() => {
        (async () => {
            const allLeadsResponse = await getAllLeads();
            setLeads(allLeadsResponse);
            console.log(allLeadsResponse);
        })();

    }, [])

    return (
        <div>
            <div>Following is the list of all leads</div>
            {
                leads.map((lead, index) => <div key={lead._id}>{lead.email}</div>)
            }
        </div>

    )
}

export default AllLeadPage;