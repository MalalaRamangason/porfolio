import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useColorTheme } from "@/contexts/ThemeContext";

const getThemeColors = () => {
  const style = getComputedStyle(document.documentElement);
  const primary = style.getPropertyValue("--ocean-primary").trim();
  const light = style.getPropertyValue("--ocean-light").trim();
  return {
    particle: `hsl(${primary})`,
    link: `hsl(${light})`,
  };
};

const ParticlesBackground = () => {
  const [engineReady, setEngineReady] = useState(false);
  const [colors, setColors] = useState({ particle: "hsl(195, 100%, 50%)", link: "hsl(195, 85%, 65%)" });
  const { colorTheme, darkMode } = useColorTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  useEffect(() => {
    // Petit délai pour laisser le DOM appliquer les nouvelles variables CSS
    const timeout = setTimeout(() => {
      setColors(getThemeColors());
    }, 50);
    return () => clearTimeout(timeout);
  }, [colorTheme, darkMode]);

  if (!engineReady) return null;

  return (
    <Particles
      key={`${colorTheme}-${darkMode}`}
      id="tsparticles"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: { enable: true },
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 200, duration: 0.4 },
          },
        },
        particles: {
          color: { value: colors.particle },
          links: {
            color: colors.link,
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 2,
            straight: false,
          },
          number: { value: 80 },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default ParticlesBackground;
