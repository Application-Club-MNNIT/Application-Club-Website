import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";

function WinnersTile({ data }) {
  return (
    <div className="relative group bg-gradient-to-br from-[#fdfaf5] via-[#fefbf7] to-[#fdfaf5] rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden border border-yellow-600/20">
      {/* Glow / dark effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/5 via-transparent to-yellow-700/10"></div>
      </div>

      <div className="relative flex flex-col items-center py-4 px-3">
        {/* Top achievement bar */}
        <div
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 mb-4 -mt-4 px-3 py-2 text-center
                    group-hover:from-yellow-600 group-hover:to-yellow-500 group-hover:shadow-md transition-all duration-500 rounded-b-lg"
        >
          <div className="text-white font-bold tracking-wide text-lg font-serif drop-shadow-sm">
            {data.text1}
          </div>
          <div className="text-white/90 text-sm mt-0.5 italic">
            {data.text2}
          </div>
        </div>

        {/* Team name if exists */}
        {data.team && (
          <div className="flex items-center gap-2 mb-3 px-3 py-1.5 bg-yellow-100 border border-yellow-400/40 rounded-full text-sm">
            <HiUsers className="text-yellow-600" />
            <span className="text-yellow-900 font-medium">{data.team}</span>
          </div>
        )}

        {/* Names List */}
        <div className="w-full space-y-2">
          {data.names.map((name, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 py-2 px-3 rounded-md
                         hover:bg-gradient-to-r hover:from-yellow-50 hover:to-transparent
                         transition-all duration-500"
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-600 text-xs opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  ✦
                </span>
                <span className="text-gray-800 text-sm group-hover:text-yellow-900 transition-colors duration-300 font-medium">
                  {name.value}
                </span>
              </div>
              <a
                href={`https://www.linkedin.com/in/${name.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1 rounded-full text-gray-700 text-xs
                            hover:bg-yellow-600 hover:text-white transition-all duration-500 shadow-sm hover:shadow-md"
              >
                <CiLinkedin size={14} />
                <span className="font-semibold">Connect</span>
              </a>
            </div>
          ))}
        </div>

        {/* Event Link if exists */}
        {data.link && (
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-700
                        hover:text-yellow-700 transition-colors duration-500"
          >
            {data.link.includes("instagram.com") ? (
              <>
                <FaInstagram size={14} />
                <span>View on Instagram</span>
              </>
            ) : (
              <>
                <CiLinkedin size={14} />
                <span>View on LinkedIn</span>
              </>
            )}
          </a>
        )}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 h-0.5 w-full bg-gradient-to-r from-yellow-400/60 via-yellow-500 to-yellow-400/60
                group-hover:from-yellow-600 group-hover:via-yellow-700 group-hover:to-yellow-600
                group-hover:h-1 transition-all duration-500"
      ></div>
    </div>
  );
}

export default WinnersTile;
