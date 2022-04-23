module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}"
  ],
  darkmode: false,
  theme: {
    extend: {
      backgroundImage: {
        "lab": "linear-gradient(to right, rgba(0, 113, 133, 0.78), rgba(0, 49, 147, 0.9)), url('/images/lab.jpg')",
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
        'lato': ['Lato'],
        'garamond': ['Garamond']
    }
    },
  },
  variants: {
    extend: {
      backgroundImage: ["lab"],
    }
  },
  plugins: [],
}
