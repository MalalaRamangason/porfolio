import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, GitBranch, Server } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "TypeScript", level: "Intermediate" },
        { name: "Tailwind CSS", level: "Intermediate" },
        { name: "JavaScript", level: "Intermediate" },
        { name: "React", level: "Intermediate" },
        { name: "Angular", level: "Intermediate" }
      ]
    },
    {
      title: "Backend Technologies",
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: "Java", level: "Intermediate" },
        { name: "Spring Boot", level: "Intermediate" },
        { name: "Python", level: "Intermediate" }
      ]
    },
    {
      title: "Database",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "PostgreSQL", level: "Intermediate" }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: <GitBranch className="w-6 h-6" />,
      skills: [
        { name: "Git", level: "Intermediate" },
        { name: "GitHub", level: "Intermediate" },
        { name: "GitLab", level: "Intermediate" },
        { name: "Docker", level: "Intermediate" }
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
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="w-8 h-8 text-ocean-primary" />
            <h2 className="text-4xl font-bold text-foreground">Technical Skills</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to build modern applications
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className="hover:shadow-wave transition-all duration-300 border-ocean-light/20 bg-card/80 backdrop-blur-sm"
            >
              <CardHeader>
                <CardTitle className="text-xl text-ocean-deep flex items-center gap-3">
                  <div className="p-2 bg-ocean-primary/10 rounded-lg text-ocean-primary">
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
              <h3 className="text-2xl font-bold mb-4">Full-Stack Development</h3>
              <p className="text-ocean-light text-lg leading-relaxed">
                Passionate about creating end-to-end solutions with modern technologies. 
                From responsive frontend interfaces to robust backend systems and efficient databases, 
                I bring ideas to life with clean, maintainable code.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
