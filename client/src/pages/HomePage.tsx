import React from "react";
import Days14LineGraph from "../components/graphs/Days14LineGraph.js";
import HomePageTiles from "../components/HomePageComponents/HomePageTiles.js";
import CurrentLeads from "../components/HomePageComponents/CurrentLeads.js";
import LogoRibbon from "../components/HomePageComponents/CompanyRibbon.js";
import WinnersTile from "../components/HomePageComponents/WinnersTile.js";
import {useLoaderData} from "react-router-dom";


const HomePage = () => {

    const data = useLoaderData()['data'];
    console.log(data)

    const winnersList = [
        {
            img: "https://media.licdn.com/dms/image/v2/D4D03AQGffVrStKDTDA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1690862751291?e=1752105600&v=beta&t=so7l1RkkqfNG2hGhRrI9135OFOifTT6NrHfuXQTiTjY",
            text1: "#1st",
            text2: "Webester",
            names: [{
                value: "Jigyasu Saini",
                linkedin: "jigyasusaini"
            }, {
                value: "Tushar Gautam",
                linkedin: "jigyasusaini"
            }
            ]
        }, {
            img: "https://media.licdn.com/dms/image/v2/D4D03AQGffVrStKDTDA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1690862751291?e=1752105600&v=beta&t=so7l1RkkqfNG2hGhRrI9135OFOifTT6NrHfuXQTiTjY",
            text1: "#1st",
            text2: "Webester",
            names: [{
                value: "Jigyasu Saini",
                linkedin: "jigyasusaini"
            }, {
                value: "Tushar Gautam",
                linkedin: "jigyasusaini"
            }, {
                value: "Tushar Gautam",
                linkedin: "jigyasusaini"
            }, {
                value: "Tushar Gautam",
                linkedin: "jigyasusaini"
            }
            ]
        }
    ]

    return (
        <div className="flex w-full items-center align-middle justify-center">
            <div className="max-w-[2400px] w-full ">
                {/*hero*/}
                <div className="bg-black text-white p-4 pb-8 flex justify-center flex-col items-center align-middle">
                    <div className="text-9xl mb-18">Application Club</div>
                    <div> Club dedicated to upskill and guide freshmen of MNNIT Allahabad in alignment with current
                        industry requirements
                    </div>
                </div>

                <HomePageTiles data={data}/>
                <LogoRibbon/>
                <div className="p-4 bg-black/2">
                    <div className="text-2xl font-medium">Achievers</div>
                    <div className="grid grid-cols-5 pt-18 p-4 gap-4 ">
                        {winnersList.map((data) => <WinnersTile data={data}/>)}
                    </div>
                </div>
                <CurrentLeads/>
            </div>
        </div>
    );
};

export default HomePage;
