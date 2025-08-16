import React from "react";
import { CiLinkedin } from "react-icons/ci";

function WebTeam() {
  const webTeamMembers = [
    {
      name: "Manish Sharma",
      linkedin: "https://www.linkedin.com/in/manish-sharma26/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQF1tBC-6mo8yQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721910760897?e=1757548800&v=beta&t=DzSvzZx1oXvxTW1LYuyu54DjgnJBVt2R-IStsIcz6c8",
      title: "Full Stack Developer",
    },
    {
      name: "Sanyam Goel",
      linkedin: "https://www.linkedin.com/in/iamsanyamgoel/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQFPDYQSF19Klg/profile-displayphoto-crop_800_800/B4DZfLtvdpH4AM-/0/1751469457553?e=1757548800&v=beta&t=Lr8whgOUBnKs_GqKyO5g1GjcK6WPqSW1emmAK0UNQ0s",
      title: "Full Stack Developer",
    },
    {
      name: "Sujeet Mahto",
      linkedin: "https://www.linkedin.com/in/sujeetmahto/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQENXzi3Wn1Vbg/profile-displayphoto-shrink_800_800/B4DZXDUFuXGkAc-/0/1742738579386?e=1757548800&v=beta&t=NWFT1vY7nK7n6AmWTN03tPbRQXOlT6Jw9_IbT_zz3wc",
      title: "Full Stack Developer",
    },
    {
      name: "Adarsh Shivhare",
      linkedin: "https://www.linkedin.com/in/adarsh-shivhare-mnnit/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQFpv6i2KlpVXg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727517081867?e=1757548800&v=beta&t=miHTZ94VkbeSvgT7_66EFu86pzuKDDwtZqZrJATyAsg",
      title: "Full Stack Developer",
    },
    {
      name: "Amisha Joshi",
      linkedin: "https://www.linkedin.com/in/amisha-joshi013/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQF84mxfRlFeFQ/profile-displayphoto-crop_800_800/B56Zg3TQE1G0AI-/0/1753274451417?e=1757548800&v=beta&t=jNtscm-m4mBKD9Z8iPix9RERAa0_sHvTetFWzWZwAc0",
      title: "Frontend Developer",
    },
    {
      name: "Chinmay Borah",
      linkedin: "https://www.linkedin.com/in/chinmay-borah-46a865229/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQHxEudYKn9K8Q/profile-displayphoto-crop_800_800/B56ZiYmM13HkAM-/0/1754906809031?e=1757548800&v=beta&t=7pUc7O269lviT7N8jmOVjWQwYMY05C-aXRp4uwBdxz0",
      title: "Frontend Developer",
    },
    {
      name: "Desh Deepak Kushwaha",
      linkedin: "https://www.linkedin.com/in/deshdeepakkushwaha/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQFOfYuWOdQKgA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731531670564?e=1757548800&v=beta&t=pycQ3LIEyZKZApUVI-WnqZ8_Q-bwgKg-9n-wAqMI3fU",
      title: "Full Stack Developer",
    },
    {
      name: "Karan Chauhan",
      linkedin: "https://www.linkedin.com/in/karan-chauhan0/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D5603AQEOLKLBkEPjew/profile-displayphoto-shrink_800_800/B56ZRV2b9YHwAg-/0/1736607122313?e=1757548800&v=beta&t=Q-Edu8eLpvjAeQTvsdb0pPEd4fwSQPsgJRYrmxnqU1U",
      title: "Frontend and UI/UX Developer",
    },
    {
      name: "Kishan Sinha",
      linkedin: "https://www.linkedin.com/in/kishan-sinha65/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQHhLKOzEzPBQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726249826136?e=1757548800&v=beta&t=5hGOGTmqqaC59AfnxF_4UegkMdYdQI6i0mS8bjTsXMU",
      title: "AI/ML Developer",
    },
    {
      name: "Rajat Shukla",
      linkedin: "https://www.linkedin.com/in/rajat-shukla-228717224/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/C4D03AQG5nN19nvlGJw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1660849200426?e=1757548800&v=beta&t=xSyNVV86KFYXF6N_ZjebHUpBtJSODlEBlu8DQQIvN5I",
      title: "Full Stack Developer",
    },
    {
      name: "Vivek Sharma",
      linkedin: "https://www.linkedin.com/in/viveksharma200403/",
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQGwEg3-vgWcAg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1679319386878?e=1757548800&v=beta&t=-bb_XJXiFgxvLOmZd7EGO7uVUPlNy0tsb_oazPCo3uE",
      title: "Full Stack Developer",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          <span className="text-gray-800">Meet Our </span>
          <span className="text-AC_Orange">Web Wizards</span>
        </h2>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          The talented developers who bring Application Club's digital vision to
          life, crafting seamless experiences through code.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {webTeamMembers.map((member) => (
          <div
            key={member.name}
            className="group bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300
                        border border-gray-100 relative overflow-hidden hover:-translate-y-1"
          >
            {/* Background Pattern */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0
                            group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Content Container */}
            <div className="relative z-10">
              {/* Profile Image */}
              <div className="mb-3 transform group-hover:scale-105 transition-transform duration-300">
                <img
                  className="w-16 h-16 rounded-full border-2 border-white shadow-lg mx-auto object-cover"
                  src={member.profileImage}
                  alt={member.name}
                />
              </div>

              {/* Name and Details */}
              <div className="text-center">
                <h3
                  className="font-semibold text-sm text-gray-800 mb-1 group-hover:text-AC_Orange
                                    transition-colors duration-300"
                >
                  {member.name}
                </h3>
                <div className="flex flex-wrap gap-1 justify-center mb-2">
                  <span
                    className="text-[10px] font-medium rounded-full px-2 py-0.5 bg-orange-50
                                        text-AC_Orange border border-orange-200"
                  >
                    {member.title}
                  </span>
                </div>

                {/* LinkedIn Link */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gray-600 hover:text-AC_Orange
                                        transition-colors duration-300 group/link"
                >
                  <CiLinkedin
                    size={18}
                    className="transform group-hover/link:scale-110 transition-transform duration-300"
                  />
                  <span className="text-xs font-medium">Connect</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WebTeam;
