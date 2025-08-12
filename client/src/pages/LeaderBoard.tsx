import React, {useState, useEffect} from 'react';
import {Trophy, Github, Code2, Calendar} from 'lucide-react';
import AnimatedWrapper from "../components/AnimatedWrapper";
import {MouseEffectBackground} from "../components/MouseEffectBackground";
import {backend} from '../AxiosRequests/backendRequestAxios';

// Types for our leaderboard data
interface Student {
    rank: number;
    name?: string;
    username: string;
    githubUsername?: string;
    codeforcesUsername?: string;
    rating?: number; // Rating for CodeForces students
    cfRank?: string; // Codeforces rank
    commits?: number; // Commits for GitHub users
    solvedCount?: number; // Solved count for POTD
    timeTaken?: number; // Time taken for POTD
    verified?: boolean;
}

interface LeaderboardData {
    codeforces: Student[];
    github: Student[];
    potd: Student[];
}

interface GithubLeaderboardResponse {
    status: string;
    message: string;
    data: {
        users: Array<{
            username: string;
            githubUsername: string;
            commits: number;
            verified: boolean;
        }>;
        timestamp: number;
        fromCache: boolean;
    };
}

interface CodeforcesLeaderboardResponse {
    status: string;
    message: string;
    data: {
        users: Array<{
            username: string;
            codeforcesUsername: string;
            rating: number;
            rank?: string; // Codeforces rank
            verified: boolean;
        }>;
        timestamp: number;
        fromCache: boolean;
    };
}

interface PotdLeaderboardResponse {
    status: string;
    message: string;
    data: {
        users: Array<{
            username: string;
            solvedCount: number;
            timeTaken: number;
            verified: boolean;
        }>;
        timestamp: number;
        fromCache: boolean;
    };
}

type TabType = 'codeforces' | 'github' | 'potd';

