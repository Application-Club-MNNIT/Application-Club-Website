import React from "react";

const AnimatedWrapper = ({children}) => {
    return (
        <div className="relative flex justify-center items-center">
            {/* Animated Gradient Border */}
            <div className="relative p-[3px] rounded-3xl overflow-hidden">
                {/* Moving Gradient Layer */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-AC_Orange via-AC_Green to-AC_Orange animate-border-spin"></div>

                {/* Wrapped Content */}
                <div className="relative rounded-3xl text-white shadow-lg overflow-hidden">
                    {children}
                </div>
            </div>

            {/* Tailwind Keyframes */}
            <style>
                {`
          @keyframes border-spin {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-border-spin {
            background-size: 200% 200%;
            animation: border-spin 3s infinite linear;
          }
        `}
            </style>
        </div>
    );
};

export default AnimatedWrapper;
