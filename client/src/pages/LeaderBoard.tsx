import React, { useState, useEffect } from 'react';
import { Trophy, Github, Code2, Calendar } from 'lucide-react';
import AnimatedWrapper from "../components/AnimatedWrapper";
import { MouseEffectBackground } from "../components/MouseEffectBackground";

// Types for our leaderboard data
interface Student {
  rank: number;
  name: string;
  username: string;
  rating?: number; // Rating for CodeForces students
}

interface LeaderboardData {
  codeforces: Student[];
  github: Student[];
  potd: Student[];
}

type TabType = 'codeforces' | 'github' | 'potd';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('codeforces');
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching leaderboard data
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);

        // Simulated data with 10 students
        const mockData: LeaderboardData = {
          codeforces: [
            { rank: 1, name: "John Doe", username: "john_doe", rating: 2300 },
            { rank: 2, name: "Jane Smith", username: "jane_smith", rating: 2200 },
            { rank: 3, name: "Eve Adams", username: "eve_adams", rating: 2100 },
            { rank: 4, name: "Robert Green", username: "robert_green", rating: 2000 },
            { rank: 5, name: "Mia Taylor", username: "mia_taylor", rating: 1900 },
            { rank: 6, name: "Lucas Scott", username: "lucas_scott", rating: 1800 },
            { rank: 7, name: "Sophie White", username: "sophie_white", rating: 1700 },
            { rank: 8, name: "Ethan Harris", username: "ethan_harris", rating: 1600 },
            { rank: 9, name: "Charlotte Lee", username: "charlotte_lee", rating: 1500 },
            { rank: 10, name: "Benjamin Clark", username: "benjamin_clark", rating: 1400 },
          ],
          github: [
            { rank: 1, name: "Alice Johnson", username: "alice_dev" },
            { rank: 2, name: "Bob Wilson", username: "bob_wilson" },
            { rank: 3, name: "Charlie Green", username: "charlie_green" },
            { rank: 4, name: "David Brown", username: "david_brown" },
            { rank: 5, name: "Emily White", username: "emily_white" },
            { rank: 6, name: "Frank Black", username: "frank_black" },
            { rank: 7, name: "Grace Blue", username: "grace_blue" },
            { rank: 8, name: "Harry King", username: "harry_king" },
            { rank: 9, name: "Ivy Silver", username: "ivy_silver" },
            { rank: 10, name: "Jack Gold", username: "jack_gold" },
          ],
          potd: [
            { rank: 1, name: "Eva Brown", username: "eva_brown" },
            { rank: 2, name: "Mike Davis", username: "mike_davis" },
            { rank: 3, name: "Sara White", username: "sara_white" },
            { rank: 4, name: "Oliver King", username: "oliver_king" },
            { rank: 5, name: "Lily Gray", username: "lily_gray" },
            { rank: 6, name: "James Walker", username: "james_walker" },
            { rank: 7, name: "Chloe Adams", username: "chloe_adams" },
            { rank: 8, name: "Amelia Green", username: "amelia_green" },
            { rank: 9, name: "Lucas Scott", username: "lucas_scott" },
            { rank: 10, name: "Jackson Moore", username: "jackson_moore" },
          ]
        };

        setData(mockData); // Set the mock data
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [activeTab]);

  // Simulate logged-in user (you can replace this with actual auth data)
  const loggedInUsername = "lucas_scott"; // Replace with dynamic user data

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gold'; // Golden background for rank 1
      case 2:
        return 'bg-silver'; // Silver background for rank 2
      case 3:
        return 'bg-bronze'; // Bronze background for rank 3
      default:
        return '';
    }
  };

  const getRowClass = (student: Student) => {
    const isLoggedInUser = student.username === loggedInUsername;
    return isLoggedInUser
      ? 'border-4 border-red-500' // Add red border for logged-in user
      : '';
  };

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="relative bg-black flex flex-col items-center justify-center px-4 py-8 min-h-[90vh] overflow-hidden">
      <AnimatedWrapper>
        <div className="min-w-[80vw] min-h-screen bg-gray-900 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 max-w-full">
            <div className="flex items-center justify-center mb-4 sm:mb-8">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-AC_Orange mr-2 sm:mr-3" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-poltawski">Student Leaderboard</h1>
            </div>
            {/* Last Updated Date */}
            <div className="text-xs sm:text-sm text-gray-400 text-center mb-4 sm:mb-8">
              Last updated: {currentDate}
            </div>

            {/* Horizontal Tabs */}
            <div className="flex justify-center mb-4 sm:mb-8 flex-wrap gap-2">
              <div className="flex flex-wrap justify-center space-x-2 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('codeforces')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 lg:px-8 lg:py-4 rounded-lg flex items-center transition-all duration-200 ${
                    activeTab === 'codeforces'
                      ? 'bg-AC_Green text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Code2 className="w-5 h-5 mr-2" />
                  <span className="font-poppins font-xxl text-xs sm:text-sm md:text-base">CodeForces</span>
                </button>
                <button
                  onClick={() => setActiveTab('github')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 lg:px-8 lg:py-4 rounded-lg flex items-center transition-all duration-200 ${
                    activeTab === 'github'
                      ? 'bg-AC_Green text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Github className="w-5 h-5 mr-2" />
                  <span className="font-poppins font-xxl text-xs sm:text-sm md:text-base">GitHub</span>
                </button>
                <button
                  onClick={() => setActiveTab('potd')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 lg:px-8 lg:py-4 rounded-lg flex items-center transition-all duration-200 ${
                    activeTab === 'potd'
                      ? 'bg-AC_Green text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-poppins font-xxl text-xs sm:text-sm md:text-base">POTD</span>
                </button>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-x-auto">
              <table className="w-full table-auto max-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-1 sm:px-6 py-4 text-left text-xs font-xxl text-gray-300 uppercase tracking-wider font-poppins">Rank</th>
                    <th className="px-1 sm:px-6 py-4 text-left text-xs font-xxl text-gray-300 uppercase tracking-wider font-poppins">Student</th>
                    <th className="px-1 sm:px-6 py-4 text-left text-xs font-xxl text-gray-300 uppercase tracking-wider font-poppins">Username</th>
                    {activeTab === 'codeforces' && (
                      <th className="px-1 sm:px-6 py-4 text-left text-xs font-xxl text-gray-300 uppercase tracking-wider font-poppins">Rating</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {data?.[activeTab].map((student) => (
                    <tr
                      key={student.username}
                      className={`hover:bg-gray-700 transition-colors ${getRankColor(student.rank)} ${getRowClass(student)}`}
                    >
                      <td className="px-1 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-semibold text-AC_Orange font-poltawski">#{student.rank}</div>
                      </td>
                      <td className="px-1 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-xxl text-white font-poppins">
                          {student.rank <= 3 && <Trophy className="inline-block w-5 h-5 mr-2 text-yellow-500" />}
                          {student.name}
                        </div>
                      </td>
                      <td className="px-1 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300 font-poppins">{student.username}</div>
                      </td>
                      {activeTab === 'codeforces' && (
                        <td className="px-1 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300 font-poppins">{student.rating}</div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
}

export default App;
