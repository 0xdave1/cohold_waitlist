import { motion } from "framer-motion";
import { ParticlesBackgroundAlt } from "./ParticlesBackgroundAlt";

export const ExplainerSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-secondary/20 overflow-hidden">
      <ParticlesBackgroundAlt variant="subtle" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What is Fractional Real Estate?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fractional real estate allows you to own a percentage of a property instead of buying the whole thing. 
            With Cohold, you can invest in quality properties with as little capital as you have, 
            earning rental income and benefiting from property appreciation—all without the burden of full ownership.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
