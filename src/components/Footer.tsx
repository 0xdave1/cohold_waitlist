import { ParticlesBackgroundAlt } from "./ParticlesBackgroundAlt";

export const Footer = () => {
  return (
    <footer className="relative py-8 bg-secondary/20 border-t border-border overflow-hidden">
      <ParticlesBackgroundAlt variant="minimal" />
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          Cohold © 2025
        </p>
      </div>
    </footer>
  );
};
