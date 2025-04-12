import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  fetchAllSeniors,
  toggleFollowSenior,
} from "../redux/apiCalls/seniorCalls";
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
  interviews?: { company: string }[];
}

const SeniorsPage = () => {
  const userId = useSelector((state: RootState) => state.auth._id);
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const getSeniors = async () => {
      const result = await fetchAllSeniors();
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
  }, [userId]);

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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-3">
      {seniors.map((senior) => (
        <div
          key={senior._id}
          className="m-2 bg-gradient-to-br from-[#87CEEB] to-[#F5DEB3] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] p-3 flex flex-col items-center transition duration-200 ease-in-out hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:scale-[1.01]"
        >
          {/* Smaller Profile Photo with White Border */}
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

          {/* LinkedIn Profile Link */}
          <a
            href={senior.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-[#333333] mt-1 hover:underline text-center"
          >
            Linked Profile
          </a>

         

          {/* Interview Companies Section */}
          <div className="mt-3 w-full text-center">
            <h3 className="text-base font-semibold text-[#333333]">
              Interview Companies
            </h3>
            {senior.interviews && senior.interviews.length > 0 ? (
              <div className="space-y-2 mt-2">
                {senior.interviews.map((interview, index) => (
                  <div key={index}>
                    <p>
                      <strong>Company:</strong> {interview.company}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base font-semibold text-[#333333]">
                No interview company details available.
              </p>
            )}
          </div>

          {senior.isTopMentor && (
            <span className="mt-1 bg-yellow-400 text-white px-2 py-0.5 text-[10px] rounded-full font-bold">
              🌟 Top Mentor
            </span>
          )}

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => handleFollow(senior._id)}
              className={`px-2 py-1 rounded-full text-xs font-bold transition ${
                likes[senior._id]
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {likes[senior._id] ? "Unfollow" : "Follow"}
            </button>
            <button onClick={() => handleFollow(senior._id)} aria-label="Toggle Follow">
              {likes[senior._id] ? (
                <FaHeart className="text-red-500 text-base" />
              ) : (
                <FaRegHeart className="text-gray-500 text-base hover:text-red-400" />
              )}
            </button>
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
  );
};

export default SeniorsPage;
