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
      let actualData;
      try {
        setLoading(true);

          actualData = {
            opc1: [
              { rank: 1, name: "Amritesh Mishra", username: "Amritesh_Mishra", solved: 5 },
              { rank: 2, name: "Himanshu Singh", username: "H1manshuSingh", solved: 5 },
              { rank: 3, name: "Neelendra Singh", username: "ultimatrix2.0", solved: 5 },
              { rank: 4, name: "Sujeet Mahto", username: "SujeetMahto", solved: 4 },
              { rank: 5, name: "Ashutosh Kumar", username: "ASHUTOSH_KUMAR", solved: 4 },
              { rank: 6, name: "Manish Sharma", username: "Manish_Sharma26", solved: 4 },
              { rank: 7, name: "Md Shahid", username: "Shahidtk", solved: 4 },
              { rank: 8, name: "Chinmay Borah", username: "Coyote_Stark", solved: 4 },
              { rank: 9, name: "Pranjal gupta", username: "pranjalkgupta555", solved: 4 },
              { rank: 10, name: "Sanyam Goel", username: "hexwhiz", solved: 3 },
              { rank: 11, name: "Vishesh", username: "guru420e", solved: 3 },
              { rank: 12, name: "Vivek Sharma", username: "KyokaSuigetsu", solved: 3 },
              { rank: 13, name: "Abhishek Agrahari", username: "Abhiag", solved: 3 },
              { rank: 14, name: "Chandan Yadav", username: "Yadav_2024CA029", solved: 3 },
              { rank: 14, name: "Atiksh Singh", username: "AtikshSingh007", solved: 3 },
            ],
          opc2: [
            { rank: 1, name: "Himanshu Singh", username: "H1manshuSingh", solved: 5 },
            { rank: 2, name: "Vivek Sharma", username: "KyokaSuigetsu", solved: 5 },
            { rank: 3, name: "Manish Sharma", username: "Manish_Sharma26", solved: 4 },
            { rank: 4, name: "Rajat Shukla", username: "RajatShukla", solved: 4 },
            { rank: 5, name: "Aaditya sehgal", username: "Aaditya01sehgal", solved: 4 },
            { rank: 6, name: "Arpit Shrivastava", username: "shivastava_arpit", solved: 4 },
            { rank: 7, name: "Shashvat", username: "Shash-vat", solved: 4 },
            { rank: 8, name: "Neelendra Singh", username: "ultimatrix2.0", solved: 4 },
            { rank: 9, name: "Rituraj", username: "gintoki027", solved: 4 },
            { rank: 10, name: "Ashutosh Kumar", username: "ASHUTOSH.KUMAR", solved: 4 },
            { rank: 11, name: "Desh Deepak Kushwaha", username: "deepu4477", solved: 4 },
            { rank: 12, name: "Rachit Sharma", username: "goodscenario", solved: 4 },
            { rank: 13, name: "Amritesh Mishra", username: "Amritesh_Mishra", solved: 4 },
            { rank: 14, name: "Saloni Rai", username: "salonirai", solved: 4 },
            { rank: 15, name: "Amber mishra", username: "mishra_376", solved: 4 },
          ],
          opc3: [
            { rank: 1, name: "Himanshu Singh", username: "H1manshuSingh", solved: 7 },
            { rank: 2, name: "Md Shahid", username: "Shahidtk", solved: 6 },
            { rank: 3, name: "Vivek Sharma", username: "KyokaSuigetsu", solved: 5 },
            { rank: 4, name: "Shreyash Shukla", username: "ShreyashS", solved: 5 },
            { rank: 5, name: "Aaditya sehgal", username: "Aaditya01sehgal", solved: 5 },
            { rank: 6, name: "Sanyam Goel", username: "hexwhiz", solved: 5 },
            { rank: 7, name: "Chinmay Borah", username: "Coyote_Stark", solved: 5 },
            { rank: 8, name: "Manish Sharma", username: "Manish_Sharma26", solved: 4 },
            { rank: 9, name: "Amritesh Mishra", username: "Amritesh_Mishra", solved: 4 },
            { rank: 10, name: "Sujeet Mahto", username: "SujeetMahto", solved: 4 },
            { rank: 11, name: "Rajat Shukla", username: "RajatShukla", solved: 4 },
            { rank: 12, name: "Akash", username: "akash1610", solved: 4 },
            { rank: 13, name: "Neelendra Singh", username: "ultimatrix2.0", solved: 4 },
            { rank: 14, name: "Rahul Prashad", username: "RahulPD", solved: 4 },
            { rank: 15, name: "Amisha Joshi", username: "Amisha_013", solved: 4 },
          ],
          opc4: [
            { rank: 1, name: "Sujeet Mahto", username: "SujeetMahto", solved: 3 },
            { rank: 2, name: "Manish Sharma26", username: "Manish_Sharma26", solved: 2 },
            { rank: 3, name: "Chinmay Borah", username: "Coyote_Stark", solved: 2 },
            { rank: 4, name: "Rajat Shukla", username: "RajatShukla", solved: 2 },
            { rank: 5, name: "Rituraj", username: "gintoki027", solved: 2 },
            { rank: 6, name: "Himanshu Singh", username: "H1manshuSingh", solved: 2 },
            { rank: 7, name: "Aaditya sehgal", username: "Aaditya01sehgal", solved: 2 },
            { rank: 8, name: "Shreyash Shukla", username: "ShreyashS", solved: 2 },
            { rank: 9, name: "Sanyam Goel", username: "hexwhiz", solved: 2 },
            { rank: 10, name: "Neelendra Singh", username: "ultimatrix2.0", solved: 2 },
            { rank: 10, name: "Ashutosh Kumar", username: "ASHUTOSH.KUMAR", solved: 2 },
            { rank: 12, name: "Pawan Kumar", username: "Pawan0176", solved: 2 },
            { rank: 13, name: "Priyank Sharma", username: " Priyank1.", solved: 2 },
            { rank: 14, name: "Abhishek Kumar", username: "abhik_01", solved: 2 },
            { rank: 15, name: "Amritesh_Mishra", username: "Amritesh_Mishra", solved: 2 },
          ],
          opc5: [
            { rank: 1, name: "Rajat Shukla", username: "RajatShukla", solved: 5 },
            { rank: 2, name: "Himanshu Singh", username: "H1manshuSingh", solved: 5 },
            { rank: 3, name: "Amritesh Mishra", username: "Amritesh_Mishra", solved: 5 },
            { rank: 4, name: "Desh Deepak Kushwaha", username: "deepu4477", solved: 5 },
            { rank: 5, name: "Pawan Kumar", username: "Pawan0176", solved: 5 },
            { rank: 6, name: "Shreyash Shukla", username: "ShreyashS", solved: 5 },
            { rank: 7, name: "Chinmay Borah", username: "Coyote_Stark", solved: 5 },
            { rank: 8, name: "Bankim chandra das", username: "Bankim_ch", solved: 5 },
            { rank: 9, name: "Abhishek Kumar", username: "abhik_01", solved: 5 },
            { rank: 10, name: "Manish Sharma", username: "Manish_Sharma26", solved: 5 },
            { rank: 11, name: "Sujeet Mahto", username: "SujeetMahto", solved: 5 },
            { rank: 12, name: "Aaditya sehgal", username: "Aaditya01sehgal", solved: 5 },
            { rank: 13, name: "Md Shahid", username: "Shahidtk", solved: 5 },
            { rank: 14, name: "Sanyam Goel", username: "hexwhiz", solved: 5 },
            { rank: 15, name: "Priyank Sharma", username: "Priyank1.", solved: 5 },
          ],
          opc6: [
            { rank: 1, name: "Team: from WA to AC", username: "from WA to AC", solved: 5 },
            { rank: 2, name: "Team: 3Sum", username: "3Sum", solved: 5 },
            { rank: 3, name: "Team: Aaj Mood Nhi Hai", username: "Aai Mood Nhi Hai", solved: 4 },
            { rank: 4, name: "Neelendra Singh", username: "ultimatrix2.0", solved: 4 },
            { rank: 5, name: "Team: Faltu Log", username: "Faltu Log", solved: 3 },
            { rank: 6, name: "Rajat Shukla", username: "RajatShukla", solved: 3 },
            { rank: 7, name: "Team: Beast", username: "Beast", solved: 3 },
            { rank: 8, name: "Team: BinaryBugs", username: "BinaryBugs", solved: 2 },
            { rank: 9, name: "Vivek Sharma", username: "KyokaSuigetsu", solved: 2 },
            { rank: 10, name: "Ujjwal roy", username: "Ujjwal_roy", solved: 2 },
            { rank: 11, name: "Team: 404notFound", username: "404notFound", solved: 1 },
            { rank: 12, name: "Team: Dukh Dard Peeda Kasht!! ", username: "Dukh Dard Peeda Kasht!!", solved: 1 },
            { rank: 13, name: "Ritika Yadav", username: "Ritika_1911", solved: 1 },
            { rank: 14, name: "Rahul Prashad", username: "RahulPD", solved: 0 },
            { rank: 15, name: "Team: FULLSTOP....", username: "FULLSTOP....", solved: 0 },
          ],
        };

        setData(actualData);
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
