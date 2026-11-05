import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minHeight: {
        "hero-height": "calc(100vh - 8rem)",
      },
      height: {
        custom: "max(550px, 100vh)", // Custom height utility
      },
      dropShadow: {
        custom: "0px 4.65px 3.84px 0px rgba(0, 0, 0, 0.1)", // Add custom shadow
      },
      screens: {
        xl: "1280px", // This adds an 'xl' breakpoint at 1280px
      },
      fontSize: {
        "10xl": [
          "9rem",
          {
            lineHeight: "12.5rem",
            letterSpacing: "-0.05em",
            fontWeight: "600",
          },
        ],
        "8xl": [
          "7rem",
          {
            lineHeight: "10rem",
            letterSpacing: "-0.05em",
            fontWeight: "600",
          },
        ],
        "7xl": [
          "6rem",
          {
            lineHeight: "8rem",
            letterSpacing: "-0.05em",
            fontWeight: "600",
          },
        ],
        "6xl": [
          "4.5rem",
          {
            lineHeight: "6rem",
            letterSpacing: "-0.05em",
            fontWeight: "600",
          },
        ],
        "5xl": [
          "3.8rem",
          {
            lineHeight: "6rem",
            letterSpacing: "-0.05em",
            fontWeight: "600",
          },
        ],
        "4xl": [
          "3.5rem",
          {
            lineHeight: "6rem",
            letterSpacing: "-0.05em",
            fontWeight: "600",
          },
        ],
        "3xl": [
          "3.3rem",
          {
            lineHeight: "6rem",
            letterSpacing: "-0.05em",
            fontWeight: "600",
          },
        ],
        "2.5xl": [
          "2.8rem",
          {
            lineHeight: "3rem",
            letterSpacing: "-0.05em",
            fontWeight: "600",
          },
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-aave": "linear-gradient(90deg, #2EBAC6, #B6509E)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        optimism: "#FF0420",
        compound: "#00D395",
        uniswap: "#FF007A",
        "dark-gray": "#0E100F",
        "custom-green": "#2FFF6A",
        "custom-orange": "#FF8709",
        "custom-pink": "#FEC5FB",
      },
      fontFamily: {
        redhat: ["var(--font-red-hat)"],
        mori: ["var(--font-pp-mori)"],
      },
      borderWidth: {
        "3": "3px",
        "20": "20px",
      },
    },
  },
  plugins: [],
};
export default config;
