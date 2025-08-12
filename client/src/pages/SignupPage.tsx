import React, { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import usernameLogo from "../assets/SignUpformLogo/usernameLogo (1).png";
import passwordLogo from "../assets/SignUpformLogo/passwordLogo.png";
import mobileLogo from "../assets/SignUpformLogo/tempImage5qyAJv 1 (2).png";
import gsuiteLogo from "../assets/SignUpformLogo/tempImageRnhnz3 1.png";
import nameLogo from "../assets/SignUpformLogo/tempImageChspc3 1 (1).png";
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import check, cross, and eye icons
import { MouseEffectBackground } from "../components/MouseEffectBackground.js";
import AnimatedWrapper from "../components/AnimatedWrapper.js";
import { isUsernameAvailable as isUsernameAvailableApi, signup } from "../redux/apiCalls/userCalls.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import OTPVerification from "../components/OTPVerification";


// in milliseconds
const DEFAULT_DEBOUNCE_DELAY = 500;
interface ISignUpFormData {
    username: string;
    name: string;
    email: string;
    phone: string ; 
    password: string;
}

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState<ISignUpFormData>({
        username: '',
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);

    const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false); // To toggle password visibility

    const dispatch = useDispatch<AppDispatch>();
    const authSelector = useSelector((state: RootState) => state.auth);

    const inputFields = [
        { label: "Username", name: "username", type: "text", icon: usernameLogo },
        { label: "Full Name", name: "name", type: "text", icon: nameLogo },
        { label: "GSuite ID", name: "email", type: "email", icon: gsuiteLogo },
        { label: "Mobile No", name: "phone", type: "tel", icon: mobileLogo },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "phone" ? Number(value) || null : value  // Convert phone to number
    }));
    

        if (name === 'username') {
            handleUsernameChange(value);
        }
    };

    const handleUsernameChange = (value: string) => {
        debouncedCheckUsernameAvailability(value);
    }

    // using debounce to avoid making API calls on every keystroke
    // debouncedCheckUsernameAvailability will be called only after the user stops typing for DEFAULT_DEBOUNCE_DELAY
    const debouncedCheckUsernameAvailability = useMemo(() =>
        debounce(async (username: string) => {
            let isAvailable: boolean = false;
            if (username.length >= 4) {
                isAvailable = await isUsernameAvailableApi(username);
            }
            setIsUsernameAvailable(isAvailable);
        }, DEFAULT_DEBOUNCE_DELAY),
        []
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
            const formDataToSend = {
                ...formData,
                phone: Number(formData.phone)  // Convert phone to number before sending
            };
    
            console.log("Form submitted:", formDataToSend);
            await signup(dispatch, formDataToSend);
        } 
    
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState); // Toggle password visibility state
    };

    // username is available and user is not verified, move to otp page directly
    useEffect(() => {
        setIsOtpSent(authSelector.username && !authSelector.verified);
    }, [authSelector.username, authSelector.verified]);
    

    
    

    return (
        <div className="relative flex items-center justify-center min-h-screen p-5">
            <MouseEffectBackground />
            <div className="absolute top-5 right-5">
                <button className="w-[140px] h-[37px] bg-AC_Green text-white font-semibold py-2 rounded-xl">
                    Login
                </button>
            </div>

            {isOtpSent ? (<OTPVerification /> ):(
                <AnimatedWrapper>
<div
        className="flex justify-center items-center flex-col bg-neutral-900 text-white p-8 sm:p-10 min-w-[95vw] sm:min-w-[400px] md:min-w-[450px] lg:min-w-[500px] rounded-lg shadow-lg"
    >
        <h2 className="text-center text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white font-poltawski">
            SIGN UP
        </h2>

                        <form onSubmit={handleSubmit} className="flex gap-5 md:gap-3 flex-col min-w-full">
                        {inputFields.map((field) => (
                            <div key={field.name} className="flex flex-col md:grid grid-cols-[1fr_2fr] gap-1 md:gap-4">
                                <label className="flex items-center justify-center gap-1 text-center mb-2 md:justify-self-end md:text-left">
                                    <img src={field.icon} className="h-5 w-5" alt={field.name}/> <span>{field.label}  :</span>

                                </label>
                                <div className="relative w-full">
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name as keyof ISignUpFormData]}
                                        onChange={handleChange}
                                        maxLength={field.name === "phone" ? 10 : undefined}
                                        className="p-1 rounded-lg bg-neutral-800 border-none px-2 outline-none focus:ring-2 focus:ring-AC_Orange w-full"
                                    />
                                    {field.name === "username" && isUsernameAvailable !== null && (
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            {isUsernameAvailable ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}

                 

                            {/* Password */}
                            <div className="flex flex-col md:grid grid-cols-[1fr_2fr] gap-1 md:gap-4">
                                <label className="flex items-center gap-1 justify-self-end">
                                   <img src={passwordLogo} className="h-5 w-5" alt="password" /><span>Password :</span>
                                </label>
                                <div className="relative w-full">
                                    <input
                                        type={isPasswordVisible ? "text" : "password"} // Toggle input type
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="p-1 rounded-lg bg-neutral-800 border-none px-2 outline-none focus:ring-2 focus:ring-AC_Orange w-full"
                                    />
                                   
    
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    >
                                        {isPasswordVisible ? (
                                            <FaEyeSlash className="text-gray-400" />
                                        ) : (
                                            <FaEye className="text-gray-400" />
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-center mt-6">
                                <button type="submit" className="w-[140px] h-[37px] bg-[#2DBAAAF0] hover:bg-teal-600 text-white font-semibold py-2 rounded-xl">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </AnimatedWrapper>
            )}
        </div>
    );
};

export default SignupPage;
