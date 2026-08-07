import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { certificatesData } from "@/lib/data";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Certificates = () => {
  const { t, language } = useLanguage();
  const certificates = certificatesData[language];
  const [selectedCert, setSelectedCert] = useState<any>(null);

  return (
    <section id="certificates" className="py-20 bg-ocean-mist/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-ocean-primary" />
            <h2 className="text-4xl font-bold text-foreground">{t('cert_title')}</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('cert_subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <Card
              key={index}
              className="hover:shadow-wave transition-all duration-300 border-ocean-light/20 bg-card hover:-translate-y-1 cursor-pointer w-full max-w-sm"
              onClick={() => setSelectedCert(cert)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground leading-tight text-center">
                  {cert.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-center">
                <p className="text-ocean-primary font-semibold">
                  {cert.organization}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Badge variant="outline" className="border-ocean-primary text-ocean-primary">
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

        <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
          <DialogContent className="max-w-4xl w-full p-0 bg-card overflow-hidden">
            <div className="relative">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 bg-background/90 p-2 rounded-full hover:bg-background transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              {selectedCert && (
                <div className="flex flex-col">
                  <div className="w-full bg-muted flex items-center justify-center p-8">
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="max-w-full h-auto object-contain max-h-[70vh] rounded-lg shadow-xl"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/800x600/e0e0e0/666?text=Certificate';
                      }}
                    />
                  </div>

                  <div className="p-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">
                      {selectedCert.title}
                    </h3>
                    <p className="text-lg text-ocean-primary font-semibold">
                      {selectedCert.organization}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <Badge variant="outline" className="border-ocean-primary text-ocean-primary">
                        {selectedCert.date}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {selectedCert.type}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Certificates;
