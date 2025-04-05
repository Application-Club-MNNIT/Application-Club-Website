import React, {useState} from "react";
import {NavLink, useLoaderData} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.js";
import {generateLink} from "../util/generateLink.js";

function ProfilePage() {

    //todo: also add a next button so that previous submissions can be seen for each platform
    //rout to call is /user/getSubmissions/platform?page=2
    //change platform to platform name and also page
    //there is no way to tell yet how many pages are there

    const submissionData = useLoaderData() as IUserState;
    const dictionary = useSelector((state: RootState) => state.dictionary.data);
    const profileData = useSelector((state: RootState) => state.auth);

    return (
        <div>
            {profileData.isLead && (<NavLink to="/lead">Lead</NavLink>)}
            <div>{profileData.username}</div>
            <div>{profileData.name}</div>
            <div>{profileData.email}</div>
            <div>{profileData.regNumber}</div>
            <div>{profileData.branch}</div>
            <div>{profileData.batch}</div>
            <div>{profileData.phone}</div>

            {["leetcode", "gfg", "codeforces"].map((platform) => {
                const dict = dictionary[platform];
                console.log(submissionData[platform]);
                return (
                    <div key={platform} className="relative shadow-md sm:rounded-lg max-w-[1200px]">
                        <div className="flex gap-4">
                            <div className="uppercase">{platform}</div>
                            <div>{submissionData[platform].username}</div>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Link</th>
                                </tr>
                                </thead>
                                <tbody>
                                {submissionData[platform].submissions.map((s, i) => {
                                        const link = generateLink(dict[s.questionId], s.questionId, platform);
                                        return <tr key={`${i}${platform[0]}${s.questionId}`}
                                                   className="odd:bg-white even:bg-gray-50 border-b">
                                            <td className="px-6 py-4">
                                                {new Date(s.timestamp * 1000).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 capitalize ">{dict[s.questionId]?.replace(/[-]/g, ' ')?.replace(/[0-9]/g, '') || "NA"}</td>
                                            <td className="px-6 py-4"><a href={link}>{link}</a></td>
                                        </tr>
                                    }
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>


                )
            })}

        </div>
    )
}


export default ProfilePage;