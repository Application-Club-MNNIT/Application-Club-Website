import React from "react";
import {FaLinkedin} from "react-icons/fa";
import {CiLinkedin} from "react-icons/ci";

function CurrentLeads() {

    const currentLeads = [
        {
            name: "Jigyasu Saini",
            titles: ["AC Web Lead"],
            linkedin: "jigyasusaini",
            profileImage: "https://media.licdn.com/dms/image/v2/D4D03AQGffVrStKDTDA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1690862751291?e=1757548800&v=beta&t=pgkifcAMgB13scsKRe5l4Nx_O8FQGFBicNHihgaE5xg"
        }, {
            name: "Abhishek Singh",
            titles: ["AC Web Lead"],
            linkedin: "abhisheksingh3011",
            profileImage: "https://media.licdn.com/dms/image/v2/D5603AQGGKY8WixbcYg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721783367921?e=1757548800&v=beta&t=GLS2iY8BwUNhP0OpUxwM95d2sECB1cU61FEm6jIAfG0"
        }, {
            name: "Arpit Rathore",
            titles: ["TPR"],
            linkedin: "arpit1234",
            profileImage: "https://media.licdn.com/dms/image/v2/D5603AQFp9VmEXyyvSg/profile-displayphoto-shrink_400_400/B56Zap_6hLGUAo-/0/1746608826979?e=1752105600&v=beta&t=oER-FTfHwVu7Dl-udzU6BmZyq4mKi3HiLDCmIFSEVpc"
        },
    ];

    return (
        <div className="p-4 bg-white">
            <div className="text-2xl font-medium">Current AC Leads</div>
            <div className="grid grid-cols-5 gap-2 py-4">
                {currentLeads.map((lead) => <div
                    className="bg-black/5 p-4 rounded-lg flex items-center gap-4 relative">
                    <div><img className="w-16 rounded-full border" src={lead.profileImage} alt={lead.name}/></div>
                    <div>
                        <div className="font-medium text-xl mb-1">{lead.name}</div>
                        {lead.titles.map((title) => <span
                            className="text-xs rounded-full border px-2 py-1 bg-white border-AC_Orange text-AC_Orange">{title}</span>)}
                        <a className="flex align-middle items-center gap-2 absolute top-2 right-2"
                           href={`https://www.linkedin.com/in/${lead.linkedin}/`}>
                            <CiLinkedin size={24}/>
                        </a>
                    </div>
                </div>)}
            </div>

        </div>
    )
}

export default CurrentLeads;