import React, {useState} from "react";
import {useLoaderData} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.js";
import {generateLink} from "../util/generateLink.js";

function ProfilePage() {

    const profileData = useLoaderData() as IUserState;
    const dictionary = useSelector((state: RootState) => state.dictionary.data);

    const uniqueQuestions = {
        leetcode: new Set(profileData.leetcode.submissions.map(s => s.questionId)).size,
        gfg: new Set(profileData.gfg.submissions.map(s => s.questionId)).size,
        codeforces: new Set(profileData.codeforces.submissions.map(s => s.questionId)).size
    }


    return (
        <div>
            <div>{profileData.username}</div>
            <div>{profileData.name}</div>
            <div>{profileData.email}</div>
            <div>{profileData.regNumber}</div>
            <div>{profileData.branch}</div>
            <div>{profileData.batch}</div>
            <div>{profileData.phone}</div>
            <div>
                {uniqueQuestions.gfg + uniqueQuestions.leetcode + uniqueQuestions.codeforces} Unique questions solved
            </div>

            {[
                {profileData: profileData.codeforces, name: "codeforces"},
                {profileData: profileData.leetcode, name: "leetcode"},
                {profileData: profileData.gfg, name: "gfg"},
            ].map((platform) => {
                const p = platform.profileData;
                const dict = dictionary[platform.name];
                return (
                    <div key={platform.name} className="relative shadow-md sm:rounded-lg max-w-[1200px]">
                        <div className="flex gap-4">
                            <div className="uppercase">{platform.name}</div>
                            <div>{platform.profileData.username}</div>
                            <div>{platform.profileData.submissions.length} Correct submissions</div>
                            <div>{uniqueQuestions[platform.name]} Unique questions</div>
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
                                {p.submissions.map((s, i) => {
                                        const link = generateLink(dict[s.questionId], s.questionId, platform.name);
                                        return <tr key={`${i}${platform.name[0]}${s.questionId}`}
                                                   className="odd:bg-white even:bg-gray-50 border-b">
                                            <td className="px-6 py-4">
                                                {new Date(s.timestamp * 1000).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 capitalize ">{dict[s.questionId].replace(/[-]/g, ' ').replace(/[0-9]/g, '')}</td>
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