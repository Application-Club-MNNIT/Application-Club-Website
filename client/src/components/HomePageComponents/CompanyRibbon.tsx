import React from "react";

const logoUrls = [
    "https://purepng.com/public/uploads/large/purepng.com-visa-logologobrand-logoiconslogos-251519938794uqvcz.png",
    "https://1000logos.net/wp-content/uploads/2022/11/PhonePe-Logo-768x432.png",
    "https://cdn.brandfetch.io/idFmniVrcu/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1750921229656",
    "https://logos-world.net/wp-content/uploads/2021/04/Morgan-Stanley-Logo-500x281.png"
];

export default function LogoRibbon() {
    return (
        <div className="overflow-hidden whitespace-nowrap w-full py-8">
            <div className="inline-block animate-scroll whitespace-nowrap">
                {logoUrls.concat(logoUrls).map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`logo-${index}`}
                        className="inline-block h-12 w-auto mx-6 object-contain"
                    />
                ))}
            </div>
        </div>
    );
}
