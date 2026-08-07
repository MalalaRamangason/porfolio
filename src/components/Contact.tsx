import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-20 relative overflow-hidden" style={{ background: 'var(--gradient-ocean)' }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-mist"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t('contact_stay_in_touch')}</h2>
          <p className="text-ocean-light text-lg max-w-2xl mx-auto">
            {t('contact_ready_to_build')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <Card className="bg-card/95 backdrop-blur-sm border-0 shadow-wave hover:shadow-ocean transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">LinkedIn</h3>
                    <p className="text-muted-foreground">{t('contact_linkedin_desc')}</p>
                    <a
                      href="https://linkedin.com/in/malala-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ocean-primary hover:underline"
                    >
                      linkedin.com/in/malala-ramangason
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/95 backdrop-blur-sm border-0 shadow-wave hover:shadow-ocean transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-wave rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Personal Website</h3>
                    <p className="text-muted-foreground">{t('contact_website_desc')}</p>
                    <a
                      href="https://malala-ramangason.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ocean-primary hover:underline"
                    >
                      malala-ramangason.vercel.app
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/95 backdrop-blur-sm border-0 shadow-wave hover:shadow-ocean transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-ocean-primary rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">{t('contact_email_desc')}</p>
                    <a
                      href="mailto:malala@example.com"
                      className="text-ocean-primary hover:underline"
                    >
                      hobisoaramangason@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
