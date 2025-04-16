import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchAllSeniors, toggleFollowSenior } from "../redux/apiCalls/seniorCalls";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import debounce from "lodash/debounce";
import AnimatedWrapper from "../components/AnimatedWrapper";
import { MouseEffectBackground } from "../components/MouseEffectBackground";

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
    date: string;
  }[];
}

const SeniorsPage = () => {
  const userId = useSelector((state: RootState) => state.auth._id);
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [companySearch, setCompanySearch] = useState("");
  const [sortOption, setSortOption] = useState("earliest");

  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm: string) => {
        setCompanySearch(searchTerm);
      }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const sortSeniors = (seniors: Senior[]) => {
    switch (sortOption) {
      case "company":
        return [...seniors].sort((a, b) => {
          const companyA =  a.interviews?.[0]?.company || "";
          const companyB = b.interviews?.[0]?.company || "";
          return companyA.localeCompare(companyB);
        });
      case "role":
        return [...seniors].sort((a, b) => {
          const roleA = a.interviews?.[0]?.role || "";
          const roleB = b.interviews?.[0]?.role || "";
          return roleA.localeCompare(roleB);
        });
      case "earliest":
      default:
        return [...seniors].sort((a, b) => {
          const dateA = new Date(a.interviews?.[0]?.date || "").getTime();
          const dateB = new Date(b.interviews?.[0]?.date || "").getTime();
          return dateA - dateB;
        });
    }
  };

  useEffect(() => {
    const getSeniors = async () => {
      const result = await fetchAllSeniors(companySearch);
      if (result.status && result.data) {
        setSeniors(sortSeniors(result.data));
        const initialLikes: { [key: string]: boolean } = {};
        result.data.forEach((senior: Senior) => {
          initialLikes[senior._id] = senior.followers.includes(userId);
        });
        setLikes(initialLikes);
      }
    };
    getSeniors();
  }, [companySearch]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // Cleanup debounce on unmount
    };
  }, [debouncedSearch]);

  useEffect(() => {
    setSeniors((prev) => sortSeniors(prev));
  }, [sortOption]);

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
    <div className="relative bg-black flex flex-col items-center justify-center px-4 py-8 min-h-[90dvh]">
      <MouseEffectBackground />
      <AnimatedWrapper>
        <div className="bg-neutral-900 w-full max-w-[95vw] p-6 rounded-lg shadow-lg">
          <h2 className="text-center text-white text-2xl sm:text-3xl font-poltawski mb-6">
            Explore Top Seniors
          </h2>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Search by company"
              className="p-3 rounded-lg bg-[rgba(74,74,74,0.42)] text-white focus:outline-none w-full max-w-md"
            />
          </div>

          <div className="flex justify-center mb-6">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-3 rounded-lg bg-[rgba(74,74,74,0.42)] text-white focus:outline-none w-full max-w-md"
            >
              <option value="earliest">Earliest Internship Offer First</option>
              <option value="company">Company-wise Sorting</option>
              <option value="role">Role-wise Sorting</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seniors.map((senior) => (
              <div
                key={senior._id}
                className="bg-gradient-to-br from-AC_Orange to-AC_Green rounded-2xl shadow-xl p-4 flex flex-col items-center transition-transform duration-300 hover:scale-[1.015]"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow mb-3">
                  {senior.photoUrl ? (
                    <img
                      src={senior.photoUrl}
                      alt={senior.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-500 flex items-center justify-center text-2xl font-bold text-white">
                      {senior.name[0].toUpperCase()}
                    </div>
                  )}
                </div>

                <p className="text-lg font-semibold text-white text-center">
                  {senior.name}
                </p>

                <a
                  href={senior.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white font-medium mt-1 underline hover:text-AC_Orange"
                >
                  LinkedIn Profile
                </a>

                <div className="mt-3 w-full text-center text-sm text-white space-y-1">
                  {senior.interviews && senior.interviews.length > 0 ? (
                    senior.interviews.map((interview, index) => {
                      const interviewDate = new Date(interview.date);
                      const formattedDate = interviewDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      });
                      return (
                        <p key={index}>
                          <strong>Company:</strong> {interview.company}, {interview.role}, {formattedDate}
                        </p>
                      );
                    })
                  ) : (
                    <p>No interview details available.</p>
                  )}
                </div>

                {senior.isTopMentor && (
                  <span className="mt-2 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-bold">
                    🌟 Top Mentor
                  </span>
                )}

                <div className="flex items-center gap-2 mt-4">
                  <button onClick={() => handleFollow(senior._id)} aria-label="Toggle Follow">
                    {likes[senior._id] ? (
                      <FaHeart className="text-red-500 text-xl" />
                    ) : (
                      <FaRegHeart className="text-white text-xl hover:text-red-400" />
                    )}
                  </button>
                  <span className="text-white text-sm font-semibold">
                    {senior.followers.length}
                  </span>
                </div>

                <Link
                  to={`/seniors/${senior._id}`}
                  className="mt-4 bg-white text-black font-medium px-4 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default SeniorsPage;
