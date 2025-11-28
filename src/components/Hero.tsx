import { motion } from "framer-motion";
import coholdLogo from "@/assets/cohold-logo.png";
import { ParticlesBackground } from "./ParticlesBackground";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 md:py-32">
      <ParticlesBackground />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <img 
              src={coholdLogo} 
              alt="CoholdHQ Logo" 
              className="h-20 md:h-28 w-auto object-contain"
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))'
              }}
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
          >
            Co-own real estate in Africa with small capital.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Join the Cohold waitlist and get early access to fractional property investing.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
