import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ExplainerSection } from "@/components/ExplainerSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <div id="waitlist">
        <WaitlistForm />
      </div>
      <div id="explainer">
        <ExplainerSection />
      </div>
      <div id="benefits">
        <BenefitsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
