module.exports = {
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        green: "#43B867",
        beige: "#EEE8DD",
        error: "#B00020",
      },
      fontFamily: {
        sans: ["Tahoma", "ui-sans-serif"],
      },
    },
  },
};
