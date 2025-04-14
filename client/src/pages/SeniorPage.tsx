import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSeniorById } from "../redux/apiCalls/seniorCalls";
import AnimatedWrapper from "../components/AnimatedWrapper";
import { MouseEffectBackground } from "../components/MouseEffectBackground";

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
    <div className="relative w-full min-h-screen bg-black py-10 px-4">
      <MouseEffectBackground />
      <AnimatedWrapper>
        <div className="bg-neutral-900 w-full max-w-6xl mx-auto rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-6">
          {/* Left: Profile */}
          <div className="flex flex-col items-center w-full lg:w-1/2">
            <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-white shadow">
              {senior.photoUrl ? (
                <img
                  src={senior.photoUrl}
                  alt={senior.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-500 flex items-center justify-center text-4xl font-bold text-white">
                  {senior.name[0].toUpperCase()}
                </div>
              )}
            </div>

            <div className="text-center mt-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{senior.name}</h1>
              <p className="text-sm sm:text-base text-gray-300 mt-1">
                Batch of {senior.batch} • {senior.branch?.toUpperCase()}
              </p>
              <a
                href={senior.linkedin}
                className="text-AC_Orange hover:underline block mt-1 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </a>
              <p className="text-sm text-gray-300 mt-1">
                Followers: {senior.followers?.length ?? 0}
              </p>
            </div>
          </div>

          {/* Right: Interview Experiences */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Interview Experiences</h2>

            {senior.interviews?.length > 0 ? (
              <div className="space-y-4">
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
                      className="rounded-xl border border-gray-700 bg-gradient-to-br from-AC_Orange to-AC_Green p-4 text-white shadow-md"
                    >
                      <p className="font-bold text-lg">
                        {interview.role}
                        {offerDate && (
                          <span className="text-sm font-normal text-gray-200"> ({offerDate})</span>
                        )}
                      </p>

                      <p className="text-sm mt-2 text-gray-100">
                        <strong>Status:</strong> {interview.status}
                      </p>

                      {interview.questionTypes?.length > 0 && (
                        <div className="bg-black rounded mt-2 p-2">
                          <strong>Questions:</strong>
                          <p className="text-sm text-gray-300">
                            {interview.questionTypes.join(", ")}
                          </p>
                        </div>
                      )}

                      {interview.interviewExperience && (
                        <div className="bg-black rounded mt-2 p-2">
                          <strong>Experience:</strong>
                          <p className="text-sm text-gray-300">
                            {interview.interviewExperience}
                          </p>
                        </div>
                      )}

                      {interview.adviceToJuniors && (
                        <div className="bg-black rounded mt-2 p-2">
                          <strong>Advice:</strong>
                          <p className="text-sm text-gray-300">
                            {interview.adviceToJuniors}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400">No interviews available.</p>
            )}
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default SeniorPage;
