import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { fbq } from "../lib/fbPixel";

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/9ukphar2g65lfv4wpgq2f17x8ibma1k4";

// AFRICAN COUNTRY CODES
const africanCodes = [
  { code: "+234", country: "Nigeria" },
  { code: "+233", country: "Ghana" },
  { code: "+254", country: "Kenya" },
  { code: "+255", country: "Tanzania" },
  { code: "+256", country: "Uganda" },
  { code: "+27", country: "South Africa" },
  { code: "+212", country: "Morocco" },
  { code: "+213", country: "Algeria" },
  { code: "+216", country: "Tunisia" },
];

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(7, "Phone number is too short"),
  code: z.string().trim().min(1, "Select a country code"),
});

export const WaitlistForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("+234");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    fbq("track", "InitiateCheckout");

    // VALIDATE FORM DATA

    const result = formSchema.safeParse({ name, email, phone, code });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      toast({
        title: "Validation Error",
        description:
          errors.name?.[0] ||
          errors.email?.[0] ||
          errors.phone?.[0] ||
          "Please check your input",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1) SEND DATA TO MAKE.COM
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.data.name,
          email: result.data.email,
          phone: `${result.data.code}${result.data.phone}`,
          timestamp: new Date().toISOString(),
          source: "coholdHQ_waitlist",
        }),
      });

      // 2) FIRE META PIXEL (Browser-side)
      fbq("track", "Lead");
      fbq("track", "CompleteRegistration");
      fbq("trackCustom", "waitlistJoined");

      // 3) FIRE META CONVERSIONS API (Server-side)
      await fetch("/api/meta-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: result.data.email,
        }),
      });

      toast({
        title: "You're in! 🎉",
        description: "We'll notify you when Cohold launches.",
      });

      // RESET FORM
      setName("");
      setEmail("");
      setPhone("");
      setCode("+234");

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Try again.",
        variant: "destructive",
      });

      // Track failed registration
      fbq("track", "FailedRegistration");

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

            {/* PHONE INPUT */}
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <div className="flex gap-3">
                <Select value={code} onValueChange={setCode} disabled={isSubmitting}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {africanCodes.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.country} ({item.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="tel"
                  placeholder="8123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full h-12"
              onClick={() => {
                fbq("trackCustom", "waitlistButtonclicked");
              }} 
              >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
