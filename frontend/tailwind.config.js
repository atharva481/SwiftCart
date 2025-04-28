import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        pastel: {
          "primary": "#b7e4c7",
          "secondary": "#d8b4fe",
          "base-100": "#ffd8d8",
        },
        retro: {
          "primary": "#ef9995",
          "secondary": "#a4cbb4",
          "base-100": "#e2d5bc",
        },
        coffee: {
          "primary": "#A67C58",
          "secondary": "#807666",
          "base-100": "#20161F",
        },
        forest: {
          "primary": "#2B4C3F",
          "secondary": "#6BAA75",
          "base-100": "#171212",
        },
        cyberpunk: {
          "primary": "#00FFFF",
          "secondary": "#FF7598",
          "base-100": "#FF00FF",
        },
        synthwave: {
          "primary": "#FF1E9E",
          "secondary": "#1EDBFF",
          "base-100": "#2D1B69",
        },
        luxury: {
          "primary": "#B6862D",
          "secondary": "#E2C697",
          "base-100": "#171618",
        },
        autumn: {
          "primary": "#D27548",
          "secondary": "#BA4A00",
          "base-100": "#D8B4A0",
        },
        valentine: {
          "primary": "#FF8FAB",
          "secondary": "#FFB3C6",
          "base-100": "#E96D7B",
        },
        aqua: {
          "primary": "#06B6D4",
          "secondary": "#0EA5E9",
          "base-100": "#2DD4BF",
        },
        business: {
          "primary": "#0091D5",
          "secondary": "#7DB9DE",
          "base-100": "#1C4E80",
        },
        night: {
          "primary": "#334155",
          "secondary": "#64748B",
          "base-100": "#0F172A",
        },
        dracula: {
          "primary": "#BD93F9",
          "secondary": "#FF79C6",
          "base-100": "#282A36",
        },
        light: {
          "primary": "#570df8",
          "secondary": "#f000b8",
          "base-100": "#ffffff",
        },
        dark: {
          "primary": "#570df8",
          "secondary": "#f000b8",
          "base-100": "#1d232a",
        },
      }
    ],
  },
};
