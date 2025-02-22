import type { Config } from "tailwindcss";
import flowbite from "flowbite/plugin";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "14": "repeat(14, minmax(0, 1fr))",
        "21": "repeat(21, minmax(0, 1fr))",
        "28": "repeat(28, minmax(0, 1fr))",
        "34": "repeat(34, minmax(0, 1fr))",
        "56": "repeat(56, minmax(0, 1fr))",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      AC_Orange: "#FF9A00",
      AC_Green: "#2DBAAA",
    },
  },
  plugins: [flowbite],
};

export default config;
