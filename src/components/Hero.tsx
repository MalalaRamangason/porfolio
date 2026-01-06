import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { useState } from "react";
import CVGameModal from "./CVGameModal";

const Hero = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-[#0066cc] via-[#0080ff] to-[#0099ff] dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 pt-16 md:pt-0">
      {/* Particles/Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-40 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20 max-w-7xl mx-auto">
          
          {/* Left - Profile Picture */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Cyan circle border */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 p-1.5 shadow-2xl shadow-cyan-500/50">
                <div className="w-full h-full rounded-full bg-white p-2">
                  {/* Replace with your actual photo */}
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
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl -z-10"></div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex-1 text-white space-y-4 sm:space-y-6">
            {/* Greeting */}
            <p className="text-lg sm:text-xl lg:text-2xl font-light text-blue-100">
              Hi I'm
            </p>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Malala Ramangason
            </h1>

            {/* Title with emoji */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-50">
              Fullstack Developer & Problem Solver 👋
            </h2>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-blue-100/90 font-light">
              Frontend Developer about pixelect experiences.
            </p>

            {/* Description */}
            <p className="text-base lg:text-lg text-blue-50/80 max-w-2xl leading-relaxed">
              Craft beautiful responsive web applications using modern technologies. 
              With keen eye for design for thoughtful experiences that users love.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="bg-cyan-400 hover:bg-cyan-300 text-blue-900 font-semibold px-8 py-6 text-base rounded-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
              >
                <Eye className="w-5 h-5 mr-2" />
                View Projects
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsGameOpen(true)}
                className="border-2 border-white/90 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-6 text-base rounded-lg transition-all"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
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