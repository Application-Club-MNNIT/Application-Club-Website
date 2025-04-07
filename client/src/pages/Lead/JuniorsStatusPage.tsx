import React, {useEffect} from "react";
import {getJuniorsData} from "../../redux/apiCalls/leadCalls.js";

interface Junior {
    name: string,
    regNumber: string,
    phone: number,
    "leetcode": { username: string },
    "gfg": { username: string },
    "codeforces": { username: string },
    "github": { username: string },
    sheets: [{ name: string, status: string }],
    potds: { count: number, status: string, sumOfTime: number },
    past14Days: [{ date: string, uniqueQuestionsSolved: number }],
}

function JuniorsStatusPage() {

    const [juniors, setJuniors] = React.useState<Junior[]>([]);

    const avg = Math.ceil(juniors.reduce((acc, j) => acc + j.past14Days.reduce((a2, d) => a2 + d.uniqueQuestionsSolved, 0), 0) / juniors.length);

    useEffect(() => {
        (async () => {
            const response: [Junior] = await getJuniorsData();
            setJuniors(response.sort((a, b) => a.regNumber.localeCompare(b.regNumber)));
        })()
    }, [])


    return (
        <div className="bg-black py-2">
            {juniors.map((junior) => {
                let potdTotal = 0;
                return (
                    <div key={`${junior.regNumber}`}
                         className="border m-1 rounded-md grid grid-cols-[1fr_6fr] bg-white">
                        <div className="border-r p-2 text-sm flex flex-col gap-2">
                            <div>
                                <div>{junior.name}</div>
                                <div>{junior.regNumber}</div>
                                <div>{junior.phone}</div>
                            </div>
                            <div className="flex flex-col">
                                <div>
                                    <span>Leetcode: </span>
                                    <a className="underline text-blue-800"
                                       target="_blank"
                                       href={`https://leetcode.com/u/${junior.leetcode.username}`}>{junior.leetcode.username}</a>
                                </div>
                                <div>
                                    <span>Codeforces: </span>
                                    <a className="underline text-blue-800"
                                       target="_blank"
                                       href={`https://codeforces.com/profile/${junior.codeforces.username}`}> {junior.codeforces.username}
                                    </a>
                                </div>
                                <div>
                                    <span>Gfg: </span>
                                    <a className="underline text-blue-800"
                                       target="_blank"
                                       href={`https://www.geeksforgeeks.org/user/${junior.gfg.username}`}> {junior.gfg.username}</a>
                                </div>
                                <div>
                                    <span>Github: </span>
                                    <a className="underline text-blue-800"
                                       target="_blank"
                                       href={`https://github.com/${junior.github.username}`}>{junior.github.username}</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex text-xs border-b p-2 gap-1">
                                {junior.past14Days.map((day) => {
                                    return (
                                        <div key={`${junior.regNumber}${day.date}`} className="outline p-1 rounded-sm">
                                            <div className="border-b">{day.date}</div>
                                            <div className="font-medium">{day.uniqueQuestionsSolved}</div>
                                        </div>
                                    )
                                })}
                                <div className="outline p-1 rounded-sm">
                                    <div className="border-b">14 Days total</div>
                                    <div
                                        className="font-medium">{
                                        junior.past14Days.reduce((acc, d) => {
                                            return acc + d.uniqueQuestionsSolved
                                        }, 0)
                                    }/{avg}</div>
                                </div>
                            </div>
                            <div className="text-xs flex gap-2 border-b p-2 justify-between ">
                                <span>POTD:</span>
                                <div>{junior.potds.status.split("").map(el => {
                                    potdTotal += el === "1" ? 1 : 0;
                                    return <span
                                        className={`w-1.5 inline-block ${el === "1" ? "bg-green-300" : ""}`}>{el}</span>
                                })}
                                </div>
                                <span className="bg-red-300 font-medium px-1 rounded-sm">( {potdTotal} )</span>
                            </div>
                            <div className="p-2 flex flex-col gap-2">
                                {junior.sheets.map((sheet) => {
                                    let total = 0;
                                    return (
                                        <div className="text-xs flex gap-2">
                                            <span className="capitalize">{sheet.name}:</span>
                                            <div>{sheet.status.split("").map(el => {
                                                total += el === "1" ? 1 : 0;
                                                return <span
                                                    className={`w-1.5 inline-block ${el === "1" ? "bg-green-300 text-green-900" : ""}`}>{el}</span>
                                            })}
                                            </div>
                                            <span className="bg-red-300 font-medium  px-1 rounded-sm">({total}) </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>)
            })}
        </div>
    );

}

export default JuniorsStatusPage;