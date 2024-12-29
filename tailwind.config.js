/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        mainbg: "#141618",
        secondarybg: "#1D1F22",
        thirdbg: "#282D32",
        accent: "#215ADD",
        accenthover: "#1B4AB7",
        soft: "#A1A1A1",
        swhite: "#fafafa",
      },
    },
  },
  plugins: [],
};
