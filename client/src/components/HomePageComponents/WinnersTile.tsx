import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";

function WinnersTile({ data }) {
  return (
    <div className="relative group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:bg-gradient-to-b hover:from-white hover:to-orange-50/30 overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-AC_Orange/10 via-transparent to-AC_Green/10"></div>
      </div>

      <div className="relative flex flex-col items-center py-3">
        {/* Top achievement bar */}
        <div
          className="w-full bg-gradient-to-r from-AC_Orange/90 to-AC_Orange mb-3 -mt-3 px-3 py-2 text-center
                    group-hover:from-AC_Orange group-hover:to-AC_Orange/90 group-hover:shadow-lg transition-all duration-300"
        >
          <div className="text-white font-semibold group-hover:text-white/95">
            {data.text1}
          </div>
          <div className="text-white/90 text-sm mt-0.5">{data.text2}</div>
        </div>

        {/* Team name if exists */}
        {data.team && (
          <div className="flex items-center gap-1.5 mb-2 px-2 py-1 bg-gray-50 rounded-full text-sm">
            <HiUsers className="text-AC_Orange" />
            <span className="text-gray-700 font-medium">{data.team}</span>
          </div>
        )}

        {/* Names List */}
        <div className="w-full space-y-1.5">
          {data.names.map((name, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 py-1.5 px-3 rounded-md
                             hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-transparent
                             transition-all duration-300"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-AC_Orange text-xs opacity-75 group-hover:opacity-100">
                  ◆
                </span>
                <span className="text-gray-700 text-sm group-hover:text-gray-800 transition-colors duration-300">
                  {name.value}
                </span>
              </div>
              <a
                href={`https://www.linkedin.com/in/${name.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1 rounded-full text-gray-600
                                hover:bg-blue-50/80 hover:text-[#0A66C2] transition-all duration-300"
              >
                <CiLinkedin size={14} />
                <span className="text-[10px] font-medium">Connect</span>
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
            className="mt-2 flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-600
                        hover:text-AC_Orange transition-colors duration-300"
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
        className="absolute bottom-0 h-0.5 w-full bg-gradient-to-r from-AC_Green/60 via-AC_Green to-AC_Green/60
                group-hover:from-AC_Green/80 group-hover:via-AC_Green group-hover:to-AC_Green/80
                group-hover:h-1 transition-all duration-500"
      ></div>
    </div>
  );
}

export default WinnersTile;
