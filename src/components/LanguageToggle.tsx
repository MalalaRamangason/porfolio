import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

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
      className="relative flex items-center gap-2"
      title={language === 'en' ? 'Switch to French' : 'Passer en anglais'}
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium uppercase">{language}</span>
    </Button>
  );
};

export default LanguageToggle;
