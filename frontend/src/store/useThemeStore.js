import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("preferred-theme") || "light",
  isDarkMode: localStorage.getItem("preferred-theme") === "dark",
  setTheme: (theme) => {
    localStorage.setItem("preferred-theme", theme);
    set({ theme, isDarkMode: theme === "dark" });
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.isDarkMode ? "light" : "dark";
      localStorage.setItem("preferred-theme", newTheme);
      return { theme: newTheme, isDarkMode: !state.isDarkMode };
    });
  },
}));