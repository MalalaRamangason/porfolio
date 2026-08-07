import { useState, useRef, useEffect } from "react";
import { Palette } from "lucide-react";
import { useColorTheme } from "@/contexts/ThemeContext";

const ThemeSwitcher = () => {
  const { colorTheme, setColorTheme, themes } = useColorTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Changer le thème"
      >
        <Palette className="w-5 h-5 text-ocean-primary" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-card rounded-lg shadow-lg border border-border z-50 overflow-hidden">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => { setColorTheme(t.id); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted ${
                colorTheme === t.id ? "font-semibold text-ocean-primary" : "text-foreground"
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
