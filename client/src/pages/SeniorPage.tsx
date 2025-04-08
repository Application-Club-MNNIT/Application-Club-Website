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
            console.log(data.data);
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
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center font-semibold py-4">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 space-y-6">
            {/* Senior Basic Details */}
            <div className="bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{senior.name}</h2>
                <p className="text-gray-600">Batch: {senior.batch}</p>
                <p className="text-gray-600">Branch: {senior.branch}</p>
                <p className="text-gray-600">LinkedIn: <a href={senior.linkedin} className="text-blue-500" target="_blank" rel="noopener noreferrer">{senior.linkedin}</a></p>
            </div>

            {/* Interviews Card */}
            <div className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Interviews</h3>
                {senior.interviews?.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {senior.interviews.map((interview: any) => (
                            <div key={interview._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-bold text-gray-800">{interview.company}</h4>
                                <p className="text-gray-600">Role: {interview.role}</p>
                                <p className="text-gray-600">Status: {interview.status}</p>
                                <p className="text-gray-600">
                                    Offer Date: {
                                        interview.date && !isNaN(new Date(interview.date.trim()).getTime())
                                        ? new Date(interview.date.trim()).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                            })
                                        : "Invalid Date"
                                    }
                                    </p>
                                    <div className="mt-2">
                                    <p className="text-gray-700"><strong>Question Types:</strong> {interview.questionTypes.join(", ")}</p>
                                    {interview.interviewExperience && (
                                        <p className="text-gray-700 mt-2"><strong>Experience:</strong> {interview.interviewExperience}</p>
                                    )}
                                    {interview.adviceToJuniors && (
                                        <p className="text-gray-700 mt-2"><strong>Advice:</strong> {interview.adviceToJuniors}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No interviews available</p>
                )}
            </div>

            {/* Followers Card */}
            <div className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Followers</h3>
                <p className="text-gray-600">{senior.followers?.length ?? 0} followers</p>

            </div>
        </div>
    );
};

export default SeniorPage;
