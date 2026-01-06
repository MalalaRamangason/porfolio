import { useEffect, useState, useRef } from "react";
import { X, Star, Sparkles } from "lucide-react";
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
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastInteractionRef = useRef<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setCaughtCount(0);
      setStars([]);
      setIsComplete(false);
      setShowConfetti(false);
      return;
    }

    // Generate stars scattered across the screen (not top or bottom)
    const interval = setInterval(() => {
      if (stars.length < 20 && caughtCount < 5) {
        const newStar: Star = {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80, // 10% to 90% of width
          y: 20 + Math.random() * 60, // 20% to 80% of height (avoid top and bottom)
          speed: 0, // Static stars, no falling
          rotation: Math.random() * 360,
          caught: false
        };
        setStars(prev => [...prev, newStar]);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isOpen, stars.length, caughtCount]);

  // Animation loop for star rotation only
  useEffect(() => {
    if (!isOpen) return;

    const animate = () => {
      setStars(prev => 
        prev
          .map(star => ({
            ...star,
            rotation: star.rotation + 1
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
  }, [isOpen]);

  // Check for completion
  useEffect(() => {
    if (caughtCount >= 5 && !isComplete) {
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
  }, [caughtCount, isComplete, onClose]);

  const catchStar = (starId: number) => {
    setStars(prev => prev.map(star => 
      star.id === starId ? { ...star, caught: true } : star
    ));
    setCaughtCount(prev => prev + 1);
  };

  const handleStarInteraction = (e: React.MouseEvent | React.TouchEvent, starId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Éviter les doubles clics (touch + click)
    const now = Date.now();
    if (now - lastInteractionRef.current < 300) {
      return; // Ignorer si moins de 300ms depuis la dernière interaction
    }
    lastInteractionRef.current = now;
    
    catchStar(starId);
  };

  const downloadCV = () => {
    const cvFile = language === 'en' ? 'CV-EN-Malala-Ramangason.pdf' : 'CV-FR-Malala-Ramangason.pdf';
    const link = document.createElement('a');
    link.href = `/public/${cvFile}`;
    link.download = cvFile;
    link.click();
  };

  const skipGame = () => {
    downloadCV();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Van Gogh inspired starry night backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-blue-950 via-indigo-950 to-blue-900"
        onClick={onClose}
      >
        {/* Swirling background effect - Van Gogh style */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-3xl animate-pulse"
              style={{
                background: i % 3 === 0 
                  ? 'radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, transparent 70%)'
                  : i % 3 === 1
                  ? 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
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
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-blue-950/90 hover:bg-blue-900 transition-all shadow-lg border-2 border-yellow-400/50"
        >
          <X className="w-6 h-6 text-yellow-300" />
        </button>

        {/* Message box - Van Gogh style */}
        <div className="absolute top-16 sm:top-1/4 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 z-40 text-center px-4">
          <div className="bg-blue-950/90 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-2xl border-2 border-yellow-400/50 max-w-md">
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-300 mx-auto mb-3 sm:mb-4 animate-pulse drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-3 sm:mb-4 drop-shadow-lg">
              {t('game_title')}
            </h2>
            <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
              {t('game_instruction')} <span className="font-bold text-yellow-400 text-2xl">{5 - caughtCount} {t('game_stars')}</span> {t('game_unlock')}
            </p>
          </div>
        </div>

        {/* Sophisticated stars - Van Gogh style */}
        {stars.map(star => (
          <button
            key={star.id}
            onClick={(e) => handleStarInteraction(e, star.id)}
            onTouchStart={(e) => handleStarInteraction(e, star.id)}
            className="absolute transition-all duration-500 hover:scale-125 active:scale-150 cursor-pointer group z-30 touch-none"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: `rotate(${star.rotation}deg)`,
              pointerEvents: star.caught ? 'none' : 'auto',
              opacity: star.caught ? 0 : 1
            }}
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              {/* Multiple layered glows - Van Gogh halo effect */}
              <div className="absolute inset-0 bg-gradient-radial from-yellow-300/60 via-amber-400/40 to-transparent rounded-full blur-3xl scale-150 animate-pulse" 
                   style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 bg-gradient-radial from-orange-400/50 via-yellow-500/30 to-transparent rounded-full blur-2xl scale-125 animate-pulse" 
                   style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
              <div className="absolute inset-0 bg-gradient-radial from-pink-300/30 via-purple-400/20 to-transparent rounded-full blur-xl scale-110 animate-pulse" 
                   style={{ animationDuration: '2s', animationDelay: '0.6s' }} />
              
              {/* Swirling paint strokes around star */}
              <div className="absolute inset-0 animate-spin-slow">
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <div
                    key={angle}
                    className="absolute w-2 h-10 origin-bottom"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                      background: `linear-gradient(to top, transparent, ${
                        angle % 120 === 0 ? 'rgba(251, 191, 36, 0.6)' : 
                        angle % 120 === 60 ? 'rgba(234, 179, 8, 0.5)' : 
                        'rgba(251, 146, 60, 0.4)'
                      })`,
                      filter: 'blur(2px)',
                      borderRadius: '50%'
                    }}
                  />
                ))}
              </div>

              {/* Main star with gradient */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Star className="w-12 h-12 sm:w-16 sm:h-16 fill-gradient-to-br from-yellow-300 to-amber-500 text-yellow-400 drop-shadow-[0_0_30px_rgba(234,179,8,1)] filter brightness-125 group-hover:brightness-150 group-active:brightness-150 group-hover:scale-110 group-active:scale-110 transition-all duration-300" 
                       style={{ 
                         fill: 'url(#starGradient)',
                         filter: 'drop-shadow(0 0 20px rgba(234, 179, 8, 1)) drop-shadow(0 0 40px rgba(251, 191, 36, 0.8))'
                       }} />
                  
                  {/* Rotating sparkles */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
                    {[0, 90, 180, 270].map((angle) => (
                      <div
                        key={angle}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-25px)`,
                          boxShadow: '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(234, 179, 8, 0.8)',
                          animation: 'pulse 1.5s ease-in-out infinite',
                          animationDelay: `${angle / 360}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Bright white core with pulsing effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-white via-yellow-100 to-amber-200 rounded-full animate-pulse shadow-[0_0_25px_rgba(255,255,255,1),0_0_50px_rgba(234,179,8,0.8)]" 
                     style={{ animationDuration: '1.5s' }} />
              </div>

              {/* Artistic paint splatters */}
              <div className="absolute inset-0 opacity-60">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      left: `${50 + Math.cos((i * Math.PI) / 4) * 35}%`,
                      top: `${50 + Math.sin((i * Math.PI) / 4) * 35}%`,
                      background: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f59e0b' : '#ec4899',
                      filter: 'blur(1px)',
                      animation: 'pulse 2s ease-in-out infinite',
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* SVG gradient definition */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#fde047', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
          </button>
        ))}

        {/* Progress counter - Van Gogh style */}
        <div className="absolute bottom-20 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-blue-950/90 backdrop-blur-md rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-xl border-2 border-yellow-400/50">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-blue-100 font-medium text-sm sm:text-base">{t('game_progress')}</span>
              <div className="flex gap-1 sm:gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 sm:w-7 sm:h-7 transition-all duration-300 ${
                      i < caughtCount 
                        ? 'fill-yellow-400 text-yellow-500 scale-125 drop-shadow-[0_0_15px_rgba(234,179,8,1)]' 
                        : 'fill-blue-900 text-blue-800'
                    }`}
                  />
                ))}
              </div>
              <span className="text-yellow-400 font-bold text-lg sm:text-xl ml-1 sm:ml-2">{caughtCount}/5</span>
            </div>
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={skipGame}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-blue-200/50 hover:text-blue-100 text-sm opacity-50 hover:opacity-100 transition-all bg-transparent border-none cursor-pointer"
        >
          {t('game_skip')}
        </button>

        {/* Confetti - Van Gogh colors */}
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

        {/* Success message - Van Gogh style */}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-blue-950/95 backdrop-blur-md rounded-3xl p-12 shadow-2xl border-4 border-yellow-400 animate-in zoom-in duration-500">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-[0_0_50px_rgba(234,179,8,0.9)]">
                  <Sparkles className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-5xl font-bold text-yellow-300 mb-3 drop-shadow-[0_0_25px_rgba(234,179,8,0.9)]">
                  {t('game_success')}
                </h3>
                <p className="text-blue-100 text-xl">
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