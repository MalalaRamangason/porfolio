import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { certificatesData } from "@/lib/data";

const Certificates = () => {
  const { t, language } = useLanguage();
  const certificates = certificatesData[language];

  return (
    <section id="certificates" className="py-20 bg-ocean-mist/20 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-ocean-primary dark:text-blue-400" />
            <h2 className="text-4xl font-bold text-foreground dark:text-white">{t('cert_title')}</h2>
          </div>
          <p className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t('cert_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <Card key={index} className="hover:shadow-wave transition-all duration-300 border-ocean-light/20 dark:border-gray-700 dark:bg-gray-800/80 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-ocean-deep dark:text-white leading-tight">
                  {cert.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-ocean-primary dark:text-blue-400 font-semibold">
                  {cert.organization}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-ocean-primary dark:border-blue-400 text-ocean-primary dark:text-blue-400">
                    {cert.date}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {cert.type}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;