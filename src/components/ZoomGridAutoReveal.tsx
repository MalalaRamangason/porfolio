import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Palette, Rocket, Database, Globe, Smartphone, Terminal, Layers } from "lucide-react";

interface GridCard {
  id: number;
  title: string;
  icon: any;
  color: string;
  size: "small" | "medium" | "large";
  isCenterCard?: boolean;
}

const ZoomGridAutoReveal = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  // Déclenche l'animation au chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Grille de cartes avec différentes tailles
  const gridCards: GridCard[] = [
    { id: 1, title: "Frontend", icon: Code, color: "from-blue-500 to-cyan-500", size: "medium" },
    { id: 2, title: "Design", icon: Palette, color: "from-purple-500 to-pink-500", size: "small" },
    { id: 3, title: "Performance", icon: Rocket, color: "from-orange-500 to-red-500", size: "medium" },
    { id: 4, title: "Backend", icon: Database, color: "from-green-500 to-emerald-500", size: "small" },
    { id: 5, title: "Portfolio", icon: Globe, color: "from-indigo-500 to-purple-500", size: "large", isCenterCard: true },
    { id: 6, title: "Mobile", icon: Smartphone, color: "from-pink-500 to-rose-500", size: "small" },
    { id: 7, title: "DevOps", icon: Terminal, color: "from-yellow-500 to-orange-500", size: "medium" },
    { id: 8, title: "Architecture", icon: Layers, color: "from-teal-500 to-cyan-500", size: "small" },
    { id: 9, title: "Full Stack", icon: Code, color: "from-violet-500 to-purple-500", size: "medium" },
  ];

  // Classes de taille pour les cartes
  const sizeClasses = {
    small: "col-span-1 row-span-1 h-40",
    medium: "col-span-1 md:col-span-2 row-span-1 h-40 md:h-48",
    large: "col-span-2 row-span-2 h-80 md:h-96",
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 py-12 overflow-hidden">
      <motion.div
        initial={{ scale: 3 }}
        animate={{ scale: hasAnimated ? 1 : 3 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl px-4 md:px-6"
      >
        {/* Grille de cartes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-auto">
          <AnimatePresence>
            {gridCards.map((card, index) => {
              const Icon = card.icon;
              const isCenter = card.isCenterCard;
              
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: isCenter ? 1 : 0 }}
                  animate={{ 
                    opacity: hasAnimated || isCenter ? 1 : 0,
                  }}
                  transition={{ 
                    duration: 0.8,
                    delay: isCenter ? 0 : 0.5 + (index * 0.1),
                    ease: "easeOut"
                  }}
                  className={`${sizeClasses[card.size]} relative group`}
                >
                  {/* Carte avec glassmorphism */}
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    {/* Gradient de fond */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`}></div>
                    
                    {/* Overlay pour le glassmorphism */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    
                    {/* Contenu de la carte */}
                    <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                      {/* Icône */}
                      <div className="mb-3 md:mb-4 p-3 md:p-4 rounded-2xl bg-white/20 backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 md:w-12 md:h-12" />
                      </div>
                      
                      {/* Titre */}
                      <h3 className={`font-bold text-center ${
                        card.size === 'large' ? 'text-2xl md:text-4xl' : 
                        card.size === 'medium' ? 'text-lg md:text-2xl' : 
                        'text-base md:text-xl'
                      }`}>
                        {card.title}
                      </h3>
                      
                      {/* Badge décoratif pour la carte centrale */}
                      {isCenter && hasAnimated && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.5, duration: 0.5 }}
                          className="mt-3 md:mt-4 px-3 md:px-4 py-1 md:py-2 rounded-full bg-white/30 backdrop-blur-md text-xs md:text-sm font-medium"
                        >
                          Découvrez mon travail
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Effet de brillance au survol */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default ZoomGridAutoReveal;
