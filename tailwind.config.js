module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        exs: "0.6rem",
      },
      colors: {
        back: "#F7F7F7",
        background: "#2A363F",
        cyanShade: "#6ED9A0",
        whiteShade: "#f6f8f7",
      },

      height: {
        400: "400px",
        500: "500px",
        550: "550px",
        600: "600px",
      },
      width: {
        400: "400px",
        500: "500px",
        600: "600px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
