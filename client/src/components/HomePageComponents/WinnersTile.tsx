import React from "react";
import {CiLinkedin} from "react-icons/ci";
import {FaLinkedinIn} from "react-icons/fa";
import {BsLinkedin} from "react-icons/bs";

function WinnersTile({data}) {
    return (
        <div className="relative bg-white max-w0 rounded-md shadow-lg">
            <div className="flex flex-col justify-center items-center align-middle">
                <div className="bg-AC_Orange w-4/5 h-2 text-white rounded-md relative -top-1">.</div>
                <img
                    className="w-35 rounded-full shadow-lg relative -top-14"
                    src={data.img}
                    alt="Winners"/>
                <div className="font-medium text-xl -mt-8 mb-2">{data.text1}</div>
                <div className="text-2xl font-medium">{data.text2}</div>
                <div className="flex flex-col justify-center text-center p-2 px-4 mb-4 w-[90%]">
                    {data.names.map((name, index) => (
                        <div key={index}
                             className="flex gap-2 justify-between items-center align-middle w-full ">
                            <div>⭐{name.value}</div>
                            <a href={`https://www.linkedin.com/in/${name.linkedin}`}><BsLinkedin color="#0A66C2"
                                                                                                 size={18}/></a>
                        </div>
                    ))}
                </div>
                <div className="bg-AC_Green rounded-md w-4/5 h-2 text-white absolute -bottom-1">.</div>
            </div>
        </div>
    )

}

export default WinnersTile;