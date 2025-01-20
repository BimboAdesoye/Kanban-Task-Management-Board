/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000112",
        veryDarkGrey: "#20212C",
        darkGrey: "#2B2C37",
        linesDark: "#3E3F4E",
        mediumGray: "#828FA3",
        linesLight: "#E4EBFA",
        lightGrey: "#F4F7FD",
        white: "#FFFFFF",
        purple: "#635FC7",
        purpleHover: "#A8A4FF",
        red: "#EA5555",
        redHover: "#FF9898",
      },
    },
  },
  plugins: [],
};
