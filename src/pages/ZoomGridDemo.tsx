import ZoomGridReveal from "@/components/ZoomGridReveal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ZoomGridDemo = () => {
  return (
    <div className="min-h-screen">
      {/* Bouton de retour */}
      <div className="fixed top-4 left-4 z-50">
        <Link to="/">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </Link>
      </div>

      {/* Composant d'animation */}
      <ZoomGridReveal />

      {/* Section de contenu après l'animation */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Contenu après l'animation
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Vous pouvez maintenant continuer avec le reste de votre portfolio.
            L'animation se déclenche automatiquement au scroll !
          </p>
        </div>
      </section>
    </div>
  );
};

export default ZoomGridDemo;
