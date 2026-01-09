import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Palette, Rocket, Database, Globe, Smartphone, Terminal, Layers } from "lucide-react";

interface GridCard {
  id: number;
  title: string;
  icon: any;
  color: string;
  size: "small" | "medium" | "large";
  isCenterCard?: boolean;
}

const ZoomGridReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Lie l'animation au scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transformations basées sur le scroll
  const scale = useTransform(scrollYProgress, [0, 0.5], [3, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.5, 1]);

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
    <div 
      ref={containerRef}
      className="relative h-[200vh] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Section sticky pour l'animation */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale }}
          className="w-full max-w-7xl px-4 md:px-6"
        >
          {/* Grille de cartes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-auto">
            {gridCards.map((card, index) => {
              const Icon = card.icon;
              const isCenter = card.isCenterCard;
              
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: isCenter ? 1 : 0 }}
                  style={{ 
                    opacity: isCenter ? 1 : opacity,
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
                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
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
          </div>

          {/* Texte d'indication de scroll (visible au début) */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium mb-2">
              Scrollez pour découvrir
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 mx-auto rounded-full border-2 border-gray-400 dark:border-gray-600 flex items-start justify-center p-2"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-gray-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ZoomGridReveal;
