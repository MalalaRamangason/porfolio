import { Moon, Sun } from "lucide-react";
import { useColorTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useColorTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Moon className="w-5 h-5 text-blue-400" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
