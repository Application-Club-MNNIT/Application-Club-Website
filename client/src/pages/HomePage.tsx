import React from "react";
import HomePageTiles from "../components/HomePageComponents/HomePageTiles.js";
import CurrentLeads from "../components/HomePageComponents/CurrentLeads.js";
import LogoRibbon from "../components/HomePageComponents/CompanyRibbon.js";
import WinnersTile from "../components/HomePageComponents/WinnersTile.js";
import { NavLink, useLoaderData } from "react-router-dom";
import WebTeam from "../components/HomePageComponents/WebTeam.js";
import ImageCollage from "../components/HomePageComponents/ImageCollage.js";


const HomePage = () => {

    const data = useLoaderData()['data'];

    const winnersList = [
        {
            text1: "Winner",
            text2: "Devjam 2k25",
            team: "4Sum",
            link: "https://www.instagram.com/p/DGOZpd3zeSU/?igsh=MWdibGNsZTJqbG5pOA",
            names: [
                { value: "Chinmay Borah 2024CA030", linkedin: "chinmay-borah-46a865229" },
                { value: "Manish sharma 2024CA053", linkedin: "manish-sharma26" },
                { value: "Shubham gupta 2024CA097", linkedin: "shubham-gupta-593787219" },
                { value: "Sanyam Goel 2024CA091", linkedin: "iamsanyamgoel" }
            ]
        },
        {
            text1: "Runner Up",
            text2: "Devjam",
            team: "Mummy Ke Laadale",
            link: "https://www.instagram.com/p/DGOZpd3zeSU/?igsh=MWdibGNsZTJqbG5pOA",
            names: [
                { value: "Desh Deepak Kushwaha 2024CA033", linkedin: "deshdeepakkushwaha" },
                { value: "Sujeet Mahto 2024CA103", linkedin: "sujeetmahto" },
                { value: "Rajat Shukla 2024CA077", linkedin: "shukla-rajat" },
                { value: "Rituraj Singh 2024CA082", linkedin: "gintoki027" }
            ]
        }, ,
        {
            text1: "#4th",
            text2: "Hack 36 8.0",
            team: "4Sum",
            link: "https://www.linkedin.com/feed/update/urn:li:activity:7323102975856443392/",
            names: [
                { value: "Chinmay Borah 2024CA030", linkedin: "chinmay-borah-46a865229" },
                { value: "Manish sharma 2024CA053", linkedin: "manish-sharma26" },
                { value: "Shubham gupta 2024CA097", linkedin: "shubham-gupta-593787219" },
                { value: "Sanyam Goel 2024CA091", linkedin: "iamsanyamgoel" }
            ]
        },
        {
            text1: "#10th",
            text2: "Hack 36 8.0",
            team: "Mummy Ke Laadale",
            link: "https://www.instagram.com/p/DGOZpd3zeSU/?igsh=MWdibGNsZTJqbG5pOA",
            names: [
                { value: "Desh Deepak Kushwaha 2024CA033", linkedin: "deshdeepakkushwaha" },
                { value: "Sujeet Mahto 2024CA103", linkedin: "sujeetmahto" },
                { value: "Rajat Shukla 2024CA077", linkedin: "shukla-rajat" },
                { value: "Rituraj Singh 2024CA082", linkedin: "gintoki027" }
            ]
        },
        {
            text1: "Runner Up",
            text2: "DevOrDie",
            team: "X76",
            link: "",
            names: [
                { value: "Desh Deepak Kushwaha 2024CA033", linkedin: "deshdeepakkushwaha" },
                { value: "Rajat Shukla 2024CA077", linkedin: "shukla-rajat" },
                { value: "Rituraj Singh 2024CA082", linkedin: "gintoki027" }
            ]
        }, {
            text1: "Special Mention",
            text2: "Softablitz 2k24",
            team: "JavaJammers",
            link: "",
            names: [
                { value: "Manish Sharma 2024CA053", linkedin: "manish-sharma26" },
                { value: "Shubham Gupta 2024CA097", linkedin: "shubham-gupta-593787219" },
                { value: "Mayank Agarwal 2024CA054", linkedin: "amayank071" }
            ]
        },
        {
            text1: "Winner",
            text2: "MNNIT Grand Prix 2025",
            link: "https://www.instagram.com/p/DIZhhLITBON/?igsh=YXZwYjBhaHFvM29n",
            names: [
                { value: "Bankim Chandra Das 2024CA026", linkedin: "bankim-ch" }
            ]
        },
        {
            text1: "#2nd",
            text2: "Contrihub 2k24",
            link: "https://www.linkedin.com/posts/vishal-minj-a8106825b_i-got-the-hacktoberfest-2024-level-4-badge-activity-7260305734372917248-RtGz/",
            names: [
                { value: "Vishal Minj 2024CA113", linkedin: "vishal-minj-a8106825b" }
            ]
        },
        {
            text1: "#3rd",
            text2: "The Voice of Culrav 2k24",
            link: "https://www.linkedin.com/in/suchismita-roy-b74254319/",
            names: [
                { value: "Suchismita Roy 2024CA102", linkedin: "suchismita-roy-b74254319" }
            ]
        },

    ];


    return (
        <div className="flex w-full items-center align-middle justify-center">
            <div className="max-w-[2400px] w-full">
                {/* Hero Section */}
                <div className="relative min-h-[80vh] bg-gradient-to-br from-black via-neutral-900 to-black text-white">
                    {/* Background Pattern */}
                    <div
                        className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_rgb(200,200,200)_1px,_transparent_0)] bg-[size:40px_40px]"></div>

                    <div className="relative flex flex-col items-center justify-center px-4 py-20 sm:py-32">
                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 bg-gradient-to-r from-white via-AC_Orange to-white bg-clip-text text-transparent">
                            Application Club
                        </h1>

                        {/* Description */}
                        <div className="max-w-4xl text-center space-y-6">
                            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                                A student-led initiative at MNNIT Allahabad where selected MCA students annually take on
                                leadership roles to mentor and upskill their juniors.
                            </p>
                            <p className="text-base sm:text-lg text-gray-400">
                                Dedicated to upskill and guide freshmen of MNNIT Allahabad in alignment with current
                                industry requirements.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-12 justify-center">
                            <NavLink to="/signup" className="px-8 py-3 bg-AC_Orange text-black font-semibold rounded-lg
                                hover:bg-AC_Orange/90 transition-all duration-300 transform hover:-translate-y-1">
                                Join Us
                            </NavLink>
                            <a href="#logos" className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg
                                border-2 border-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>

                {/* Rest of the sections */}
                <div id="logos"></div>
                <LogoRibbon />
                <div className="bg-gradient-to-br from-gray-50 to-white">
                    <HomePageTiles data={data} />
                </div>
                <ImageCollage />
                {winnersList.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Achievers</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                            {winnersList.map((data) => <WinnersTile key={data.text1 + data.text2} data={data} />)}
                        </div>
                    </div>
                )}
                <CurrentLeads />
                <WebTeam />
            </div>
        </div>
    );
};

export default HomePage;
