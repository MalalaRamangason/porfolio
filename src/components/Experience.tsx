import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { experiencesData } from "@/lib/data";

const Experience = () => {
  const { t, language } = useLanguage();
  const experiences = experiencesData[language];

  return (
    <section id="experience" className="py-20 bg-background dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="w-8 h-8 text-ocean-primary dark:text-blue-400" />
            <h2 className="text-4xl font-bold text-foreground dark:text-white">{t('exp_title')}</h2>
          </div>
          <p className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t('exp_subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="hover:shadow-wave transition-all duration-300 border-ocean-light/20 dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-ocean-deep dark:text-white">{exp.company}</CardTitle>
                    <p className="text-ocean-primary dark:text-blue-400 font-semibold">{exp.position}</p>
                  </div>
                  <Badge variant="outline" className="w-fit border-ocean-primary dark:border-blue-400 text-ocean-primary dark:text-blue-400">
                    {exp.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-ocean-primary dark:bg-blue-400 mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground dark:text-gray-300">{achievement}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;