import { useEffect, useState, useRef } from "react";
import { X, Star, Sparkles } from "lucide-react";

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
  const [stars, setStars] = useState<Star[]>([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

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

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV-EN-Malala-Ramangason.pdf';
    link.download = 'CV-EN-Malala-Ramangason.pdf';
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
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-center">
          <div className="bg-blue-950/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-yellow-400/50 max-w-md">
            <Sparkles className="w-12 h-12 text-yellow-300 mx-auto mb-4 animate-pulse drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
            <h2 className="text-3xl font-bold text-yellow-300 mb-4 drop-shadow-lg">
              A Magical Starry Night! ✨
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Catch <span className="font-bold text-yellow-400 text-2xl">{5 - caughtCount} stars</span> to unlock my CV
            </p>
          </div>
        </div>

        {/* Falling stars - Van Gogh style */}
        {stars.map(star => (
          <button
            key={star.id}
            onClick={() => catchStar(star.id)}
            onMouseEnter={() => catchStar(star.id)}
            className="absolute transition-all duration-300 hover:scale-125 cursor-pointer group z-30"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: `rotate(${star.rotation}deg)`,
              pointerEvents: star.caught ? 'none' : 'auto',
              opacity: star.caught ? 0 : 1
            }}
          >
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-70 animate-pulse scale-150" />
              
              {/* Star with Van Gogh swirl effect */}
              <div className="relative">
                <Star className="w-16 h-16 fill-yellow-400 text-yellow-500 drop-shadow-[0_0_25px_rgba(234,179,8,1)] filter brightness-125 group-hover:brightness-150 transition-all" />
                
                {/* Swirl trails */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-0 left-1/2 w-1 h-8 bg-gradient-to-b from-yellow-300/70 to-transparent rounded-full blur-sm" />
                  <div className="absolute bottom-0 left-1/2 w-1 h-8 bg-gradient-to-t from-amber-400/70 to-transparent rounded-full blur-sm" />
                </div>
              </div>
              
              {/* Inner bright core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_20px_rgba(255,255,255,1)]" />
              </div>
            </div>
          </button>
        ))}

        {/* Progress counter - Van Gogh style */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-blue-950/90 backdrop-blur-md rounded-full px-8 py-4 shadow-xl border-2 border-yellow-400/50">
            <div className="flex items-center gap-3">
              <span className="text-blue-100 font-medium">Progress:</span>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-7 h-7 transition-all duration-300 ${
                      i < caughtCount 
                        ? 'fill-yellow-400 text-yellow-500 scale-125 drop-shadow-[0_0_15px_rgba(234,179,8,1)]' 
                        : 'fill-blue-900 text-blue-800'
                    }`}
                  />
                ))}
              </div>
              <span className="text-yellow-400 font-bold text-xl ml-2">{caughtCount}/5</span>
            </div>
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={skipGame}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-blue-200/50 hover:text-blue-100 text-sm opacity-50 hover:opacity-100 transition-all bg-transparent border-none cursor-pointer"
        >
          Skip game →
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
                  Magnificent! 🌟
                </h3>
                <p className="text-blue-100 text-xl">
                  Downloading...
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