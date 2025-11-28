import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

interface ParticlesBackgroundAltProps {
  variant?: "subtle" | "minimal";
}

export const ParticlesBackgroundAlt = ({ variant = "subtle" }: ParticlesBackgroundAltProps) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        opacity: 0,
      },
      fpsLimit: 120,
      particles: {
        color: {
          value: variant === "minimal" ? ["#1e5a7d"] : ["#1e5a7d", "#f4a623"],
        },
        links: {
          color: "#1e5a7d",
          distance: variant === "minimal" ? 100 : 120,
          enable: true,
          opacity: variant === "minimal" ? 0.15 : 0.2,
          width: 0.5,
        },
        move: {
          enable: true,
          speed: variant === "minimal" ? 0.5 : 0.8,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },
        number: {
          density: {
            enable: true,
          },
          value: variant === "minimal" ? 30 : 50,
        },
        opacity: {
          value: variant === "minimal" ? 0.3 : 0.4,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      detectRetina: true,
    }),
    [variant]
  );

  if (!init) {
    return null;
  }

  return (
    <Particles
      id={`tsparticles-${variant}`}
      options={options}
      className="absolute inset-0 -z-10"
    />
  );
};
