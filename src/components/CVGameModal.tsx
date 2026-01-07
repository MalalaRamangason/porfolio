import { useEffect, useState, useRef, useCallback } from "react";
import { X, Star, Sparkles, Cloud } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Star {
  id: number;
  x: number;
  y: number;
  speed: number;
  rotation: number;
  caught: boolean;
}

interface CVGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVGameModal = ({ isOpen, onClose }: CVGameModalProps) => {
  const { t, language } = useLanguage();
  const [stars, setStars] = useState<Star[]>([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastInteractionRef = useRef<number>(0);

  // Detect dark mode and mobile
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check immediately
    checkDarkMode();
    checkMobile();
    
    // Observer pour détecter les changements de thème
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // Listen to window resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setCaughtCount(0);
      setStars([]);
      setIsComplete(false);
      setShowConfetti(false);
      return;
    }

    // Generate stars scattered across the screen (not top or bottom)
    const requiredCatches = isMobile ? 3 : 5;
    const maxStars = isMobile ? 15 : 20;
    const interval = setInterval(() => {
      setStars(prev => {
        if (prev.length < maxStars) {
          const newStar: Star = {
            id: Date.now() + Math.random(),
            x: 10 + Math.random() * 80, // 10% to 90% of width
            y: 20 + Math.random() * 60, // 20% to 80% of height (avoid top and bottom)
            speed: 0, // Static stars, no falling
            rotation: Math.random() * 360,
            caught: false
          };
          return [...prev, newStar];
        }
        return prev;
      });
    }, isMobile ? 600 : 400);

    return () => clearInterval(interval);
  }, [isOpen, isMobile]);

  // Animation loop for star rotation only
  useEffect(() => {
    if (!isOpen) return;

    const animate = () => {
      const rotationSpeed = isMobile ? 0.5 : 1;
      setStars(prev => 
        prev
          .map(star => ({
            ...star,
            rotation: star.rotation + rotationSpeed
          }))
          .filter(star => !star.caught)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen, isMobile]);

  // Download CV function
  const downloadCV = useCallback(() => {
    const cvFile = language === 'en' ? 'CV-EN-Malala-Ramangason.pdf' : 'CV-FR-Malala-Ramangason.pdf';
    const link = document.createElement('a');
    link.href = `/${cvFile}`;
    link.download = cvFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [language]);

  // Check for completion
  useEffect(() => {
    const requiredCatches = isMobile ? 3 : 5;
    if (caughtCount >= requiredCatches && !isComplete) {
      setIsComplete(true);
      setShowConfetti(true);
      
      // Trigger confetti and download
      setTimeout(() => {
        downloadCV();
        setTimeout(() => {
          onClose();
        }, 2000);
      }, 1500);
    }
  }, [caughtCount, isComplete, onClose, isMobile, downloadCV]);

  const catchStar = (starId: number) => {
    setStars(prev => prev.map(star => 
      star.id === starId ? { ...star, caught: true } : star
    ));
    setCaughtCount(prev => prev + 1);
  };

  const handleStarInteraction = (e: React.MouseEvent | React.TouchEvent, starId: number) => {
    // Only preventDefault for mouse events, not touch (passive listeners)
    if (e.type === 'click') {
      e.preventDefault();
    }
    e.stopPropagation();
    
    // Éviter les doubles clics (touch + click)
    const now = Date.now();
    if (now - lastInteractionRef.current < 200) {
      return; // Ignorer si moins de 200ms depuis la dernière interaction
    }
    lastInteractionRef.current = now;
    
    // Haptic feedback for mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    catchStar(starId);
  };

  const skipGame = () => {
    downloadCV();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Background adapté au thème */}
      <div 
        className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-blue-950 via-indigo-950 to-blue-900'
            : 'bg-gradient-to-b from-sky-300 via-blue-200 to-blue-100'
        }`}
        onClick={onClose}
      >
        {/* Swirling background effect */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-3xl animate-pulse"
              style={{
                background: isDarkMode
                  ? (i % 3 === 0 
                      ? 'radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, transparent 70%)'
                      : i % 3 === 1
                      ? 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)')
                  : (i % 3 === 0
                      ? 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)'
                      : i % 3 === 1
                      ? 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(186, 230, 253, 0.3) 0%, transparent 70%)'),
                width: `${150 + Math.random() * 250}px`,
                height: `${150 + Math.random() * 250}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Game container */}
      <div ref={gameRef} className="relative w-full h-full">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 z-50 p-2 rounded-full transition-all shadow-lg border-2 ${
            isDarkMode
              ? 'bg-blue-950/90 hover:bg-blue-900 border-yellow-400/50'
              : 'bg-white/90 hover:bg-white border-blue-400/50'
          }`}
        >
          <X className={`w-6 h-6 ${isDarkMode ? 'text-yellow-300' : 'text-blue-600'}`} />
        </button>

        {/* Message box */}
        <div className="absolute top-16 sm:top-1/4 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 z-40 text-center px-4">
          <div className={`backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-2xl border-2 max-w-md ${
            isDarkMode
              ? 'bg-blue-950/90 border-yellow-400/50'
              : 'bg-white/90 border-blue-400/50'
          }`}>
            {isDarkMode ? (
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-300 mx-auto mb-3 sm:mb-4 animate-pulse drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
            ) : (
              <Cloud className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4 animate-pulse drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
            )}
            <h2 className={`text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 drop-shadow-lg ${
              isDarkMode ? 'text-yellow-300' : 'text-blue-600'
            }`}>
              {isDarkMode ? t('game_title_night') : t('game_title_day')}
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed ${
              isDarkMode ? 'text-blue-100' : 'text-gray-700'
            }`}>
              {t('game_instruction')} <span className={`font-bold text-2xl ${
                isDarkMode ? 'text-yellow-400' : 'text-blue-600'
              }`}>{(isMobile ? 3 : 5) - caughtCount} {isDarkMode ? t('game_stars') : t('game_clouds')}</span> {t('game_unlock')}
            </p>
          </div>
        </div>

        {/* Stars ou Clouds selon le mode */}
        {stars.map(star => (
          <button
            key={star.id}
            onClick={(e) => handleStarInteraction(e, star.id)}
            onTouchEnd={(e) => handleStarInteraction(e, star.id)}
            className="absolute transition-all duration-500 hover:scale-125 active:scale-150 cursor-pointer group z-30"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: `rotate(${star.rotation}deg)`,
              pointerEvents: star.caught ? 'none' : 'auto',
              opacity: star.caught ? 0 : 1,
              touchAction: 'none'
            }}
          >
            {isDarkMode ? (
              // Étoile pour le mode nuit
              <div className={`relative ${isMobile ? 'w-24 h-24' : 'w-16 h-16 sm:w-20 sm:h-20'}`}>
                {/* Multiple layered glows */}
                <div className="absolute inset-0 bg-gradient-radial from-yellow-300/60 via-amber-400/40 to-transparent rounded-full blur-3xl scale-150 animate-pulse" 
                     style={{ animationDuration: '3s' }} />
                <div className="absolute inset-0 bg-gradient-radial from-orange-400/50 via-yellow-500/30 to-transparent rounded-full blur-2xl scale-125 animate-pulse" 
                     style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
                
                {/* Star icon */}
                <Star className={`absolute inset-0 m-auto ${isMobile ? 'w-14 h-14' : 'w-10 h-10 sm:w-12 sm:h-12'} text-yellow-300 fill-yellow-300 drop-shadow-[0_0_20px_rgba(234,179,8,1)]`} />
              </div>
            ) : (
              // Nuage pour le mode jour
              <div className={`relative ${isMobile ? 'w-28 h-28' : 'w-20 h-20 sm:w-24 sm:h-24'}`}>
                {/* Glow pour le nuage */}
                <div className="absolute inset-0 bg-gradient-radial from-blue-200/60 via-sky-300/40 to-transparent rounded-full blur-2xl scale-150 animate-pulse" 
                     style={{ animationDuration: '3s' }} />
                <div className="absolute inset-0 bg-gradient-radial from-white/80 via-blue-100/50 to-transparent rounded-full blur-xl scale-125 animate-pulse" 
                     style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
                
                {/* Cloud icon */}
                <Cloud className={`absolute inset-0 m-auto ${isMobile ? 'w-16 h-16' : 'w-12 h-12 sm:w-14 sm:h-14'} text-white fill-white drop-shadow-[0_0_20px_rgba(147,197,253,1)]`} />
              </div>
            )}
          </button>
        ))}

        {/* Skip button */}
        <button
          onClick={skipGame}
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl backdrop-blur-md transition-all shadow-lg border-2 ${
            isDarkMode
              ? 'bg-blue-950/80 hover:bg-blue-900/90 border-yellow-400/50 text-yellow-300'
              : 'bg-white/80 hover:bg-white/90 border-blue-400/50 text-blue-600'
          }`}
        >
          {t('game_skip')}
        </button>

        {/* Progress counter */}
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-40">
          <div className={`backdrop-blur-md rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-xl border-2 ${
            isDarkMode
              ? 'bg-blue-950/90 border-yellow-400/50'
              : 'bg-white/90 border-blue-400/50'
          }`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-blue-100' : 'text-gray-700'}`}>
                {t('game_progress')}
              </span>
              <div className="flex gap-1 sm:gap-2">
                {[...Array(isMobile ? 3 : 5)].map((_, i) => (
                  isDarkMode ? (
                    <Star
                      key={i}
                      className={`w-5 h-5 sm:w-7 sm:h-7 transition-all duration-300 ${
                        i < caughtCount 
                          ? 'fill-yellow-400 text-yellow-500 scale-125 drop-shadow-[0_0_15px_rgba(234,179,8,1)]' 
                          : 'fill-blue-900 text-blue-800'
                      }`}
                    />
                  ) : (
                    <Cloud
                      key={i}
                      className={`w-5 h-5 sm:w-7 sm:h-7 transition-all duration-300 ${
                        i < caughtCount 
                          ? 'fill-blue-500 text-blue-600 scale-125 drop-shadow-[0_0_15px_rgba(59,130,246,1)]' 
                          : 'fill-gray-300 text-gray-400'
                      }`}
                    />
                  )
                ))}
              </div>
              <span className={`font-bold text-lg sm:text-xl ml-1 sm:ml-2 ${isDarkMode ? 'text-yellow-400' : 'text-blue-600'}`}>
                {caughtCount}/{isMobile ? 3 : 5}
              </span>
            </div>
          </div>
        </div>

        {/* Confetti */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random()}s`
                }}
              >
                <div
                  className="w-3 h-3 rounded-full shadow-lg"
                  style={{
                    backgroundColor: ['#facc15', '#fb923c', '#3b82f6', '#eab308', '#fbbf24'][Math.floor(Math.random() * 5)],
                    transform: `rotate(${Math.random() * 360}deg)`,
                    boxShadow: '0 0 10px currentColor'
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Success message - adapté au thème */}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className={`backdrop-blur-md rounded-3xl p-12 shadow-2xl border-4 animate-in zoom-in duration-500 ${
              isDarkMode 
                ? 'bg-blue-950/95 border-yellow-400' 
                : 'bg-white/95 border-blue-400'
            }`}>
              <div className="text-center">
                <div className={`w-24 h-24 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce ${
                  isDarkMode
                    ? 'from-yellow-400 to-amber-500 shadow-[0_0_50px_rgba(234,179,8,0.9)]'
                    : 'from-blue-400 to-sky-500 shadow-[0_0_50px_rgba(59,130,246,0.9)]'
                }`}>
                  <Sparkles className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <h3 className={`text-5xl font-bold mb-3 ${
                  isDarkMode
                    ? 'text-yellow-300 drop-shadow-[0_0_25px_rgba(234,179,8,0.9)]'
                    : 'text-blue-600 drop-shadow-[0_0_25px_rgba(59,130,246,0.9)]'
                }`}>
                  {isDarkMode ? t('game_success_night') : t('game_success_day')}
                </h3>
                <p className={`text-xl ${isDarkMode ? 'text-blue-100' : 'text-gray-700'}`}>
                  {t('game_downloading')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CVGameModal;