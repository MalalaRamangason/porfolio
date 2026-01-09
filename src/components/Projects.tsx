import { Badge } from "@/components/ui/badge";
import { ExternalLink, Folder, AppWindow, Link2, UtensilsCrossed, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectsData } from "@/lib/data";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Projects = () => {
  const { t, language } = useLanguage();
  const projects = projectsData[language] || [];
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation liée au scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transformations basées sur le scroll
  const scale = useTransform(scrollYProgress, [0, 0.5], [2.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.5, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  
  console.log('Language:', language);
  console.log('Number of projects:', projects.length);
  console.log('Projects:', projects);

  const iconMap: { [key: string]: any } = {
    'Appistery': AppWindow,
    'Tiny': Link2,
    'Ro': UtensilsCrossed
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative min-h-[200vh] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Section sticky pour l'animation */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden py-20">
        {/* Header fixe - visible uniquement avant le scroll */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
          }}
          className="text-center z-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Folder className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{t('projects_title')}</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto px-4">
            {t('projects_subtitle')}
          </p>
        </motion.div>

        {/* Grille animée - visible uniquement pendant/après le scroll */}
        <motion.div
          style={{ 
            scale,
            opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1])
          }}
          className="absolute inset-0 flex items-center justify-center w-full max-w-7xl mx-auto px-4 md:px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => {
              const isCenterCard = index === 1; // Carte du milieu (Tiny)
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: isCenterCard ? 1 : 0 }}
                  style={{ 
                    opacity: isCenterCard ? 1 : opacity,
                  }}
                  onClick={() => handleProjectClick(project)}
                  className="group relative block h-full cursor-pointer"
                >
                  {/* Glassmorphism Card - bordure et background apparaissent après le zoom */}
                  <motion.div 
                    style={{ 
                      backgroundColor: useTransform(scrollYProgress, [0.2, 0.4], 
                        ['transparent', 'rgb(255 255 255 / 1)']
                      ),
                    }}
                    className="relative h-full rounded-2xl border dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden flex flex-col min-h-[500px]"
                  >
                    {/* Border qui apparaît */}
                    <motion.div 
                      style={{ opacity: cardOpacity }}
                      className="absolute inset-0 border border-gray-200 dark:border-gray-700 rounded-2xl pointer-events-none"
                    ></motion.div>
                    
                    {/* Image Section - toujours visible */}
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
                      {/* Image Light Mode */}
                      <img 
                        src={project.imageLight} 
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110 dark:hidden"
                      />
                      {/* Image Dark Mode */}
                      <img 
                        src={project.imageDark} 
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110 hidden dark:block"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-gray-800/80 via-transparent to-transparent"></div>
                      
                      {/* External link icon - apparaît après le zoom */}
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ opacity: contentOpacity }}
                        className="absolute top-4 right-4 z-10"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg">
                          <ExternalLink className="w-5 h-5" />
                        </div>
                      </motion.a>
                    </div>

                    {/* Card Content - apparaît après le zoom */}
                    <motion.div 
                      style={{ opacity: contentOpacity }}
                      className="relative p-6 flex flex-col flex-grow bg-white dark:bg-gray-800"
                    >
                      
                      {/* Header */}
                      <div className="mb-5">
                        <div className="flex items-center gap-3 mb-1">
                          {/* Project Icon */}
                          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            {(() => {
                              const IconComponent = iconMap[project.title];
                              return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
                            })()}
                          </div>
                          {/* Project Title */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="space-y-3 mb-5 flex-grow">
                        {/* The Problem */}
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                            {t('projects_problem')}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed line-clamp-3">
                            {project.problem}
                          </p>
                        </div>

                        {/* The Solution */}
                        <div className="bg-gradient-to-br from-blue-50 to-pink-50 dark:from-blue-900/30 dark:to-pink-900/30 rounded-lg p-3 border border-blue-100/50 dark:border-blue-800/50">
                          <h4 className="text-xs font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-1.5">
                            {t('projects_solution')}
                          </h4>
                          <p className="text-blue-900/90 dark:text-blue-200 text-xs leading-relaxed font-medium line-clamp-3">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      {/* Footer - Category Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                        {project.categories?.map((category, i) => (
                          <Badge 
                            key={i}
                            className="bg-blue-600/10 dark:bg-blue-400/20 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-700/50 hover:bg-blue-600/20 dark:hover:bg-blue-400/30 transition-colors text-[10px] px-2 py-0.5"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>

                    {/* Bottom accent line */}
                    <motion.div 
                      style={{ opacity: contentOpacity }}
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-pink-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    ></motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Texte d'indication de scroll */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium mb-2">
            {language === 'fr' ? 'Scrollez pour découvrir' : 'Scroll to discover'}
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 mx-auto rounded-full border-2 border-gray-400 dark:border-gray-600 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-gray-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Modal pour afficher les détails du projet */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-white dark:bg-gray-900 border-none shadow-2xl">
          {selectedProject && (
              <div className="relative overflow-hidden">
                
                {/* Image Hero - Plus sobre */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={selectedProject.imageLight} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-top dark:hidden"
                  />
                  <img 
                    src={selectedProject.imageDark} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-top hidden dark:block"
                  />
                  
                  {/* Overlay simple et élégant */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Header minimaliste - juste titre et icône */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white">
                        {(() => {
                          const IconComponent = iconMap[selectedProject.title];
                          return IconComponent ? <IconComponent className="w-7 h-7" /> : null;
                        })()}
                      </div>
                      <h2 className="text-3xl font-bold text-white">
                        {selectedProject.title}
                      </h2>
                    </div>
                  </div>

                  {/* Bouton fermer minimaliste */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Contenu épuré */}
                <div className="p-8 space-y-8 max-h-[calc(90vh-288px)] overflow-y-auto">
                  
                  {/* Le Problème */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                      {t('projects_problem')}
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  {/* Séparateur subtil */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                  {/* La Solution */}
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3">
                      {t('projects_solution')}
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>

                  {/* Séparateur */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                  {/* Catégories et bouton en bas pour tous les écrans */}
                  <div className="space-y-4">
                    {/* Catégories */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                        {t('projects_categories')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.categories?.map((category: string, i: number) => (
                          <span 
                            key={i}
                            className="px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bouton visiter */}
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('projects_view')}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
    </section>
  );
};

export default Projects;