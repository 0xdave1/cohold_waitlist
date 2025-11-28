import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/hic4zfs27gw7d90umnh5bfaj26law9t8";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
});

export const WaitlistForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = formSchema.safeParse({ name, email });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      toast({
        title: "Validation Error",
        description: errors.name?.[0] || errors.email?.[0],
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // mode: "no-cors",
        body: JSON.stringify({
          name: result.data.name,
          email: result.data.email,
          timestamp: new Date().toISOString(),
          source: "coholdHQ_waitlist",
        }),
      });

      toast({
        title: "You're in! 🎉",
        description: "We'll notify you when Cohold launches.",
      });

      setName("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-card p-8 rounded-2xl shadow-lg border border-border"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full h-12">
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
