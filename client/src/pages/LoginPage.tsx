import React, { useState } from "react";
import userIcon from "../assets/images/icons/user.png";
import lockIcon from "../assets/images/icons/lock.png";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MouseEffectBackground } from "../components/MouseEffectBackground.js";
import AnimatedWrapper from "../components/AnimatedWrapper";

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16">
            <MouseEffectBackground />

            <button className="absolute top-6 right-6 text-white font-semibold px-4 py-2 rounded-lg transition hover:opacity-80 bg-AC_Green">
                Signup
            </button>

            <AnimatedWrapper>
                <div className="flex justify-center items-center flex-col bg-neutral-900 text-white p-8 sm:p-10 min-w-[95vw] sm:min-w-[400px] md:min-w-[450px] lg:min-w-[500px] rounded-lg shadow-lg">
                    <h2 className="text-center text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white font-poltawski">
                        LOGIN
                    </h2>

                    <div className="mb-5 sm:mb-6 flex gap-4 flex-col w-full">
                        <label className="flex items-center text-base sm:text-lg font-medium text-white">
                            <img src={userIcon} alt="User Icon" className="w-5 h-5 mr-2" />
                            <span>Username / Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username/ Email"
                            className="w-full p-3 px-4 rounded-lg bg-neutral-800 border-0 outline-none focus:ring-0 text-white placeholder-gray-400 text-sm"
                        />
                    </div>

                    <div className="mb-6 sm:mb-8 flex gap-4 flex-col w-full">
                        <div className="flex justify-between items-center text-base sm:text-lg font-medium text-white">
                            <label className="flex items-center">
                                <img src={lockIcon} alt="Lock Icon" className="w-5 h-5 mr-2" />
                                <span>Password</span>
                            </label>
                            <span className="text-xs sm:text-sm cursor-pointer hover:underline text-[#00FFE2]">
                                Forgot Password?
                            </span>
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full p-3 px-4 rounded-lg bg-neutral-800 border-0 outline-none focus:ring-0 text-white placeholder-gray-400 text-sm"
                            />
                            <span className="top-1/2 -translate-y-1/2 right-4 text-white cursor-pointer absolute text-lg"
                                  onClick={togglePasswordVisibility}>
                                {showPassword ? <HiEye /> : <HiEyeOff />}
                            </span>
                        </div>
                    </div>

                    <button type="submit"
                            className="w-[160px] h-[45px] bg-[#2DBAAAF0] hover:bg-teal-600 text-white font-semibold py-3 rounded-2xl text-lg">
                        Submit
                    </button>
                </div>
            </AnimatedWrapper>
        </div>
    );
};

export default LoginPage;