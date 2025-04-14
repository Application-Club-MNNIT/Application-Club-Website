import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import AnimatedWrapper from "../components/AnimatedWrapper";

// Types for our OPC leaderboard data
interface OPCStudent {
  rank: number;
  name: string;
  username: string;
  solved: number; // New field
}

type TabType = 'opc1' | 'opc2' | 'opc3' | 'opc4' | 'opc5' | 'opc6';

interface OPCData {
  [key: string]: OPCStudent[];
}

function OPCLeaderboard() {
  const [activeTab, setActiveTab] = useState<TabType>('opc1');
  const [data, setData] = useState<OPCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loggedInUsername = "lucas_scott"; // Simulate logged-in user

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);

        // Simulated OPC mock data (replace with real API later)
        const mockData: OPCData = {
          opc1: [
            { rank: 1, name: "Alice", username: "alice123", solved: 5 },
            { rank: 2, name: "Bob", username: "bob321", solved: 4 },
            { rank: 3, name: "Charlie", username: "charlie_dev", solved: 4 },
            { rank: 4, name: "Lucas Scott", username: "lucas_scott", solved: 3 },
            { rank: 5, name: "Mia", username: "mia_coder", solved: 2 },
          ],
          opc2: [],
          opc3: [],
          opc4: [],
          opc5: [],
          opc6: [],
        };

        setData(mockData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [activeTab]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gold';
      case 2: return 'bg-silver';
      case 3: return 'bg-bronze';
      default: return '';
    }
  };

  const getRowClass = (student: OPCStudent) => {
    return student.username === loggedInUsername ? 'border-4 border-red-500' : '';
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="relative bg-black flex flex-col items-center justify-center px-4 py-8 min-h-[90vh] overflow-hidden">
      <AnimatedWrapper>
        <div className="min-w-[80vw] min-h-screen bg-gray-900 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 max-w-full">
            {/* Header */}
            <div className="flex items-center justify-center mb-4 sm:mb-8">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-AC_Orange mr-2 sm:mr-3" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-poltawski">OPC Leaderboard</h1>
            </div>

            {/* Date */}
            <div className="text-xs sm:text-sm text-gray-400 text-center mb-4 sm:mb-8">
              Last updated: {currentDate}
            </div>

            {/* OPC Tabs */}
            <div className="flex justify-center mb-4 sm:mb-8 flex-wrap gap-2">
              <div className="flex flex-wrap justify-center space-x-2 bg-gray-800 rounded-lg p-1">
                {(['opc1', 'opc2', 'opc3', 'opc4', 'opc5', 'opc6'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 lg:px-8 lg:py-4 rounded-lg flex items-center transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-AC_Green text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <span className="font-poppins font-xxl text-xs sm:text-sm md:text-base uppercase">{tab}</span>
                  </button>
                ))}
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
                    <th className="px-1 sm:px-6 py-4 text-left text-xs font-xxl text-gray-300 uppercase tracking-wider font-poppins">Solved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {data?.[activeTab]?.length ? (
                    data[activeTab].map((student) => (
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
                        <td className="px-1 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300 font-poppins">{student.solved}</div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-gray-400 font-poppins">
                        No data available for {activeTab.toUpperCase()}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
}

export default OPCLeaderboard;
