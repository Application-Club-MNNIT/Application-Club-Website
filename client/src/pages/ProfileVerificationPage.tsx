import React, {useState} from "react";
import LeetCodeIcon from "../assets/images/icon/leetcode.png";
import GFGIcon from "../assets/images/icon/gfg.png";
import GitHubIcon from "../assets/images/icon/github.png";
import LinkedInIcon from "../assets/images/icon/linkedin.png";
import CodeforcesIcon from "../assets/images/icon/codeforces.png";
import VerifyIcon from "../assets/images/icon/verify.png";
import TickIcon from "../assets/images/icon/tick.png";
import AnimatedWrapper from "../components/AnimatedWrapper.js";
import {MouseEffectBackground} from "../components/MouseEffectBackground.js";
import {useLoaderData} from "react-router-dom";
import { verifyHandle } from "../redux/apiCalls/userCalls";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; 
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const ProfileVerificationPage: React.FC = () => {

    //todo: remove linkedin

    //yes it looks weird in typescript
    //const data = useLoaderData() in js
    const dispatch = useDispatch<AppDispatch>();
    const data: { randomName: string } = useLoaderData() as { randomName: string };
    const randomName: string = data.randomName;
    const leetcode = useSelector((state: RootState) => state.auth.leetcode);
    const gfg = useSelector((state: RootState) => state.auth.leetcode);
    const github = useSelector((state: RootState) => state.auth.leetcode);
    const codeforces = useSelector((state: RootState) => state.auth.leetcode);

    // Initialize usernames from the user state
    const [usernames, setUsernames] = useState({
        leetcode: leetcode?.username || "",
        gfg: gfg?.username || "",
        github: github?.username || "",
        codeforces: codeforces?.username || "",
        linkedin: "" // Not present in schema
    });

    const [verified, setVerified] = useState({
        leetcode: leetcode?.verified || false,
        gfg: gfg?.verified || false,
        github: github?.verified || false,
        codeforces: codeforces?.verified || false,
        linkedin: false // Not present in schema
    });

    // Handler to update the username for a specific platform
    const handleChange = (platform: string, value: string) => {
        if (!verified[platform]) {
            setUsernames({...usernames, [platform]: value});
        }
    };

    // Handler to verify the username for a specific platform
    const handleVerify = async (platform: "leetcode" | "gfg" | "codeforces" | "github") => {
        console.log(`Verifying ${platform} username: ${usernames[platform]}`);
        let username: string = usernames[platform];
        const response = await verifyHandle(dispatch,{platform, username});
        if (response.status) {
            setUsernames({...usernames, [platform]: username});
            setVerified({...verified, [platform]: true}); // Update the state only if successful
            // dispatch(updateUserVerification({ platform, username }));
        }
    };

    return (
        <div className="relative bg-black flex flex-col items-center justify-center px-4 py-8 min-h-screen">
            <MouseEffectBackground/>

            {/* Button for user login */}
            <button
                className="absolute top-4 right-4 bg-AC_Green text-black px-4 py-2 rounded-md font-semibold hover:opacity-90 transition">
                Login
            </button>


            <div className="mt-6.5"></div>
            <AnimatedWrapper>
                {/* Inner container with background and shadow */}
                <div
                    className="bg-neutral-900 w-full flex flex-col items-center justify-center max-w-[95vw] overflow-hidden">
                    <h2 className="text-center text-white p-4 mt-4 text-2xl sm:text-3xl font-poltawski mb-4 sm:mb-2">
                        Profile Verification
                    </h2>

                    <p className="font-thin w-[100%] p-4 px-4 md:w-[90%] mb-4 sm:mb-6">
                        To verify your profile, change your name to <span
                        className="font-medium text-AC_Orange">{randomName}</span> on
                        each platform, then click verify</p>

                    <p className="text-red-500 font-medium w-[100%] md:w-[90%] px-4 text-lg mb-8">Caution: You won't be
                        allowed to change your
                        username once
                        verified!</p>

                    {/* List of platforms for username verification */}
                    {[
    { name: "Leetcode", key: "leetcode", icon: LeetCodeIcon, link: "https://leetcode.com/profile/" },
    { name: "Codeforces", key: "codeforces", icon: CodeforcesIcon, link: "https://codeforces.com/settings/social" },
    { name: "GFG", key: "gfg", icon: GFGIcon, link: "https://www.geeksforgeeks.org/edit-profile/" },
    { name: "GitHub", key: "github", icon: GitHubIcon, link: "https://github.com/settings/profile" },
].map(({name, key, icon,link}) => (
                        <div key={key}
                             className="flex flex-wrap md:flex-row px-1 md:px-10 items-center mb-2 sm:mb-3 space-y-3 sm:space-y-0 w-full">
                            {/* Platform icon and label */}
                            <label
                                className="text-white font-poppins text-lg flex items-center w-full sm:w-1/4 p-2 sm:justify-end sm:mr-4">
                                <img src={icon} alt={name} className="w-6 h-6 mr-2"/>
                                {name} :
                            </label>
                            {/* Input field and verify button */}
                            <div className="flex-1 flex items-center  space-x-2 sm:space-x-4 relative">
                                <input
                                    type="text"
                                    value={usernames[key]}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className={`flex-1 p-3 rounded-xl bg-[rgba(74,74,74,0.42)] text-white focus:outline-none w-[200px] sm:w-[75px] md:w-[140px]
                                         ${verified[key] ? 'border-2 border-green-400' : 'border-none'}`}
                                    placeholder={`Enter your ${name} username`}
                                    readOnly={verified[key]}
                                />

                                {verified[key] && (
                                    <img src={TickIcon} alt="Verified" className="absolute right-6 w-6 h-6"/>
                                )}

                                {/* Verify section with icon and button */}
                                <div className="flex items-center space-x-3 h-12">
                                    {!verified[key] && (
                                        <>
                                            {/* Verify icon inside a box */}
                                            
                                            <a href={link} target="_blank" rel="noopener noreferrer"
                           className="bg-[rgba(74,74,74,0.42)] p-0 sm:p-2 rounded-md w-9 h-9 sm:h-12 sm:w-12 flex items-center justify-center">
                            <img src={VerifyIcon} alt="Verify Icon" className="w-6 h-6 p-0.5 sm:w-6 sm:h-6"/>
                        </a>
                                            {/* Verify button */}
                                            <button
                                                onClick={() => handleVerify(key as "leetcode" | "codeforces" | "gfg" | "github")}
                                                className="bg-[rgba(74,74,74,0.42)] text-AC_Green px-1 py-2 md:px-2 sm:h-12 rounded-md font-semibold hover:opacity-90 transition font-poltawski "
                                            >
                                                Verify
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Submit button */}
                    <div className="p-2 px-10 rounded-lg flex justify-center w-[300px]">
                        <button
                            className="bg-AC_Green text-black px-8 py-2 w-full rounded-lg text-lg font-medium hover:opacity-90 transition"
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
