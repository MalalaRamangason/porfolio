import { useState, useEffect, useRef } from "react";
import { Palette } from "lucide-react";

const themes = [
  { id: "ocean", label: "🌊 Ocean", class: "" },
  { id: "pinky", label: "🩷 Pinky", class: "theme-pinky" },
  { id: "forest", label: "🌿 Forest", class: "theme-forest" },
  { id: "sunset", label: "🌅 Sunset", class: "theme-sunset" },
];

const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("ocean");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("color-theme") || "ocean";
    setCurrent(saved);
    applyTheme(saved);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const applyTheme = (id: string) => {
    const html = document.documentElement;
    themes.forEach((t) => { if (t.class) html.classList.remove(t.class); });
    const theme = themes.find((t) => t.id === id);
    if (theme?.class) html.classList.add(theme.class);
  };

  const select = (id: string) => {
    setCurrent(id);
    localStorage.setItem("color-theme", id);
    applyTheme(id);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Changer le thème"
      >
        <Palette className="w-5 h-5 text-ocean-primary dark:text-blue-400" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => select(t.id)}
              className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                current === t.id ? "font-semibold text-ocean-primary dark:text-blue-400" : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
