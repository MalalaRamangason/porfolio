import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, GitBranch, Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Skills = () => {
  const { t } = useLanguage();
  const skillCategories = [
    {
      title: t('skills_frontend'),
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "TypeScript", level: t('skills_intermediate') },
        { name: "Tailwind CSS", level: t('skills_intermediate') },
        { name: "JavaScript", level: t('skills_intermediate') },
        { name: "React", level: t('skills_intermediate') },
        { name: "Angular", level: t('skills_intermediate') }
      ]
    },
    {
      title: t('skills_backend'),
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: "Java", level: t('skills_intermediate') },
        { name: "Spring Boot", level: t('skills_intermediate') },
        { name: "Python", level: t('skills_intermediate') }
      ]
    },
    {
      title: t('skills_database'),
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "PostgreSQL", level: t('skills_intermediate') }
      ]
    },
    {
      title: t('skills_devops'),
      icon: <GitBranch className="w-6 h-6" />,
      skills: [
        { name: "Git", level: t('skills_intermediate') },
        { name: "GitHub", level: t('skills_intermediate') },
        { name: "GitLab", level: t('skills_intermediate') },
        { name: "Docker", level: t('skills_intermediate') }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-ocean-primary text-white";
      case "Intermediate":
        return "bg-ocean-light text-ocean-deep";
      case "Beginner":
        return "bg-ocean-mist text-ocean-deep";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <section id="skills" className="py-20 bg-background dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="w-8 h-8 text-ocean-primary dark:text-blue-400" />
            <h2 className="text-4xl font-bold text-foreground dark:text-white">{t('skills_title')}</h2>
          </div>
          <p className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t('skills_subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className="hover:shadow-wave transition-all duration-300 border-ocean-light/20 dark:border-gray-700 bg-card/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <CardHeader>
                <CardTitle className="text-xl text-ocean-deep dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-ocean-primary/10 dark:bg-blue-400/20 rounded-lg text-ocean-primary dark:text-blue-400">
                    {category.icon}
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-2">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <Badge className={`${getLevelColor(skill.level)} text-xs`}>
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Overview */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-ocean text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{t('skills_overview_title')}</h3>
              <p className="text-ocean-light text-lg leading-relaxed">
                {t('skills_overview_desc')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
