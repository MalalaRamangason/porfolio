import { useEffect, useState, useRef, useCallback } from "react";
import { X, Star, Sparkles, Cloud, Trees, Sun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useColorTheme } from "@/contexts/ThemeContext";

interface Item {
  id: number;
  x: number;
  y: number;
  rotation: number;
  caught: boolean;
}

interface CVGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ThemeConfig = {
  bg: string;
  bgDark: string;
  accent: string;
  accentDark: string;
  border: string;
  borderDark: string;
  textAccent: string;
  textAccentDark: string;
  itemLabel: string;
  titleKey: string;
  successKey: string;
  icon: React.ReactNode;
  iconDark: React.ReactNode;
  progressIcon: (caught: boolean) => React.ReactNode;
  progressIconDark: (caught: boolean) => React.ReactNode;
  glow: string;
  glowDark: string;
  confettiColors: string[];
};

const CVGameModal = ({ isOpen, onClose }: CVGameModalProps) => {
  const { t, language } = useLanguage();
  const { colorTheme, darkMode } = useColorTheme();
  const [items, setItems] = useState<Item[]>([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const animationRef = useRef<number>();
  const lastInteractionRef = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const themeConfigs: Record<string, ThemeConfig> = {
    ocean: {
      bg: "bg-gradient-to-b from-sky-300 via-blue-200 to-blue-100",
      bgDark: "bg-gradient-to-b from-blue-950 via-indigo-950 to-blue-900",
      accent: "border-blue-400/50",
      accentDark: "border-yellow-400/50",
      border: "bg-white/90",
      borderDark: "bg-blue-950/90",
      textAccent: "text-blue-600",
      textAccentDark: "text-yellow-300",
      itemLabel: t("game_clouds"),
      titleKey: darkMode ? t("game_title_night") : t("game_title_day"),
      successKey: darkMode ? t("game_success_night") : t("game_success_day"),
      icon: <Cloud className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 animate-pulse drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />,
      iconDark: <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-300 mx-auto mb-3 animate-pulse drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />,
      progressIcon: (caught) => <Cloud className={`w-5 h-5 sm:w-7 sm:h-7 transition-all duration-300 ${caught ? "fill-blue-500 text-blue-600 scale-125 drop-shadow-[0_0_15px_rgba(59,130,246,1)]" : "fill-gray-300 text-gray-400"}`} />,
      progressIconDark: (caught) => <Star className={`w-5 h-5 sm:w-7 sm:h-7 transition-all duration-300 ${caught ? "fill-yellow-400 text-yellow-500 scale-125 drop-shadow-[0_0_15px_rgba(234,179,8,1)]" : "fill-blue-900 text-blue-800"}`} />,
      glow: "drop-shadow-[0_0_20px_rgba(147,197,253,1)]",
      glowDark: "drop-shadow-[0_0_20px_rgba(234,179,8,1)]",
      confettiColors: ["#3b82f6", "#93c5fd", "#bfdbfe", "#facc15", "#60a5fa"],
    },
    pinky: {
      bg: "bg-gradient-to-b from-pink-200 via-rose-100 to-fuchsia-100",
      bgDark: "bg-gradient-to-b from-pink-950 via-rose-950 to-fuchsia-950",
      accent: "border-pink-400/50",
      accentDark: "border-pink-400/50",
      border: "bg-white/90",
      borderDark: "bg-pink-950/90",
      textAccent: "text-pink-500",
      textAccentDark: "text-pink-300",
      itemLabel: t("game_bows"),
      titleKey: "So Girly! 🎀",
      successKey: t("game_success_pinky"),
      icon: <span className="text-5xl mx-auto mb-3 block text-center animate-bounce">🎀</span>,
      iconDark: <span className="text-5xl mx-auto mb-3 block text-center animate-bounce">🎀</span>,
      progressIcon: (caught) => <span className={`text-xl transition-all duration-300 ${caught ? "scale-125" : "opacity-40"}`}>🎀</span>,
      progressIconDark: (caught) => <span className={`text-xl transition-all duration-300 ${caught ? "scale-125" : "opacity-40"}`}>🎀</span>,
      glow: "drop-shadow-[0_0_20px_rgba(244,114,182,1)]",
      glowDark: "drop-shadow-[0_0_20px_rgba(244,114,182,1)]",
      confettiColors: ["#f472b6", "#ec4899", "#fb7185", "#f9a8d4", "#fda4af"],
    },
    forest: {
      bg: "bg-gradient-to-b from-green-200 via-emerald-100 to-lime-100",
      bgDark: "bg-gradient-to-b from-green-950 via-emerald-950 to-green-900",
      accent: "border-green-400/50",
      accentDark: "border-green-400/50",
      border: "bg-white/90",
      borderDark: "bg-green-950/90",
      textAccent: "text-green-600",
      textAccentDark: "text-green-300",
      itemLabel: t("game_trees"),
      titleKey: "Into the Forest! 🌿",
      successKey: t("game_success_forest"),
      icon: <span className="text-5xl mx-auto mb-3 block text-center animate-bounce">🌳</span>,
      iconDark: <span className="text-5xl mx-auto mb-3 block text-center animate-bounce">🌲</span>,
      progressIcon: (caught) => <span className={`text-xl transition-all duration-300 ${caught ? "scale-125" : "opacity-40"}`}>🌳</span>,
      progressIconDark: (caught) => <span className={`text-xl transition-all duration-300 ${caught ? "scale-125" : "opacity-40"}`}>🌲</span>,
      glow: "drop-shadow-[0_0_20px_rgba(74,222,128,1)]",
      glowDark: "drop-shadow-[0_0_20px_rgba(74,222,128,1)]",
      confettiColors: ["#4ade80", "#22c55e", "#86efac", "#bbf7d0", "#a3e635"],
    },
    sunset: {
      bg: "bg-gradient-to-b from-orange-200 via-amber-100 to-rose-100",
      bgDark: "bg-gradient-to-b from-orange-950 via-amber-950 to-rose-950",
      accent: "border-orange-400/50",
      accentDark: "border-orange-400/50",
      border: "bg-white/90",
      borderDark: "bg-orange-950/90",
      textAccent: "text-orange-500",
      textAccentDark: "text-orange-300",
      itemLabel: t("game_suns"),
      titleKey: "Golden Hour! 🌅",
      successKey: t("game_success_sunset"),
      icon: <span className="text-5xl mx-auto mb-3 block text-center animate-spin" style={{ animationDuration: "4s" }}>☀️</span>,
      iconDark: <span className="text-5xl mx-auto mb-3 block text-center animate-spin" style={{ animationDuration: "4s" }}>🌅</span>,
      progressIcon: (caught) => <span className={`text-xl transition-all duration-300 ${caught ? "scale-125" : "opacity-40"}`}>☀️</span>,
      progressIconDark: (caught) => <span className={`text-xl transition-all duration-300 ${caught ? "scale-125" : "opacity-40"}`}>🌅</span>,
      glow: "drop-shadow-[0_0_20px_rgba(251,146,60,1)]",
      glowDark: "drop-shadow-[0_0_20px_rgba(251,146,60,1)]",
      confettiColors: ["#fb923c", "#f97316", "#fbbf24", "#fde68a", "#fca5a5"],
    },
  };

  const cfg = themeConfigs[colorTheme] || themeConfigs.ocean;
  const required = isMobile ? 3 : 5;

  const renderItem = (item: Item) => {
    const isOcean = colorTheme === "ocean";
    if (isOcean) {
      return darkMode ? (
        <div className={`relative ${isMobile ? "w-24 h-24" : "w-16 h-16 sm:w-20 sm:h-20"}`}>
          <div className="absolute inset-0 bg-yellow-300/40 rounded-full blur-3xl scale-150 animate-pulse" />
          <Star className={`absolute inset-0 m-auto ${isMobile ? "w-14 h-14" : "w-10 h-10 sm:w-12 sm:h-12"} text-yellow-300 fill-yellow-300 ${cfg.glowDark}`} />
        </div>
      ) : (
        <div className={`relative ${isMobile ? "w-28 h-28" : "w-20 h-20 sm:w-24 sm:h-24"}`}>
          <div className="absolute inset-0 bg-blue-200/60 rounded-full blur-2xl scale-150 animate-pulse" />
          <Cloud className={`absolute inset-0 m-auto ${isMobile ? "w-16 h-16" : "w-12 h-12 sm:w-14 sm:h-14"} text-white fill-white ${cfg.glow}`} />
        </div>
      );
    }
    // Emoji items for other themes
    const emojis: Record<string, string[]> = {
      pinky: ["🎀", "🩷", "💗"],
      forest: darkMode ? ["🌲", "🌿", "🍃"] : ["🌳", "🌿", "🍀"],
      sunset: darkMode ? ["🌅", "🌄", "🌇"] : ["☀️", "🌤️", "🌞"],
    };
    const list = emojis[colorTheme] || ["⭐"];
    const emoji = list[Math.floor(item.id) % list.length] || list[0];
    return (
      <div className={`relative ${isMobile ? "w-24 h-24" : "w-16 h-16 sm:w-20 sm:h-20"} flex items-center justify-center`}>
        <div className={`absolute inset-0 rounded-full blur-2xl scale-150 animate-pulse opacity-50`}
          style={{ background: `radial-gradient(circle, ${cfg.confettiColors[0]}60, transparent)` }} />
        <span className={`${isMobile ? "text-5xl" : "text-4xl sm:text-5xl"} select-none`}>{emoji}</span>
      </div>
    );
  };

  useEffect(() => {
    if (!isOpen) {
      setCaughtCount(0);
      setItems([]);
      setIsComplete(false);
      setShowConfetti(false);
      return;
    }
    const max = isMobile ? 15 : 20;
    const interval = setInterval(() => {
      setItems(prev => {
        if (prev.length < max) {
          return [...prev, {
            id: Date.now() + Math.random(),
            x: 10 + Math.random() * 80,
            y: 20 + Math.random() * 60,
            rotation: Math.random() * 360,
            caught: false,
          }];
        }
        return prev;
      });
    }, isMobile ? 600 : 400);
    return () => clearInterval(interval);
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (!isOpen) return;
    const animate = () => {
      setItems(prev => prev.map(i => ({ ...i, rotation: i.rotation + (isMobile ? 0.5 : 1) })).filter(i => !i.caught));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isOpen, isMobile]);

  const downloadCV = useCallback(() => {
    const cvFile = language === "en" ? "CV-EN-Malala-Ramangason.pdf" : "CV-FR-Malala-Ramangason.pdf";
    const link = document.createElement("a");
    link.href = `/${cvFile}`;
    link.download = cvFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [language]);

  useEffect(() => {
    if (caughtCount >= required && !isComplete) {
      setIsComplete(true);
      setShowConfetti(true);
      setTimeout(() => {
        downloadCV();
        setTimeout(() => onClose(), 2000);
      }, 1500);
    }
  }, [caughtCount, isComplete, required, downloadCV, onClose]);

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent, id: number) => {
    if (e.type === "click") e.preventDefault();
    e.stopPropagation();
    const now = Date.now();
    if (now - lastInteractionRef.current < 200) return;
    lastInteractionRef.current = now;
    if ("vibrate" in navigator) navigator.vibrate(50);
    setItems(prev => prev.map(i => i.id === id ? { ...i, caught: true } : i));
    setCaughtCount(prev => prev + 1);
  };

  if (!isOpen) return null;

  const bgClass = darkMode ? cfg.bgDark : cfg.bg;
  const borderClass = darkMode ? cfg.borderDark : cfg.border;
  const accentClass = darkMode ? cfg.accentDark : cfg.accent;
  const textClass = darkMode ? cfg.textAccentDark : cfg.textAccent;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${bgClass}`} onClick={onClose}>
        <div className="absolute inset-0 opacity-40">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full blur-3xl animate-pulse"
              style={{
                background: `radial-gradient(circle, ${cfg.confettiColors[i % cfg.confettiColors.length]}50, transparent)`,
                width: `${150 + Math.random() * 200}px`,
                height: `${150 + Math.random() * 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full h-full">
        {/* Close */}
        <button onClick={onClose} className={`absolute top-6 right-6 z-50 p-2 rounded-full shadow-lg border-2 ${borderClass} ${accentClass}`}>
          <X className={`w-6 h-6 ${textClass}`} />
        </button>

        {/* Message box */}
        <div className="absolute top-16 sm:top-1/4 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 z-40 text-center px-4">
          <div className={`backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-2xl border-2 max-w-md ${borderClass} ${accentClass}`}>
            {darkMode ? cfg.iconDark : cfg.icon}
            <h2 className={`text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 ${textClass}`}>{cfg.titleKey}</h2>
            <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? "text-white/80" : "text-gray-700"}`}>
              {t("game_instruction")} <span className={`font-bold text-2xl ${textClass}`}>{required - caughtCount} {cfg.itemLabel}</span> {t("game_unlock")}
            </p>
          </div>
        </div>

        {/* Items */}
        {items.map(item => (
          <button
            key={item.id}
            onClick={(e) => handleInteraction(e, item.id)}
            onTouchEnd={(e) => handleInteraction(e, item.id)}
            className="absolute transition-all duration-500 hover:scale-125 active:scale-150 cursor-pointer z-30"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `rotate(${item.rotation}deg)`,
              pointerEvents: item.caught ? "none" : "auto",
              opacity: item.caught ? 0 : 1,
              touchAction: "none",
            }}
          >
            {renderItem(item)}
          </button>
        ))}

        {/* Skip */}
        <button onClick={() => { downloadCV(); onClose(); }}
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl backdrop-blur-md shadow-lg border-2 ${borderClass} ${accentClass} ${textClass}`}>
          {t("game_skip")}
        </button>

        {/* Progress */}
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-40">
          <div className={`backdrop-blur-md rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-xl border-2 ${borderClass} ${accentClass}`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className={`font-medium text-sm sm:text-base ${darkMode ? "text-white/80" : "text-gray-700"}`}>{t("game_progress")}</span>
              <div className="flex gap-1 sm:gap-2">
                {[...Array(required)].map((_, i) =>
                  darkMode
                    ? <span key={i}>{cfg.progressIconDark(i < caughtCount)}</span>
                    : <span key={i}>{cfg.progressIcon(i < caughtCount)}</span>
                )}
              </div>
              <span className={`font-bold text-lg sm:text-xl ml-1 ${textClass}`}>{caughtCount}/{required}</span>
            </div>
          </div>
        </div>

        {/* Confetti */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(60)].map((_, i) => (
              <div key={i} className="absolute animate-confetti"
                style={{ left: `${Math.random() * 100}%`, top: "-10%", animationDelay: `${Math.random() * 0.5}s`, animationDuration: `${2 + Math.random()}s` }}>
                <div className="w-3 h-3 rounded-full shadow-lg"
                  style={{ backgroundColor: cfg.confettiColors[i % cfg.confettiColors.length], transform: `rotate(${Math.random() * 360}deg)` }} />
              </div>
            ))}
          </div>
        )}

        {/* Success */}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className={`backdrop-blur-md rounded-3xl p-12 shadow-2xl border-4 animate-in zoom-in duration-500 ${borderClass} ${accentClass}`}>
              <div className="text-center">
                <div className="text-6xl mb-6 animate-bounce text-center">
                  {colorTheme === "pinky" ? "🎀" : colorTheme === "forest" ? "🌳" : colorTheme === "sunset" ? "☀️" : darkMode ? "🌟" : "☁️"}
                </div>
                <h3 className={`text-5xl font-bold mb-3 ${textClass}`}>{cfg.successKey}</h3>
                <p className={`text-xl ${darkMode ? "text-white/80" : "text-gray-700"}`}>{t("game_downloading")}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti { animation: confetti linear forwards; }
      `}</style>
    </div>
  );
};

export default CVGameModal;
