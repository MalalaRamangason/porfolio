import { createContext, useContext, useEffect, useState } from "react";

const themes = [
  { id: "ocean", label: "Ocean", class: "" },
  { id: "pinky", label: "Pinky", class: "theme-pinky" },
  { id: "forest", label: "Forest", class: "theme-forest" },
  { id: "sunset", label: "Sunset", class: "theme-sunset" },
];

type ThemeContextType = {
  colorTheme: string;
  setColorTheme: (id: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  themes: typeof themes;
};

const ThemeContext = createContext<ThemeContextType>({
  colorTheme: "ocean",
  setColorTheme: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
  themes,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorTheme, setColorThemeState] = useState(() =>
    localStorage.getItem("color-theme") || "ocean"
  );

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", colorTheme);
    localStorage.setItem("color-theme", colorTheme);
  }, [colorTheme]);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const setColorTheme = (id: string) => setColorThemeState(id);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme, darkMode, toggleDarkMode, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useColorTheme = () => useContext(ThemeContext);
