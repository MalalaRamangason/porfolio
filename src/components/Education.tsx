import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { educationData } from "@/lib/data";

const Education = () => {
  const { t, language } = useLanguage();
  const edu = educationData[language];
  return (
    <section id="education" className="py-20 bg-ocean-mist/20 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-8 h-8 text-ocean-primary dark:text-blue-400" />
            <h2 className="text-4xl font-bold text-foreground dark:text-white">{t('edu_title')}</h2>
          </div>
          <p className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t('edu_subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-ocean-primary to-ocean-light dark:from-blue-400 dark:to-blue-600 h-full rounded-full opacity-30"></div>
            
            <div className="space-y-12">
              {/* Current M1 */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <Card className="hover:shadow-wave transition-all duration-300 border-ocean-light/20 dark:border-gray-700 bg-card/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-end gap-2 mb-2">
                        <span className="bg-ocean-primary dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {edu.m1.badge}
                        </span>
                      </div>
                      <CardTitle className="text-xl text-ocean-deep dark:text-white">{edu.m1.title}</CardTitle>
                      <p className="text-ocean-primary dark:text-blue-400 font-semibold">
                        {edu.m1.institution}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground dark:text-gray-400 font-medium mb-2">{edu.m1.duration}</p>
                      <p className="text-muted-foreground dark:text-gray-300 leading-relaxed text-sm">
                        {edu.m1.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-ocean-primary dark:bg-blue-400 rounded-full border-4 border-background dark:border-gray-800 shadow-lg z-10"></div>
                
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* Licence */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-ocean-light rounded-full border-4 border-background shadow-lg z-10"></div>
                
                <div className="w-1/2 pl-8">
                  <Card className="hover:shadow-wave transition-all duration-300 border-ocean-light/20 bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-ocean-light text-ocean-deep px-3 py-1 rounded-full text-sm font-medium">
                          {edu.licence.badge}
                        </span>
                      </div>
                      <CardTitle className="text-xl text-ocean-deep dark:text-white">{edu.licence.title}</CardTitle>
                      <p className="text-ocean-primary dark:text-blue-400 font-semibold">
                        {edu.licence.specialization}
                      </p>
                      <p className="text-ocean-wave dark:text-blue-300 font-medium">{edu.licence.institution}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground font-medium mb-2">{edu.licence.duration}</p>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {edu.licence.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;