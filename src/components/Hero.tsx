import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { useState, useEffect } from "react";
import CVGameModal from "./CVGameModal";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t, language } = useLanguage();
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    if (isMobile) {
      const cvFile = language === 'en' ? 'CV-EN-Malala-Ramangason.pdf' : 'CV-FR-Malala-Ramangason.pdf';
      const link = document.createElement('a');
      link.href = `/${cvFile}`;
      link.download = cvFile;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setIsGameOpen(true);
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-end relative overflow-hidden pt-16 md:pt-8 pb-0" style={{ background: 'var(--gradient-hero)' }}>

      {/* Floating clouds background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/20 rounded-full blur-xl animate-float"
            style={{
              width: `${100 + Math.random() * 150}px`,
              height: `${40 + Math.random() * 60}px`,
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pb-0">
        <div className="flex flex-col md:flex-row lg:flex-row items-center md:items-end lg:items-end gap-8 sm:gap-12 max-w-7xl mx-auto pb-0">

          {/* MOBILE ONLY: Profile Picture */}
          <div className="flex-shrink-0 md:hidden flex justify-center w-full">
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-ocean-light to-ocean-primary p-1.5 shadow-2xl shadow-ocean-primary/50">
                <div className="w-full h-full rounded-full bg-white p-2">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-6xl font-bold overflow-hidden">
                    <img
                      src="/Profile_picture.png"
                      alt="Malala Ramangason"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<span class="text-4xl">MR</span>';
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-ocean-primary/20 blur-2xl -z-10"></div>
            </div>
          </div>

          {/* MOBILE ONLY: Content */}
          <div className="text-white space-y-4 sm:space-y-6 md:hidden text-center w-full">
            <p className="text-sm sm:text-base font-light text-white/80 tracking-wide uppercase">
              {t('hero_greeting')}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Malala Ramangason
            </h1>
            <h2 className="text-xl sm:text-2xl font-medium text-white/90">
              {t('hero_title')}
            </h2>
            <p className="text-base text-white/80 font-light">
              {t('hero_subtitle')}
            </p>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              {t('hero_description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="bg-ocean-light hover:bg-ocean-primary text-ocean-deep font-semibold px-8 py-6 text-base rounded-lg transition-all shadow-lg"
              >
                <Eye className="w-5 h-5 mr-2" />
                {t('hero_view_projects')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleDownloadCV}
                className="border-2 border-white/90 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-ocean-deep font-semibold px-8 py-6 text-base rounded-lg transition-all"
              >
                <Download className="w-5 h-5 mr-2" />
                {t('hero_download_cv')}
              </Button>
            </div>
          </div>

          {/* TABLET */}
          <div className="hidden md:flex lg:hidden w-full items-center gap-4">
            <div className="flex-1 text-white space-y-3 pr-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">{t('hero_greeting')}</h2>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="text-ocean-light">Malala Ramangason</span>
              </h1>
              <h3 className="text-lg md:text-xl font-medium text-white/90">{t('hero_title')}</h3>
              <p className="text-sm md:text-base text-white/80 font-light">{t('hero_subtitle')}</p>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed max-w-md">{t('hero_description')}</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Button
                  onClick={scrollToProjects}
                  size="lg"
                  className="bg-ocean-light hover:bg-ocean-primary text-ocean-deep font-semibold px-6 py-4 text-sm md:text-base rounded-lg transition-all shadow-lg"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t('hero_view_projects')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleDownloadCV}
                  className="border-2 border-white/90 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-ocean-deep font-semibold px-6 py-4 text-sm md:text-base rounded-lg transition-all"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('hero_download_cv')}
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-end pb-0 -mb-1 -mr-6">
              <div className="relative w-[420px] md:w-[480px]">
                <img
                  src="/projects/profil-nobg.png"
                  alt="Malala Ramangason"
                  className="w-full h-auto object-contain object-bottom"
                  onError={(e) => { e.currentTarget.src = '/Profile_picture.png'; }}
                />
              </div>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:flex w-full items-end gap-0">
            <div className="flex-shrink-0 w-[380px] xl:w-[420px] text-white space-y-6 self-center pb-20 xl:pb-24">
              <h2 className="text-5xl xl:text-6xl font-bold text-white">{t('hero_greeting')}</h2>
              <h1 className="text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-white">I'm </span>
                <span className="text-ocean-light">Malala Ramangason</span>
              </h1>
              <h3 className="text-xl xl:text-2xl font-medium text-white/90">{t('hero_title')}</h3>
              <div className="pt-4">
                <Button
                  onClick={scrollToProjects}
                  size="lg"
                  className="bg-ocean-light hover:bg-ocean-primary text-ocean-deep font-semibold px-8 py-6 text-base rounded-lg transition-all shadow-lg"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  {t('hero_view_projects')}
                </Button>
              </div>
            </div>

            <div className="flex-1 relative flex items-end justify-center pb-0 -mb-1">
              <div className="relative w-full max-w-[500px] xl:max-w-[600px]">
                <img
                  src="/projects/profil-nobg.png"
                  alt="Malala Ramangason"
                  className="w-full h-auto object-contain object-bottom"
                  onError={(e) => { e.currentTarget.src = '/Profile_picture.png'; }}
                />
              </div>
            </div>

            <div className="flex-shrink-0 w-[300px] xl:w-[340px] self-start pt-20">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl space-y-4">
                <p className="text-ocean-light text-sm font-semibold uppercase tracking-wide">
                  {t('hero_subtitle')}
                </p>
                <p className="text-white/90 text-base leading-relaxed">
                  {t('hero_description')}
                </p>
                <Button
                  onClick={handleDownloadCV}
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-ocean-light bg-transparent text-ocean-light hover:bg-ocean-light hover:text-ocean-deep font-semibold px-6 py-5 text-sm rounded-lg transition-all"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('hero_download_cv')}
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <CVGameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </>
  );
};

export default Hero;
