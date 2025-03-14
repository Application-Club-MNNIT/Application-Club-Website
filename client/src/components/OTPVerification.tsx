import React, { useRef } from "react";
import AnimatedWrapper from "./AnimatedWrapper";
import { MouseEffectBackground } from "./MouseEffectBackground.js";

const OTPVerification = () => {
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (!/^[0-9]*$/.test(value)) {
            e.target.value = "";
            return;
        }
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && index > 0 && e.target.value === "") {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleFocus = (index: number) => {
        if (index > 0 && !inputRefs.current[index - 1].value) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="relative flex justify-center items-center h-screen bg-stone-950">
            <AnimatedWrapper>
                <div
                    className="flex justify-center items-center align-middle flex-col gap-5 bg-neutral-900 text-white p-8 sm:px-12 ">
                    <h2 className="text-2xl leading-9 text-center font-poltawski">OTP <span
                        className="ml-1">Verification</span></h2>
                    <div className="flex flex-col justify-center leading-9">
                        <p className="self-start">Check your email for OTP</p>
                        <div className="flex gap-3 sm:gap-5">
                            {[...Array(5)].map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onFocus={() => handleFocus(index)}
                                    placeholder="0"
                                    className="w-12 h-12 bg-neutral-800 border border-none text-center text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-AC_Green"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-4 flex justify-end self-end">
                        <a href="#" className="text-xs text-AC_Green hover:underline     ">
                            Resend OTP ?
                        </a>
                    </div>

                    <div className="flex justify-center gap-2 ">
                        <button
                            className="border-2 border-AC_Green text-white font-semibold py-1 px-5 rounded-lg  hover:bg-opacity-80 transition">
                            change email
                        </button>
                        <button
                            className="bg-AC_Green text-black font-semibold py-1 px-5 rounded-lg  hover:bg-opacity-80 transition">
                            Submit
                        </button>
                    </div>
                </div>
            </AnimatedWrapper>
            <button
                className="absolute top-5 right-5 bg-AC_Green text-black font-semibold py-1 px-5 rounded-lg  hover:bg-opacity-80 transition">
                Login
            </button>
        </div>
    );
};

export default OTPVerification;
