import Days14LineGraph from "../graphs/Days14LineGraph.js";
import React from "react";

function HomePageTiles({data}) {
    return (
        <div className="rounded-md bg-white shadow-lg p-2 grid-cols-4 grid gap-4">
            <div className="bg-black/2 border-dashed border-black border-2 p-2 rounded row-span-2">
                <div className="text-3xl font-medium mb-4">About Application Club</div>
                <div className="">The Application Club is a student-led initiative at MNNIT Allahabad
                    where selected MCA students annually take on leadership roles to mentor and upskill their
                    juniors, aligning their growth with current industry standards.
                </div>
            </div>
            <div className="bg-black/2 border-dashed border-black border-2 p-2 rounded">
                <div className="flex flex-col items-center">
                    <div className="text-lg">Actively monitoring</div>
                    <div
                        className="text-center text-3xl font-bold my-5">{data['mcaUserCount'] + data['mscUserCount']} Students
                    </div>
                    <div className="flex items-center justify-evenly align-middle w-full font-medium">
                        <span>{data['mcaUserCount']} MCA</span>
                        <span>{data['mscUserCount']} MSC</span>
                    </div>
                </div>
            </div>
            <div className="bg-black/2 border-dashed border-black border-2 p-2 rounded col-span-2 row-span-3">
                <div className="flex justify-evenly">
                    <div className="flex flex-col items-center">
                        <div className="text-center text-3xl font-bold my-5">{data['dsaToday']} DSA</div>
                        <div className="text-lg">Questions solved today</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-center text-3xl font-bold my-5">{data['dsaPast14Days']} DSA</div>
                        <div className="text-lg">Questions solved in past 14 days</div>
                    </div>
                </div>
                <div><Days14LineGraph data={data['past14DaysData']}/></div>
            </div>
            <div className="bg-black/2 border-dashed border-black border-2 p-2 rounded">
                <div className="flex flex-col items-center">
                    <div className="text-center text-3xl font-bold my-5">73</div>
                    <div className="text-lg">PYQ with solutions</div>
                </div>
            </div>

            <div className="bg-black/2 border-dashed border-black border-2 p-2 rounded">
                <div className="flex flex-col items-center">
                    <div className="text-center text-3xl font-bold my-5">147</div>
                    <div className="text-lg">Academic resources and Notes</div>
                </div>
            </div>

            <div className="bg-black/2 border-dashed border-black border-2 p-2 rounded">
                <div className="flex flex-col items-center">
                    <div className="text-center text-3xl font-bold my-5">786</div>
                    <div className="text-lg">Connections eager to help</div>
                </div>
            </div>

            <div className="bg-black/2 border-dashed border-black border-2 p-2 rounded">
                <div className="flex flex-col items-center">
                    <div className="text-lg">People placed in</div>
                    <div className="text-center text-3xl font-bold my-5">36+</div>
                    <div className="text-lg">Companies to guide you</div>
                </div>
            </div>

            <div className="bg-black/2 border-dashed border-black border-2 p-2 rounded">
                <div className="flex flex-col items-center">
                    <div className="text-center text-3xl font-bold my-5">{data['leadCount']}</div>
                    <div className="text-lg">AC Leads</div>
                </div>
            </div>

            <div className="bg-black/2 border-dashed border-black border-2 p-2 rounded">
                <div className="flex flex-col items-center">
                    <div className="text-center text-3xl font-bold my-5">11 OPC</div>
                    <div className="text-lg mb-4">Conducted</div>
                    <div className="flex gap-2 flex-wrap">
                        <div>
                            <span className="font-medium">2024</span>
                            <span>(5)</span>
                        </div>
                        <div>
                            <span className="font-medium">2025</span>
                            <span>(7)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black/2 border-dashed border-black border-2 p-2 rounded">
                <div className="flex flex-col items-center">
                    <div className="text-center text-3xl font-bold my-5">3 Events</div>
                    <div className="text-lg mb-4">organised</div>
                    <div className="flex gap-2 flex-wrap">
                        <div>
                            <span className="font-medium">2024</span>
                            <span>(3)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black/2 border-dashed border-black border-2 p-2 rounded">
                <div className="flex flex-col items-center">
                    <div className="text-center text-3xl font-bold my-5">17</div>
                    <div className="text-lg">Interview Stories</div>
                </div>
            </div>

            {/*can also add number of projects deployed*/}

        </div>
    )
}

export default HomePageTiles;