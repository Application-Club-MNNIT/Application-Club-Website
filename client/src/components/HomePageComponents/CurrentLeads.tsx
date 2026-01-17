import React from "react";
import { CiLinkedin } from "react-icons/ci";

import defaultProfileImage from "../../assets/default.png";

function CurrentLeads() {

    const currentLeads = [
        {
            name: "Desh Deepak Kushwaha",
            linkedin: "https://www.linkedin.com/in/deshdeepakkushwaha/",
            profileImage: defaultProfileImage
        },
        {
            name: "Sanyam Goel",
            linkedin: "https://linkedin.com/in/iamsanyamgoel",
            profileImage: defaultProfileImage
        },
        {
            name: "Manish Sharma",
            linkedin: "https://www.linkedin.com/in/manish-sharma26/",
            profileImage: defaultProfileImage
        },
        {
            name: "Chinmay Borah",
            linkedin: "https://www.linkedin.com/in/chinmay-borah2003?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            profileImage: defaultProfileImage
        }, {
            name: "Amisha Joshi",
            linkedin: "https://www.linkedin.com/in/amisha-joshi013/",
            profileImage: defaultProfileImage
        }, {
            name: "Gouri Minocha",
            linkedin: "https://www.linkedin.com/in/gouriminocha/",
            profileImage: defaultProfileImage
        },
        {
            name: "Deepika Agrawal",
            linkedin: "https://www.linkedin.com/in/deepika-agrawal-785723324",
            profileImage: defaultProfileImage
        }, {
            name: "Sujeet Mahto",
            linkedin: "https://www.linkedin.com/in/sujeetmahto",
            profileImage: defaultProfileImage
        },

        {
            name: "Bankim Chandra Das",
            linkedin: "https://linkedin.com/in/bankim-ch",
            profileImage: defaultProfileImage
        },
        {
            name: "Dev Nathani",
            linkedin: "https://www.linkedin.com/in/dev-nathani/",
            profileImage: defaultProfileImage
        },
        {
            name: "Aaditya Sehgal",
            linkedin: "https://www.linkedin.com/in/aaditya01sehgal/",
            profileImage: defaultProfileImage
        }, {
            name: "Adhiraj Sinha",
            linkedin: "https://www.linkedin.com/in/adhiraj24/",
            profileImage: defaultProfileImage
        },
        {
            name: "Shahid",
            linkedin: "https://www.linkedin.com/in/shahidtk01",
            profileImage: defaultProfileImage
        },
        {
            name: "Pushkar Shinde",
            linkedin: "https://www.linkedin.com/in/pushkar-shinde-636973221/",
            profileImage: defaultProfileImage
        },
        {
            name: "Amritesh Mishra",
            linkedin: "https://www.linkedin.com/in/amritesh-mishra-a578ab324/",
            profileImage: defaultProfileImage
        },

    ];


    return (
        <div className="py-12 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Current <span className="text-AC_Orange">AC Leads</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm">
                        Our dedicated team leads guiding and mentoring the Application Club community.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {currentLeads.map((lead) => (
                        <div
                            key={lead.name}
                            className="group relative bg-neutral-800/50 backdrop-blur-sm p-3 rounded-lg
                                border border-neutral-700/50 hover:border-AC_Orange/50 transition-all duration-300
                                hover:shadow-lg hover:shadow-AC_Orange/5 hover:-translate-y-1"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-AC_Orange/0 via-AC_Orange/5 to-AC_Orange/0
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Profile Image */}
                                <div className="mb-3 transform group-hover:scale-105 transition-transform duration-300">
                                    <div className="relative w-20 h-20 mx-auto">
                                        <img
                                            src={lead.profileImage}
                                            alt={lead.name}
                                            className="w-full h-full rounded-full object-cover
                                                border-2 border-neutral-700 group-hover:border-AC_Orange
                                                shadow-lg shadow-black/50 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Name and Links */}
                                <div className="text-center">
                                    <h3 className="text-sm font-bold text-white mb-2 group-hover:text-AC_Orange
                                        transition-colors duration-300"
                                    >
                                        {lead.name}
                                    </h3>
                                    {/* 
                                    Titles/Roles
                                    {lead.titles && (
                                        <div className="flex flex-wrap gap-1 justify-center mb-2">
                                            {lead.titles.map(title => (
                                                <span key={title}
                                                    className="text-[10px] font-medium px-2 py-0.5 rounded-full
                                                    bg-AC_Orange/10 text-AC_Orange border border-AC_Orange/20"
                                                >
                                                    {title}
                                                </span>
                                            ))}
                                        </div>
                                    )} */}

                                    {/* LinkedIn Link */}
                                    <a
                                        href={lead.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-neutral-400 hover:text-AC_Orange
                                            transition-colors duration-300 group-hover:scale-105"
                                    >
                                        <CiLinkedin size={16} />
                                        <span className="text-[10px] font-medium">Connect</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CurrentLeads;