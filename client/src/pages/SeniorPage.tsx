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
            <div className="flex justify-center items-center min-h-screen bg-white">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center font-semibold py-4 min-h-screen bg-white">
                {error}
            </div>
        );
    }

    return (
        <div className="w-screen h-auto min-h-[80vh] bg-white flex justify-center items-center py-6 px-4 overflow-hidden">
            <div
                className="flex flex-col lg:flex-row gap-4 rounded-lg shadow-lg p-4 w-full max-w-5xl"
                style={{
                    background: "linear-gradient(to bottom right, #87CEEB, #f5deb3)", // Sky blue to light brown
                }}
            >
                {/* Left Section - Profile */}
                <div className="flex flex-col items-center justify-start w-full lg:w-6/12 p-2">
                    <img
                        src="https://via.placeholder.com/180"
                        alt="Profile"
                        className="rounded-full w-60 h-60 border-4 bg-gray-400 border-white shadow mb-4" // Added margin bottom
                    />
                    <div className="text-center">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{senior.name}</h1>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700 mt-1">
                            Batch of {senior.batch} • {senior.branch?.toUpperCase()}
                        </p>
                        <a
                            href={senior.linkedin}
                            className="text-blue-600 hover:underline block mt-1 text-xs sm:text-sm md:text-base"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn Profile
                        </a>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                            Followers: {senior.followers?.length ?? 0}
                        </p>
                    </div>
                </div>

                {/* Right Section - Interviews */}
                <div className="flex-1 lg:w-6/12 overflow-hidden min-h-[400px]">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">Interview Experiences</h2>
                    {senior.interviews?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Grid layout for 2 items per row on larger screens */}
                            {senior.interviews.map((interview: any) => (
                                <div key={interview._id} className="bg-gray-100 p-4 rounded-lg shadow w-full"> {/* Full width for each item */}
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{interview.company}</h3>
                                    <p className="text-sm sm:text-base text-gray-700">
                                        Role: <span className="font-medium">{interview.role}</span>
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-700">Status: {interview.status}</p>
                                    <p className="text-sm sm:text-base text-gray-700">
                                        Offer Date:{" "}
                                        {interview.date && !isNaN(new Date(interview.date.trim()).getTime())
                                            ? new Date(interview.date.trim()).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "short",
                                                  day: "numeric",
                                              })
                                            : "Invalid Date"}
                                    </p>
                                    {interview.questionTypes && (
                                        <p className="text-sm sm:text-base text-gray-700 mt-1">
                                            <strong>Questions:</strong> {interview.questionTypes.join(", ")}
                                        </p>
                                    )}
                                    {interview.interviewExperience && (
                                        <p className="text-sm sm:text-base text-gray-700 mt-1">
                                            <strong>Experience:</strong> {interview.interviewExperience}
                                        </p>
                                    )}
                                    {interview.adviceToJuniors && (
                                        <p className="text-sm sm:text-base text-gray-700 mt-1">
                                            <strong>Advice:</strong> {interview.adviceToJuniors}
                                        </p>
                                    )}
                                </div>
                            ))}
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