function App() {
    const [activeTab, setActiveTab] = useState<TabType>('codeforces');
    const [data, setData] = useState<LeaderboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Function to get appropriate color for Codeforces rank
    const getCodeforcesRankColor = (cfRank: string | undefined) => {
        if (!cfRank) return "text-gray-400";

        switch (cfRank.toLowerCase()) {
            case "newbie":
                return "text-gray-400";
            case "pupil":
                return "text-green-500";
            case "specialist":
                return "text-cyan-500";
            case "expert":
                return "text-blue-500";
            case "candidate master":
                return "text-purple-500";
            case "master":
                return "text-orange-500";
            case "international master":
                return "text-orange-600";
            case "grandmaster":
                return "text-red-500";
            case "international grandmaster":
                return "text-red-600";
            case "legendary grandmaster":
                return "text-red-700";
            default:
                return "text-gray-400";
        }
    };

    // Fetch leaderboard data based on active tab
    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                setLoading(true);

                if (activeTab === 'github') {
                    // Fetch real GitHub data from the API
                    const response = await backend.get<GithubLeaderboardResponse>('/api/leaderboard/github');

                    if (response.data && response.data.status === 'success') {
                        // Map the API response to our leaderboard format
                        const githubUsers = response.data.data.users.map((user, index) => ({
                            rank: index + 1,
                            username: user.username,
                            githubUsername: user.githubUsername,
                            commits: user.commits,
                            verified: user.verified
                        }));

                        // Update just the GitHub section of our data
                        setData(prevData => ({
                            ...prevData || {codeforces: [], github: [], potd: []},
                            github: githubUsers
                        }));
                    } else {
                        throw new Error('Failed to fetch GitHub leaderboard');
                    }
                } else if (activeTab === 'codeforces') {
                    // Fetch Codeforces data from the API
                    const response = await backend.get<CodeforcesLeaderboardResponse>('/api/leaderboard/codeforces');

                    if (response.data && response.data.status === 'success') {
                        // Map the API response to our leaderboard format
                        const codeforcesUsers = response.data.data.users.map((user, index) => ({
                            rank: index + 1,
                            username: user.username,
                            codeforcesUsername: user.codeforcesUsername,
                            rating: user.rating,
                            cfRank: user.rank, // Codeforces rank
                            verified: user.verified
                        }));

                        // Update just the Codeforces section of our data
                        setData(prevData => ({
                            ...prevData || {codeforces: [], github: [], potd: []},
                            codeforces: codeforcesUsers
                        }));
                    } else {
                        throw new Error('Failed to fetch Codeforces leaderboard');
                    }
                } else if (activeTab === 'potd') {
                    // Fetch POTD data from the API
                    const response = await backend.get<PotdLeaderboardResponse>('/api/leaderboard/potd');

                    if (response.data && response.data.status === 'success') {
                        // Map the API response to our leaderboard format
                        const potdUsers = response.data.data.users.map((user, index) => ({
                            rank: index + 1,
                            username: user.username,
                            solvedCount: user.solvedCount,
                            timeTaken: user.timeTaken,
                            verified: user.verified
                        }));

                        // Update just the POTD section of our data
                        setData(prevData => ({
                            ...prevData || {codeforces: [], github: [], potd: []},
                            potd: potdUsers
                        }));
                    } else {
                        throw new Error('Failed to fetch POTD leaderboard');
                    }
                }
            } catch (err) {
                console.error('Error fetching leaderboard data:', err);
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
        <div
            className="relative bg-black flex flex-col items-center justify-center px-4 py-8 min-h-[90vh] overflow-hidden">
            <AnimatedWrapper>
                <div className="min-w-[80vw] min-h-screen bg-gray-900 w-full">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 max-w-full">
                        <div className="flex items-center justify-center mb-4 sm:mb-8">
                            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-AC_Orange mr-2 sm:mr-3"/>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-poltawski">Student
                                Leaderboard</h1>
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
                                    <Code2 className="w-5 h-5 mr-2"/>
                                    <span
                                        className="font-poppins font-xxl text-xs sm:text-sm md:text-base">CodeForces</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('github')}
                                    className={`px-4 sm:px-6 py-2 sm:py-3 lg:px-8 lg:py-4 rounded-lg flex items-center transition-all duration-200 ${
                                        activeTab === 'github'
                                            ? 'bg-AC_Green text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                                >
                                    <Github className="w-5 h-5 mr-2"/>
                                    <span
                                        className="font-poppins font-xxl text-xs sm:text-sm md:text-base">GitHub</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('potd')}
                                    className={`px-4 sm:px-6 py-2 sm:py-3 lg:px-8 lg:py-4 rounded-lg flex items-center transition-all duration-200 ${
                                        activeTab === 'potd'
                                            ? 'bg-AC_Green text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                                >
                                    <Calendar className="w-5 h-5 mr-2"/>
                                    <span className="font-poppins font-xxl text-xs sm:text-sm md:text-base">POTD</span>
                                </button>
                            </div>
                        </div>

                        {/* Loading state */}
                        {loading && (
                            <div className="flex justify-center items-center h-64">
                                <div
                                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-AC_Orange"></div>
                            </div>
                        )}

                        {/* Error state */}
                        {!loading && error && (
                            <div
                                className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-4 rounded-lg mb-4">
                                <p>Error loading data: {error}</p>
                            </div>
                        )}

                        {/* Leaderboard Table */}
                        {!loading && !error && data && (
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
                                        {activeTab === 'github' && (
                                            <th className="px-1 sm:px-6 py-4 text-left text-xs font-xxl text-gray-300 uppercase tracking-wider font-poppins">Commits</th>
                                        )}
                                        {activeTab === 'potd' && (
                                            <>
                                                <th className="px-1 sm:px-6 py-4 text-left text-xs font-xxl text-gray-300 uppercase tracking-wider font-poppins">Solved</th>
                                                {/*<th className="px-1 sm:px-6 py-4 text-left text-xs font-xxl text-gray-300 uppercase tracking-wider font-poppins">Time*/}
                                                {/*    (hours)*/}
                                                {/*</th>*/}
                                            </>
                                        )}
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                    {data[activeTab].map((student) => (
                                        <tr
                                            key={student.username}
                                            className={`hover:bg-gray-700 transition-colors ${getRankColor(student.rank)} ${getRowClass(student)}`}
                                        >
                                            <td className="px-1 sm:px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="text-lg font-semibold text-AC_Orange font-poltawski">#{student.rank}</div>
                                            </td>
                                            <td className="px-1 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-xxl text-white font-poppins">
                                                    {student.rank <= 3 &&
                                                        <Trophy className="inline-block w-5 h-5 mr-2 text-yellow-500"/>}
                                                    {student.name || student.username}
                                                    {/* Show rank for Codeforces */}
                                                    {activeTab === 'codeforces' && student.cfRank && (
                                                        <span
                                                            className={`ml-2 text-xs px-1 py-0.5 rounded font-semibold ${getCodeforcesRankColor(student.cfRank)} border border-current`}>
                                {student.cfRank}
                              </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-1 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-300 font-poppins">
                                                    {activeTab === 'github'
                                                        ? student.githubUsername || student.username
                                                        : activeTab === 'codeforces'
                                                            ? student.codeforcesUsername || student.username
                                                            : student.username
                                                    }
                                                </div>
                                            </td>
                                            {activeTab === 'codeforces' && (
                                                <td className="px-1 sm:px-6 py-4 whitespace-nowrap">
                                                    <div
                                                        className="text-sm text-gray-300 font-poppins">{student.rating}</div>
                                                </td>
                                            )}
                                            {activeTab === 'github' && (
                                                <td className="px-1 sm:px-6 py-4 whitespace-nowrap">
                                                    <div
                                                        className="text-sm text-gray-300 font-poppins">{student.commits}</div>
                                                </td>
                                            )}
                                            {activeTab === 'potd' && (
                                                <>
                                                    <td className="px-1 sm:px-6 py-4 whitespace-nowrap">
                                                        <div
                                                            className="text-sm text-gray-300 font-poppins">{student.solvedCount}</div>
                                                    </td>
                                                    {/*<td className="px-1 sm:px-6 py-4 whitespace-nowrap">*/}
                                                    {/*  <div className="text-sm text-gray-300 font-poppins">*/}
                                                    {/*    {(student.timeTaken / 3600).toFixed(2)}*/}
                                                    {/*  </div>*/}
                                                    {/*</td>*/}
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </AnimatedWrapper>
        </div>
    );
}

export default App;
