import React, {useEffect, useState} from "react";
import {getSheetQuestions} from "../../redux/apiCalls/userCalls.js";
import {generateLink} from "../../util/generateLink.js";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.js";
import {getSheetSubmissionData} from "../../redux/apiCalls/leadCalls.js";

function SheetStatusPage() {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const dictionary = useSelector((state: RootState) => state.dictionary.data);
    const [sheetName, setSheetName] = useState("striver");
    const [sheetData, setSheetData] = React.useState([]);
    const [sheetSubmissionData, setSheetSubmissionData] = React.useState([]);

    useEffect(() => {
        (async () => {
            const sheetSubmissionDataResponse = await getSheetSubmissionData();
            setSheetSubmissionData(sheetSubmissionDataResponse);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            const sheetQuestionsResponse = await getSheetQuestions(sheetName);
            setSheetData(sheetQuestionsResponse.sheet.questions.map((q, index) => {
                const platform = q.questionId[0] === "L" ? "leetcode" : q.questionId[0] === "C" ? "codeforces" : "gfg";
                return {
                    ...q,
                    questionId: q.questionId.substring(1),
                    platform: q.questionId[0] === "L" ? "leetcode" : q.questionId[0] === "C" ? "codeforces" : "gfg",
                    index
                }
            }));

        })();
    }, [sheetName]);


    const getIndex = (regNumber: string): number | null => {
        const match = regNumber.match(/\d+$/);
        return match ? parseInt(match[0], 10) : null;
    };


    function getSubmissionIndicators(n: number) {
        const spans: { index: number; value: number, regNumber: string, total: number }[] = [];

        sheetSubmissionData.forEach((user) => {

            const sheet = user.sheets.filter((s) =>
                s.name === sheetName
            )[0];

            const index = getIndex(user.regNumber);
            if (index === null || !sheet) return;

            const status = sheet.status || "";
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
        <div>

            <div>
                <div>
                    <select value={sheetName} onChange={(e) => setSheetName(e.target.value)}>
                        <option value="striver">Striver</option>
                        <option value="tle">TLE</option>
                    </select>
                </div>
                <div>Sheet: {sheetName}</div>
                <div>
                    <tbody className="divide-y divide-gray-100">

                    {sheetData.map((ques) => {

                        const dict = dictionary[ques.platform];
                        const link = generateLink(dict[ques.questionId], ques.questionId, ques.platform);
                        if (link === "NA") console.log(ques);
                        return (
                            <tr key={ques._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-700">{dict[ques.questionId]?.replace(/[-]/g, ' ').replace(/[0-9]/g, '') || "NA"}</td>
                                <td className="px-6 py-4 text-sm text-blue-600">
                                    <a
                                        href={ques.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        {link}
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-sm">
                <span
                    className={`flex px-2 py-1 rounded-full text-xs font-medium `}
                >
                    {getSubmissionIndicators(ques.index).map(({index, value, total, regNumber}) => (
                        <span
                            key={regNumber}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            title={`${regNumber}: ${total}`}
                            className={`w-2  text-center rounded cursor-pointer ${
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

                </div>
            </div>

        </div>
    )
}

export default SheetStatusPage;