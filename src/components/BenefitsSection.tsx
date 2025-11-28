import { motion } from "framer-motion";
import { Coins, Home, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ParticlesBackgroundAlt } from "./ParticlesBackgroundAlt";

const benefits = [
  {
    icon: Coins,
    title: "Start with small capital",
    description: "No need for large upfront investments. Begin your property journey with the capital you have.",
  },
  {
    icon: Home,
    title: "Own a percentage of real property",
    description: "Get actual ownership rights in premium African properties, not just a promise or token.",
  },
  {
    icon: TrendingUp,
    title: "Earn rental income and appreciation",
    description: "Benefit from both monthly rental returns and long-term property value growth.",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      <ParticlesBackgroundAlt variant="subtle" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Cohold?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Make your money work smarter with fractional property ownership
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-border hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
