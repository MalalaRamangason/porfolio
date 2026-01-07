import { Badge } from "@/components/ui/badge";
import { ExternalLink, Folder, AppWindow, Link2, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectsData } from "@/lib/data";

const Projects = () => {
  const { t, language } = useLanguage();
  const projects = projectsData[language] || [];
  
  console.log('Language:', language);
  console.log('Number of projects:', projects.length);
  console.log('Projects:', projects);

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
            <div
              key={index}
              className="group relative block h-full"
            >
              {/* Glassmorphism Card */}
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden flex flex-col">
                
                {/* Image Section - Format Paysage */}
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
                  
                  {/* External link icon - top right */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 z-10"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </a>
                </div>

                {/* Card Content */}
                <div className="relative p-6 flex flex-col flex-grow bg-white dark:bg-gray-800">
                  
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
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-pink-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;