import React, {useEffect, useState} from "react";
import {getAllPotds} from "../../redux/apiCalls/userCalls.js";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.js";
import {generateLink} from "../../util/generateLink.js";
import {getAllPotdsSubmissionData} from "../../redux/apiCalls/leadCalls.js";

function PotdStatusPage() {

    const [potds, setPotds] = useState([]);
    const [potdSubmissionData, setPotdSubmissionData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const dictionary = useSelector((state: RootState) => state.dictionary.data);

    useEffect(() => {
        (async () => {
            const allPotdsResponse = await getAllPotds();
            setPotds(allPotdsResponse.potds.map((potd, i) => {
                return {
                    ...potd,
                    index: i,
                    questionId: potd.questionId.substring(1),
                    platform: potd.questionId[0] === "L" ? "leetcode" : potd.questionId[0] === "C" ? "codeforces" : "gfg"
                }
            }).reverse());

            const allPotdsSubmissionResponse = await getAllPotdsSubmissionData();
            console.log(allPotdsSubmissionResponse);
            setPotdSubmissionData(allPotdsSubmissionResponse);
        })();
    }, [])


    const getIndex = (regNumber: string): number | null => {
        const match = regNumber.match(/\d+$/);
        return match ? parseInt(match[0], 10) : null;
    };


    function getSubmissionIndicators(n: number) {
        const spans: { index: number; value: number, regNumber: string, total: number }[] = [];

        potdSubmissionData.forEach((user) => {
            const index = getIndex(user.regNumber);
            if (index === null) return;

            const status = user.potds?.status || "";
            const value = n < status.length && status[n] === "1" ? 1 : 0;
            const total = (status.match(/1/g) || []).length || 0

            spans[index] = {index, value, total, regNumber: user.regNumber};
        });

        // Fill missing indices with 0
        const maxIndex = spans.length;
        for (let i = 1; i < maxIndex; i++) {
            if (!spans[i]) spans[i] = {index: i, value: 0, total: 0, regNumber: `${i}`};
        }

        return spans;
    }


    return (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Link</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">

                {potds.map((potd) => {
                    const dict = dictionary[potd.platform];
                    const link = generateLink(dict[potd.questionId], potd.questionId, potd.platform);
                    return (
                        <tr key={potd._id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {new Date(potd.date).toLocaleDateString("en-IN", {
                                    timeZone: "Asia/Kolkata",
                                })}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">{dict[potd.questionId]?.replace(/[-]/g, ' ').replace(/[0-9]/g, '') || "NA"}</td>
                            <td className="px-6 py-4 text-sm text-blue-600">
                                <a
                                    href={potd.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    {link}
                                </a>
                            </td>
                            <td className="px-6 py-4 text-sm">
                <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium`}
                >
                    {getSubmissionIndicators(potd.index).map(({index, value, total, regNumber}) => (
                        <span
                            key={regNumber}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            title={`${regNumber}: ${total}`}
                            className={`w-6 h-6 text-center rounded cursor-pointer ${
                                hoveredIndex === index
                                    ? "bg-yellow-400 text-black"
                                    : value === 1
                                        ? "bg-green-500 text-white"
                                        : " text-black"
                            }`}
                        >
                              {value}
                            </span>
                    ))}
                </span>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default PotdStatusPage;