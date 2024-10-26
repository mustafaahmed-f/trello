/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FFFFFF",
          200: "#F5F5F5",
          300: "#FBFDFF",
        },
        secondary: {
          100: "#6cb1c5",
        },
        state: "#DFA874",
        stateText: "#D58D49",
        highStateText: "#D8727D",
        todo: "#5030E5",
        onProgress: "#FFA500",
        done: "#8BC48A",
      },
      keyframes: {
        profileTag: {
          "0%": {
            "max-height": 0,
          },
          "100%": {
            "max-height": "900px",
          },
        },
        profileTagClose: {
          "0%": {
            "max-height": "900px",
          },
          "100%": {
            "max-height": "0",
          },
        },
        typer: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        profileTag: "profileTag 1.2s forwards ease-in-out",
        profileTagReverse: "profileTagClose 1.2s forwards ease-in-out",
        typer: "typer 0.9s linear infinite",
      },
    },
  },
  plugins: [],
};
