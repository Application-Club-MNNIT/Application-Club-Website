import React, {useState} from "react";
import LeetCodeIcon from "../assets/images/icon/leetcode.png";
import GFGIcon from "../assets/images/icon/gfg.png";
import GitHubIcon from "../assets/images/icon/github.png";
import CodeforcesIcon from "../assets/images/icon/codeforces.png";
import VerifyIcon from "../assets/images/icon/verify.png";
import TickIcon from "../assets/images/icon/tick.png";
import AnimatedWrapper from "../components/AnimatedWrapper.js";
import {MouseEffectBackground} from "../components/MouseEffectBackground.js";
import {useLoaderData} from "react-router-dom";
import {verifyHandle} from "../redux/apiCalls/userCalls";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import {useNavigate} from "react-router-dom";

const ProfileVerificationPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const data = useLoaderData().res.data;
    const randomName: string = data.randomString;
    const [verifiedPlatforms, setVerifiedPlatforms] = useState(data.verifiedPlatforms || []);
    const [unverifiedPlatforms, setUnverifiedPlatforms] = useState(data.unverifiedPlatforms || []);

    console.log(data)
    console.log(verifiedPlatforms)
    console.log(unverifiedPlatforms)

    // Initialize usernames state for all platforms
    const [usernames, setUsernames] = useState(() => {
        // Start with verified platforms' usernames
        const initialState = {};
        (data.verifiedPlatforms || []).forEach(platform => {
            initialState[platform.platform] = platform.username;
        });
        // Add empty strings for unverified platforms
        (data.unverifiedPlatforms || []).forEach(platform => {
            initialState[platform] = "";
        });
        return initialState;
    });

    // Handler to update the username for a specific platform
    const handleChange = (platform: string, value: string) => {
        if (unverifiedPlatforms.includes(platform)) {
            setUsernames({...usernames, [platform]: value});
        }
    };

    // Handler to verify the username for a specific platform
    const handleVerify = async (platform: "leetcode" | "gfg" | "codeforces" | "github") => {
        const username = usernames[platform];
        console.log(`Verifying ${platform} username: ${username}`);
        const response = await verifyHandle(dispatch, {platform, username});
        if (response.status) {
            // Move platform from unverified to verified
            setVerifiedPlatforms([...verifiedPlatforms, {platform, username}]);
            setUnverifiedPlatforms(unverifiedPlatforms.filter(p => p !== platform));
        }
    };

    // Check if a platform is verified
    const isPlatformVerified = (platform: string) => {
        return verifiedPlatforms.some(p => p.platform === platform);
    };

    // Get username for a platform
    const getUsername = (platform: string) => usernames[platform] || "";

    const handleSubmit = () => {
        navigate('/');
    };

    return (
        <div className="relative bg-black flex flex-col items-center justify-center px-4 py-8 min-h-[90dvh]">
            <MouseEffectBackground/>
            <AnimatedWrapper>
                <div
                    className="bg-neutral-900 w-full flex flex-col items-center justify-center max-w-[95vw] overflow-hidden">
                    <h2 className="text-center text-white p-4 mt-4 text-2xl sm:text-3xl font-poltawski mb-4 sm:mb-2">
                        Profile Verification
                    </h2>

                    <p className="font-thin w-[100%] p-4 px-4 md:w-[90%] mb-4 sm:mb-6">
                        To verify your profile, change your name to <span
                        className="font-medium text-AC_Orange">{randomName}</span> on
                        each platform, then click verify</p>

                    <p className="text-red-500 font-medium w-[100%] md:w-[90%] px-4 text-lg mb-8">
                        Caution: You won't be allowed to modify your profile details once verified!
                    </p>

                    {[
                        {name: "Leetcode", key: "leetcode", icon: LeetCodeIcon, link: "https://leetcode.com/profile/"},
                        {
                            name: "Codeforces",
                            key: "codeforces",
                            icon: CodeforcesIcon,
                            link: "https://codeforces.com/settings/social"
                        },
                        {name: "GFG", key: "gfg", icon: GFGIcon, link: "https://www.geeksforgeeks.org/edit-profile/"},
                        {name: "GitHub", key: "github", icon: GitHubIcon, link: "https://github.com/settings/profile"},
                    ].map(({name, key, icon, link}) => (
                        <div key={key}
                             className="flex flex-wrap md:flex-row px-1 md:px-10 items-center mb-2 sm:mb-3 space-y-3 sm:space-y-0 w-full">
                            <label
                                className="text-white font-poppins text-lg flex items-center w-full sm:w-1/4 py-2 px-1 sm:justify-end sm:mr-4 justify-between m-0">
                                <div className="flex">
                                    <img src={icon} alt={name} className="w-6 h-6 mr-2"/>
                                    <span>{name} :</span>
                                </div>
                                <a href={link} target="_blank" rel="noopener noreferrer"
                                   className="xs:hidden flex p-0 sm:p-2 rounded-md w-9 h-9 sm:h-12 sm:w-12 items-center justify-center">
                                    <img src={VerifyIcon} alt="Verify Icon"
                                         className="w-6 h-6 p-0.5 sm:w-6 sm:h-6"/>
                                </a>
                            </label>

                            <div className="flex-1 flex items-center space-x-2 sm:space-x-4 relative">
                                <input
                                    type="text"
                                    value={getUsername(key)}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className={`flex-1 p-3 rounded-xl bg-[rgba(74,74,74,0.42)] text-white focus:outline-none w-[200px] sm:w-[75px] md:w-[140px]
                                         ${isPlatformVerified(key) ? 'border-2 border-green-400' : 'border-none'}`}
                                    placeholder={`Enter your ${name} username`}
                                    readOnly={isPlatformVerified(key)}
                                />

                                {isPlatformVerified(key) && (
                                    <img src={TickIcon} alt="Verified" className="absolute right-6 w-6 h-6"/>
                                )}

                                <div className="flex items-center space-x-3 h-12">
                                    {!isPlatformVerified(key) && (
                                        <>
                                            <a href={link} target="_blank" rel="noopener noreferrer"
                                               className="hidden xs:flex bg-[rgba(74,74,74,0.42)] p-0 sm:p-2 rounded-md w-12 h-12 items-center justify-center">
                                                <img src={VerifyIcon} alt="Verify Icon"
                                                     className="w-6 h-6 p-0.5 sm:w-6 sm:h-6"/>
                                            </a>
                                            <button
                                                onClick={() => handleVerify(key as "leetcode" | "codeforces" | "gfg" | "github")}
                                                className="bg-[rgba(74,74,74,0.42)] text-AC_Green py-2 px-2 h-12 rounded-md font-semibold hover:opacity-90 transition font-poltawski"
                                            >
                                                Verify
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="p-2 px-10 rounded-lg flex justify-center w-[300px]">
                        <button
                            onClick={handleSubmit}
                            className={`bg-AC_Green text-black px-8 py-2 w-full rounded-lg text-lg font-medium transition ${unverifiedPlatforms.length === 0
                                ? "hover:opacity-90"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={unverifiedPlatforms.length > 0}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </AnimatedWrapper>
        </div>
    );
};

export default ProfileVerificationPage;
