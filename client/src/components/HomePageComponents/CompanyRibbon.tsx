import React from "react";

const logoUrls = [
        {
            url: "https://purepng.com/public/uploads/large/purepng.com-visa-logologobrand-logoiconslogos-251519938794uqvcz.png",
            alt: "VISA"
        }, {
            url: "https://1000logos.net/wp-content/uploads/2022/11/PhonePe-Logo-768x432.png",
            alt: "PhonePe"
        }, {
            url: "https://cdn.brandfetch.io/idFmniVrcu/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1750921229656",
            alt: "meow"
        }, {
            url: "https://logos-world.net/wp-content/uploads/2021/04/Morgan-Stanley-Logo-500x281.png",
            alt: "Morgan Stanley"
        }, {
            url: "https://purepng.com/public/uploads/large/purepng.com-texas-instruments-brands-logologobrand-logoiconslogos-251519938741vfzmi.png",
            alt: "Texas Instruments"
        }
    ]
;

export default function LogoRibbon() {
    const duplicatedLogos = [...logoUrls, ...logoUrls];

    return (
        <div className="relative py-4 bg-gradient-to-r from-gray-100 via-white to-gray-100 overflow-hidden">
            {/* Fade effects on edges */}
            <div
                className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-100 to-transparent z-10"></div>
            <div
                className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-100 to-transparent z-10"></div>

            {/* Logo container with smooth scroll animation */}
            <div
                className="flex"
                style={{
                    animation: 'scroll 30s linear infinite',
                    willChange: 'transform'
                }}
            >
                {duplicatedLogos.map((logo, index) => (
                    <div
                        key={index}
                        className="mx-12 flex items-center justify-center filter hover:scale-110 cursor-pointer"
                        style={{
                            willChange: 'transform'
                        }}
                    >
                        <img
                            src={logo.url}
                            alt={logo.alt}
                            className="h-16 w-auto object-contain transition-all duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
