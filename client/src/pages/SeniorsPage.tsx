import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchAllSeniors, toggleFollowSenior } from "../redux/apiCalls/seniorCalls";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Senior {
  isFollowing: boolean;
  _id: string;
  name: string;
  photoUrl?: string;
  linkedin: string;
  company: string;
  followers: string[];
  isTopMentor: boolean;
  interviews?: {
    company: string;
    role: string;
    date: string; // ISO date string
  }[];
}

const SeniorsPage = () => {
  const userId = useSelector((state: RootState) => state.auth._id);
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [companySearch, setCompanySearch] = useState("");

  useEffect(() => {
    const getSeniors = async () => {
      const result = await fetchAllSeniors(companySearch);
      if (result.status && result.data) {
        setSeniors(result.data);
        const initialLikes: { [key: string]: boolean } = {};
        result.data.forEach((senior: Senior) => {
          initialLikes[senior._id] = senior.followers.includes(userId);
        });
        setLikes(initialLikes);
      }
    };
    getSeniors();
  }, [companySearch]);

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

    setLikes((prev) => ({
      ...prev,
      [seniorId]: !prev[seniorId],
    }));

    const result = await toggleFollowSenior(seniorId);
    if (!result.status) {
      console.error(result.message);
    }
  };

  return (
    <div className="bg-black min-h-screen p-4">
      <input
        type="text"
        value={companySearch}
        onChange={(e) => setCompanySearch(e.target.value)}
        placeholder="Search by company"
        className="p-2 border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {seniors.map((senior) => (
          <div
            key={senior._id}
            className="m-2 bg-gradient-to-br from-AC_Orange to-AC_Green rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] p-3 flex flex-col items-center transition duration-200 ease-in-out hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:scale-[1.01]"
          >
            {/* Profile Photo */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow mb-3">
              {senior.photoUrl ? (
                <img
                  src={senior.photoUrl}
                  alt={senior.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-400 flex items-center justify-center text-3xl font-bold text-white">
                  {senior.name[0].toUpperCase()}
                </div>
              )}
            </div>

            <p className="text-base font-semibold text-[#333333] text-center">
              {senior.name}
            </p>

            {/* LinkedIn Link */}
            <a
              href={senior.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-[#333333] mt-1 hover:underline text-center"
            >
              Linked Profile
            </a>

            {/* Interviews Section */}
            <div className="mt-3 w-full text-center">
              {senior.interviews && senior.interviews.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {senior.interviews.map((interview, index) => {
                    const interviewDate = new Date(interview.date);
                    const formattedDate = interviewDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    });

                    return (
                      <p key={index} className="text-sm text-[#333333]">
                        <strong>Company:</strong> {interview.company}, {interview.role}, {formattedDate}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p className="text-base font-semibold text-[#333333]">
                  No interview company details available.
                </p>
              )}
            </div>

            {/* Top Mentor Badge */}
            {senior.isTopMentor && (
              <span className="mt-1 bg-yellow-400 text-white px-2 py-0.5 text-[10px] rounded-full font-bold">
                🌟 Top Mentor
              </span>
            )}

            {/* Heart Icon with Followers Count */}
            <div className="flex items-center gap-2 mt-3">
              <button onClick={() => handleFollow(senior._id)} aria-label="Toggle Follow">
                {likes[senior._id] ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-500 text-xl hover:text-red-400" />
                )}
              </button>
              <span className="text-sm font-semibold text-[#333333]">
                {senior.followers.length}
              </span>
            </div>

            {/* View Details Link */}
            <Link
              to={`/seniors/${senior._id}`}
              className="mt-3 bg-white border border-gray-300 hover:bg-gray-200 text-base font-semibold text-[#333333] px-3 py-1 rounded-full transition"
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
