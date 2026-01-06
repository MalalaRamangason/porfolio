import { Badge } from "@/components/ui/badge";
import { ExternalLink, Folder, AppWindow, Link2, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectsData } from "@/lib/data";

const Projects = () => {
  const { t, language } = useLanguage();
  const projects = projectsData[language];

  const iconMap: { [key: string]: any } = {
    'Appistery': AppWindow,
    'Tiny': Link2,
    'Ro': UtensilsCrossed
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Folder className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{t('projects_title')}</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t('projects_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
            >
              {/* Glassmorphism Card */}
              <div className="relative h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden">
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-pink-500/5 dark:from-blue-400/10 dark:to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* External link icon - top right */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative p-6 flex flex-col h-full">
                  
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3">
                      {/* Project Icon */}
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        {(() => {
                          const IconComponent = iconMap[project.title];
                          return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
                        })()}
                      </div>
                      {/* Project Title */}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="space-y-4 mb-6 flex-grow">
                    {/* The Problem */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        {t('projects_problem')}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    {/* The Solution */}
                    <div className="bg-gradient-to-br from-blue-50 to-pink-50 dark:from-blue-900/30 dark:to-pink-900/30 rounded-xl p-4 border border-blue-100/50 dark:border-blue-800/50">
                      <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-2">
                        {t('projects_solution')}
                      </h4>
                      <p className="text-blue-900/90 dark:text-blue-200 text-sm leading-relaxed font-medium">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Footer - Category Badges */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.categories.map((category, i) => (
                      <Badge 
                        key={i}
                        className="bg-blue-600/10 dark:bg-blue-400/20 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-700/50 hover:bg-blue-600/20 dark:hover:bg-blue-400/30 transition-colors text-xs px-3 py-1"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-pink-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;