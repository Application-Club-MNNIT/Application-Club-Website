import React from "react";
import { CiLinkedin } from "react-icons/ci";

function CurrentLeads() {
  const currentLeads = [
    {
      name: "Jigyasu Saini",
      linkedin: "https://www.linkedin.com/in/jigyasusaini/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQGffVrStKDTDA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1690862751291?e=1757548800&v=beta&t=6FO0jfDOxVZxFKPn0o7xSMYqe1RHncTUYF1FA3Km1YE",
      titles: ["AC Web Head"],
    },
    {
      name: "Abhishek Singh",
      linkedin: "https://www.linkedin.com/in/itsabh15hek/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQE2vDzIeJiaOw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696839799518?e=1757548800&v=beta&t=5lqjaixMXltnnht999SaMYKuhmdmdBCDcx8IiGcazos",
      titles: ["AC Web Head"],
    },
    {
      name: "Hariom Joshi",
      linkedin: "https://www.linkedin.com/in/hariom2705/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQEzyVbKQBWdOA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724636619797?e=1757548800&v=beta&t=UULbCMDwQTNrAMCBULr88o1ra9c-d3vnMm6-RLEJUV0",
      titles: ["AC Web Head"],
    },
    {
      name: "Arpit Rathore",
      linkedin: "https://www.linkedin.com/in/arpit1234/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQFp9VmEXyyvSg/profile-displayphoto-shrink_800_800/B56Zap_6hLGUAk-/0/1746608827008?e=1757548800&v=beta&t=tt7AR9zDgG0q8mHvsMmHHlxZ91RsRihlU4VMq2n3_2I",
      titles: ["TPR"],
    },
    {
      name: "Khushi Verma",
      linkedin: "https://www.linkedin.com/in/khushi-verma-687215291/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQGMhDscS_kHlA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714806344347?e=1757548800&v=beta&t=PigFdHQAM3OwXPPwrjyMO3mLT7pP-qqjK15RJKc-bEk",
      titles: ["TPR"],
    },
    {
      name: "Siddharth Srivastava",
      linkedin: "https://www.linkedin.com/in/sidsrivas/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQGPMBTki7gb2w/profile-displayphoto-crop_800_800/B56Zh9W8J5HcAI-/0/1754449823378?e=1757548800&v=beta&t=l_4w3YcmElMXFl0LU9bdQDdVdA8gJIuah_o7vFEpVQk",
    },
    {
      name: "Abhinav Awasthi",
      linkedin: "https://www.linkedin.com/in/abhinav-awasthi-232a85291/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQEnb7ndP64IEQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714801708011?e=1757548800&v=beta&t=RwU_CoWI-iL2ncHgdKAZB_J02N7twdnYxziVKoAszZw",
    },
    {
      name: "Anubhav Krishna",
      linkedin: "https://www.linkedin.com/in/anubhavkrishna20/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQFpa_2xJsZvdQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721995596090?e=1757548800&v=beta&t=YwfBS5jKaZj4wqAVmahWOjynBhAgcA0AKc7rtkE3X5o",
    },
    {
      name: "Bhuwan Pradhan",
      linkedin: "https://www.linkedin.com/in/bhuwan-pradhan/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQEj7skiuJcw0w/profile-displayphoto-shrink_800_800/B56ZQwurcUH0Ac-/0/1735984331651?e=1757548800&v=beta&t=0zcrGnxnLWwydzl4aEU3rND6IPNjJ3mWv4fhxWYEDgg",
    },
    {
      name: "Jashanpreet Singh",
      linkedin: "https://www.linkedin.com/in/jashanpreetsingh1096/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQGmWppq8y34aQ/profile-displayphoto-shrink_800_800/B56ZP44OguHIAg-/0/1735047309887?e=1757548800&v=beta&t=SmqK4qFQjDLSifCvRkEMmS3tH1MorSKpJXQX6KwE6KE",
    },
    {
      name: "Sneha Agarwal",
      linkedin: "https://www.linkedin.com/in/snehaagrawal12/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/C4D03AQH8N3Y4ChmhuA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1658042473687?e=1757548800&v=beta&t=lXI12CAQzw893JdP1bvlLQwlwg0VaPB-4OMqpVYxr94",
    },
    {
      name: "Pranay Dubey",
      linkedin: "https://www.linkedin.com/in/pranaydubey272/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQFrDgIeDcigBA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719391110742?e=1757548800&v=beta&t=oZrH-Hojq7Z4Hxca1lygvPEvihOHnlMoCIukQTz6ps8",
    },
    {
      name: "Syed Saqib Ali",
      linkedin: "https://www.linkedin.com/in/syedsaqibali88/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQGjR_CGQvJLnA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1702302809219?e=1757548800&v=beta&t=xyNZzXA4PdOC3hDbOc3kvU4rzMw_YhkToCDl84lai84",
    },
    {
      name: "Utkarsh Awasthi",
      linkedin: "https://www.linkedin.com/in/utkarsh619/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQF8wodj_liPrw/profile-displayphoto-shrink_800_800/B56ZTni199GUAc-/0/1739051459271?e=1757548800&v=beta&t=CvuCXq7sFE1YhTUlGqNgXIMqAhAnfz7nEF58t5Iotas",
    },
    {
      name: "Trishita Kesarwani",
      linkedin: "https://www.linkedin.com/in/trishita-kesarwani/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQG9ortbfPeeAw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1694602811904?e=1757548800&v=beta&t=vCVNUgHASoQ8grJEN5FY21H_pbnfG_oOQequP_dXf5s",
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
            Our dedicated team leads guiding and mentoring the Application Club
            community.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {currentLeads.map((lead) => (
            <div
              key={lead.name}
              className="group relative bg-neutral-800/50 backdrop-blur-sm p-3 rounded-lg
                                border border-neutral-700/50 hover:border-AC_Orange/50 transition-all duration-300
                                hover:shadow-lg hover:shadow-AC_Orange/5 hover:-translate-y-1"
            >
              {/* Glow Effect */}
              <div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-AC_Orange/0 via-AC_Orange/5 to-AC_Orange/0
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
                  <h3
                    className="text-sm font-bold text-white mb-2 group-hover:text-AC_Orange
                                        transition-colors duration-300"
                  >
                    {lead.name}
                  </h3>

                  {/* Titles/Roles */}
                  {lead.titles && (
                    <div className="flex flex-wrap gap-1 justify-center mb-2">
                      {lead.titles.map((title) => (
                        <span
                          key={title}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full
                                                    bg-AC_Orange/10 text-AC_Orange border border-AC_Orange/20"
                        >
                          {title}
                        </span>
                      ))}
                    </div>
                  )}

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
