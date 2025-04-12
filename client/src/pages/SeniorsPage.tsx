import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchAllSeniors, toggleFollowSenior } from "../redux/apiCalls/seniorCalls";
import { Link } from "react-router-dom";

interface Senior {
  isFollowing: boolean;
  _id: string;
  name: string;
  photoUrl?: string;
  linkedin: string;
  followers: string[];
  isTopMentor: boolean;
}

const SeniorsPage = () => {
  const userId = useSelector((state: RootState) => state.auth._id);
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [companySearch, setCompanySearch] = useState(""); // Local state for search query

  useEffect(() => {
    const getSeniors = async () => {
      const result = await fetchAllSeniors(companySearch); // Pass companySearch as the query
      if (result.status && result.data) {
        setSeniors(result.data);
      }
    };
    console.log(seniors);
    getSeniors();
  }, [companySearch]); // Trigger the effect when companySearch changes


  const handleFollow = async (seniorId: string) => {
    setSeniors((prev) =>
      prev.map((senior) =>
        senior._id === seniorId
          ? {
              ...senior,
              isFollowing: !senior.isFollowing,
              followers: senior.isFollowing
                ? senior.followers.filter((id) => id !== userId)
                : [...senior.followers, userId],
            }
          : senior
      )
    );

    const result = await toggleFollowSenior(seniorId);
    if (!result.status) {
      console.error(result.message);
    }
  };

  return (
    <div>
        <input
        type="text"
        value={companySearch}
        onChange={(e) => setCompanySearch(e.target.value)} // Update state as user types
        placeholder="Search by company"
        className="p-2 border rounded"
      />
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {seniors.map((senior) => (
        <div
          key={senior._id}
          className="shadow-lg rounded-xl p-4 flex flex-col items-center bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
            {senior.photoUrl ? (
              <img
                src={senior.photoUrl}
                alt={senior.name}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              senior.name[0].toUpperCase()
            )}
          </div>

          <h2 className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">
            {senior.name}
          </h2>

          <a
            href={senior.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm"
          >
            LinkedIn Profile
          </a>

          <div className="flex items-center mt-2 space-x-2">
            <button
              onClick={() => handleFollow(senior._id)}
              className={`px-4 py-2 rounded ${
                senior.followers.includes(userId)
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {senior.isFollowing ? "Unfollow" : "Follow"}
            </button>

            {senior.isTopMentor && (
              <span className="bg-yellow-400 text-sm px-2 py-1 rounded">
                Top Mentor
              </span>
            )}
          </div>

          <Link
            to={`/seniors/${senior._id}`}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
    </div>
 
  );
};

export default SeniorsPage;
