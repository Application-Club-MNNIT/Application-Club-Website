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

    const sheetPotdDaysData = useLoaderData()['sheetPotdDaysData']
    console.log(sheetPotdDaysData)

    const submissionData = useLoaderData() as IUserState;
    const dictionary = useSelector((state: RootState) => state.dictionary.data);
    const profileData = useSelector((state: RootState) => state.auth);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                {profileData.isLead && (
                    <NavLink
                        to="/leadDashboard"
                        className="inline-block mb-6 px-6 py-2 bg-AC_Green text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                    >
                        Lead Dashboard
                    </NavLink>
                )}

                {/* Profile Info Card */}
                <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-AC_Green">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <p className="text-gray-500">Username</p>
                            <p className="font-semibold text-gray-800">{profileData.username}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-500">Full Name</p>
                            <p className="font-semibold text-gray-800">{profileData.name}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-500">Email</p>
                            <p className="font-semibold text-gray-800">{profileData.email}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-500">Registration Number</p>
                            <p className="font-semibold text-gray-800">{profileData.regNumber}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-500">Branch</p>
                            <p className="font-semibold text-gray-800">{profileData.branch}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-500">Batch</p>
                            <p className="font-semibold text-gray-800">{profileData.batch}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-500">Phone</p>
                            <p className="font-semibold text-gray-800">{profileData.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Progress Status Section */}
                <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-AC_Green">Progress Status</h2>

                    {/* Past 14 Days */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Past 14 Days Activity</h3>
                        <div className="flex flex-wrap gap-2">
                            {sheetPotdDaysData.past14Days.map((day, index) => (
                                <div key={index} className="border rounded p-2 text-sm">
                                    <div className="border-b pb-1">{day.date}</div>
                                    <div className="pt-1 font-medium text-center">{day.uniqueQuestionsSolved}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* POTD Status */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-700">POTD Status</h3>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                {sheetPotdDaysData.potds.count} / {sheetPotdDaysData.potds.status.length} ({Math.round((sheetPotdDaysData.potds.count / sheetPotdDaysData.potds.status.length) * 100)}%)
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                {sheetPotdDaysData.potds.status.split("").map((el, idx) => (
                                    <span
                                        key={idx}
                                        className={`w-1.5 h-4 inline-block mx-[0.5px] ${
                                            el === "1" ? "bg-green-300" : "bg-gray-200"
                                        }`}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sheets Status */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Sheets Progress</h3>
                        <div className="space-y-4">
                            {sheetPotdDaysData.sheets.map((sheet, index) => {
                                const solvedCount = sheet.status.split("").filter(x => x === "1").length;
                                const totalProblems = sheet.status.length;
                                const percentage = Math.round((solvedCount / totalProblems) * 100);
                                return (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span
                                                className="text-sm font-medium capitalize text-gray-700">{sheet.name}</span>
                                            <span
                                                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {solvedCount} / {totalProblems} ({percentage}%)
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            {sheet.status.split("").map((el, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`w-1.5 h-4 inline-block mx-[0.5px] ${
                                                        el === "1" ? "bg-green-300" : "bg-gray-200"
                                                    }`}
                                                ></span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Coding Profiles Section */}
                <div className="space-y-6">
                    {["leetcode", "gfg", "codeforces"].map((platform) => {
                        const dict = dictionary[platform];
                        return (
                            <div key={platform} className="bg-white rounded-xl overflow-hidden shadow-md">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="text-lg font-semibold text-AC_Green uppercase">
                                                {platform}
                                            </span>
                                            <span className="text-gray-600">
                                                @{submissionData[platform].username}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    <table className="w-full text-sm text-gray-600">
                                        <thead className="text-xs uppercase bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 font-medium text-gray-700">Date</th>
                                            <th className="px-6 py-4 font-medium text-gray-700">Name</th>
                                            <th className="px-6 py-4 font-medium text-gray-700">Link</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {submissionData[platform].submissions?.map((submission, index) => (
                                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {new Date(submission.timestamp * 1000).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4">{dict[submission.questionId]?.replace(/[-]/g, ' ')?.replace(/[0-9]/g, '') || "NA"}</td>
                                                <td className="px-6 py-4">
                                                    <a
                                                        href={generateLink(dict[submission.questionId], submission.questionId, platform)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-AC_Green hover:underline"
                                                    >
                                                        View Problem
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}


export default ProfilePage;

