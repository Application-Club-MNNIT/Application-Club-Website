import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSeniorById } from "../redux/apiCalls/seniorCalls";

const SeniorPage = () => {
    const { id } = useParams();
    const [senior, setSenior] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getSenior = async () => {
            try {
                const data = await fetchSeniorById(id as string);
                setSenior(data.data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch senior");
            } finally {
                setLoading(false);
            }
        };
        getSenior();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black">
                <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center font-semibold py-4 min-h-screen bg-black">
                {error}
            </div>
        );
    }

    return (
        <div className="w-screen h-auto min-h-[80vh] bg-black flex justify-center items-center py-6 px-4 overflow-hidden">
            <div
                className="flex flex-col lg:flex-row gap-4 rounded-lg shadow-lg p-4 w-full max-w-5xl"
                style={{
                    background: "linear-gradient(to bottom right, #87CEEB, #f5deb3)",
                }}
            >
                {/* Left Section - Profile */}
                <div className="flex flex-col items-center justify-start w-full lg:w-6/12 p-2">
                    <img
                        src="https://via.placeholder.com/180"
                        alt="Profile"
                        className="rounded-full w-60 h-60 border-4 bg-gray-400 border-white shadow mb-4"
                    />
                    <div className="text-center">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{senior.name}</h1>
                        <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-1">
                            Batch of {senior.batch} • {senior.branch?.toUpperCase()}
                        </p>
                        <a
                            href={senior.linkedin}
                            className="text-AC_Orange hover:underline block mt-1 text-xs sm:text-sm md:text-base"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn Profile
                        </a>
                        <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-1">
                            Followers: {senior.followers?.length ?? 0}
                        </p>
                    </div>
                </div>

                {/* Right Section - Interviews */}
                <div className="flex-1 lg:w-6/12 overflow-hidden min-h-[400px]">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-white">Interview Experiences</h2>
                    {senior.interviews?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {senior.interviews.map((interview: any) => {
                                const offerDate =
                                    interview.date && !isNaN(new Date(interview.date.trim()).getTime())
                                        ? new Date(interview.date.trim()).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric",
                                          })
                                        : null;

                                return (
                                    <div
                                        key={interview._id}
                                        className="p-4 rounded-lg shadow w-full"
                                        style={{
                                            background: "linear-gradient(to bottom right, #87CEEB, #f5deb3)",
                                        }}
                                    >
                                        {/* Role with Date */}
                                        <p className="text-white font-bold text-base sm:text-lg mb-3">
                                            {interview.role}
                                            {offerDate && (
                                                <span className="text-gray-300 font-normal text-sm"> ({offerDate})</span>
                                            )}
                                        </p>

                                        {/* Basic Info */}
                                        <div className="mb-2 text-sm sm:text-base text-gray-300 space-y-1">
                                            <p><strong>Status:</strong> {interview.status}</p>
                                        </div>

                                        {/* Questions */}
                                        {interview.questionTypes?.length > 0 && (
                                            <div className="pt-2 pb-2 bg-black rounded px-2">
                                                <strong className="text-white">Questions:</strong>
                                                <p className="text-sm sm:text-base text-gray-300">
                                                    {interview.questionTypes.join(", ")}
                                                </p>
                                            </div>
                                        )}

                                        {/* Experience */}
                                        {interview.interviewExperience && (
                                            <div className="pt-2 pb-2 bg-black rounded px-2 mt-2">
                                                <strong className="text-white">Experience:</strong>
                                                <p className="text-sm sm:text-base text-gray-300">
                                                    {interview.interviewExperience}
                                                </p>
                                            </div>
                                        )}

                                        {/* Advice */}
                                        {interview.adviceToJuniors && (
                                            <div className="pt-2 pb-2 bg-black rounded px-2 mt-2">
                                                <strong className="text-white">Advice:</strong>
                                                <p className="text-sm sm:text-base text-gray-300">
                                                    {interview.adviceToJuniors}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500">No interviews available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeniorPage;
