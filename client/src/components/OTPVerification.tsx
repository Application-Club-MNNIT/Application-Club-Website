import React, { useEffect, useRef, useState } from "react";
import AnimatedWrapper from "./AnimatedWrapper";
import { MouseEffectBackground } from "./MouseEffectBackground.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { loginSuccess, resetAll } from "../redux/authSlice";
import { login, signup, verifyOTP } from "../redux/apiCalls/userCalls";

const OTP_LENGTH = 5;
const OTP_RESENT_COOLDOWN = 60;

const OTPVerification = () => {
    const [otp, setOtp] = useState<string[]>([]);
    const inputRefs = useRef([]);
    const authSelector = useSelector((state: RootState) => state.auth);

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (!/^[0-9]*$/.test(value)) {
            e.target.value = "";
            resetAllFieldsAhead(index);
            return;
        }
        setOtp([...otp.slice(0, index), value]);
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && index > 0 && (e.target as HTMLInputElement).value === "") {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleFocus = (index: number) => {
        if (index > 0 && !inputRefs.current[index - 1].value) {
            inputRefs.current[index - 1].focus();
        }
    };

    const resetAllFieldsAhead = (index: number) => {
        setOtp([...otp.slice(0, index)]);
        for (let i = index; i < inputRefs.current.length; i++) {
            inputRefs.current[i].value = "";
        }
    }

    const handleSubmit = async () => {
        const isVarified = await verifyOTP(dispatch, { email: authSelector.email, otp: parseInt(otp.join("")) });
        console.log(isVarified);
        if (!isVarified) {
            resetAllFieldsAhead(0);
        }
    }

    // ============= Timer =============
    const [timer, setTimer] = useState(OTP_RESENT_COOLDOWN);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer === 0) {
            setCanResend(true); // Enable the button when timer reaches 0
            return; // Exit early to avoid setting an interval at 0
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [timer]); // ✅ Correct: It stops once `timer` reaches 0

    const handleResendOTP = () => {
        setCanResend(false);
        setTimer(60); // Restart the timer
        signup(dispatch, {
            name: authSelector.name,
            email: authSelector.email,
            phone: authSelector.phone,
            username: authSelector.username,
            password: authSelector.password
        });
    };

    // ===================================

    const dispatch = useDispatch<AppDispatch>();

    // reseting username so that signup page renders again
    const handleEmailChange = () => {
        dispatch(resetAll());
    }

    // TODO: Show email address at opt verification page
    return (
        <AnimatedWrapper>
            <div
                className="flex z-10 justify-center items-center align-middle flex-col gap-5 bg-neutral-900 text-white p-8 sm:px-12 ">

                <h2 className="text-2xl leading-9 text-center font-poltawski">OTP <span
                    className="ml-1">Verification</span></h2>
                <div className="flex flex-col justify-center leading-9">
                    <p className="self-start">Check your email for OTP</p>
                    <div className="flex gap-3 sm:gap-5">
                        {[...Array(OTP_LENGTH)].map((_, index) => (
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
                        <button
                            onClick={handleResendOTP}
                            disabled={!canResend}
                            className={`text-xs font-semibold transition ${canResend
                                ? "text-AC_Green hover:underline"
                                : "text-gray-500 cursor-not-allowed opacity-50"
                                }`}>
                            {canResend ? "Resend OTP?" : `Resend in ${timer}s`}
                        </button>

                    </a>
                </div>

                <div className="flex justify-center gap-2 ">
                    <button
                        className="border-2 border-AC_Green text-white font-semibold py-1 px-5 rounded-lg  hover:bg-opacity-80 transition"
                        onClick={handleEmailChange}>
                        change email
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-AC_Green text-black font-semibold py-1 px-5 rounded-lg  hover:bg-opacity-80 transition">
                        Submit
                    </button>
                </div>
            </div>
        </AnimatedWrapper>
    );
};

export default OTPVerification;
