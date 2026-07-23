import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        nova: {
          "deep-blue": "#0d1b3d",
          blue: "#1e3a8a",
          cyan: "#00b4d8",
          "cyan-light": "#6ee7f9",
          orange: "#ff7a00",
          green: "#12965d",
          "off-white": "#f7f9fc",
          "light-gray": "#e8edf5",
          gray: "#667085",
          "dark-gray": "#344054",
          black: "#101828",
        },
      },
      spacing: {
        header: "88px",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        nova: "18px",
      },
      boxShadow: {
        nova: "0 18px 45px rgba(13, 27, 61, 0.14)",
        "nova-lg": "0 30px 70px rgba(13, 27, 61, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
