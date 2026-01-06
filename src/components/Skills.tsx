import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, GitBranch, Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

const Skills = () => {
  const { t } = useLanguage();
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const fullText = `${t('skills_overview_title')}\n\n${t('skills_overview_desc')}`;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Vitesse de frappe
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

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

        {/* Terminal-style Overview */}
        <div className="mt-16 max-w-4xl mx-auto relative">
          <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700 relative z-10">
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm font-mono ml-2">~/developer-profile</span>
            </div>
            
            {/* Terminal Content */}
            <div className="p-8 font-mono text-sm bg-gray-900">
              <div className="flex items-start gap-2 mb-4">
                <span className="text-green-400">$</span>
                <span className="text-blue-400">cat</span>
                <span className="text-gray-300">about.txt</span>
              </div>
              
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {displayedText}
                <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
