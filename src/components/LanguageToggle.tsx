import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="relative"
      title={language === 'en' ? 'Switch to French' : 'Passer en anglais'}
    >
      <span className="text-sm font-bold uppercase">{language === 'fr' ? 'EN' : 'FR'}</span>
    </Button>
  );
};

export default LanguageToggle;
