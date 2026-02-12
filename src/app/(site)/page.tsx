import { HeroSection } from "@/components/landing/hero-section";
import { LiveTickerSection } from "@/components/landing/live-ticker-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PopularDealsSection } from "@/components/landing/popular-deals-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { PartnerStoresSection } from "@/components/landing/partner-stores-section";
import { CTASection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LiveTickerSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PopularDealsSection />
      <TestimonialsSection />
      <PricingSection />
      <PartnerStoresSection />
      <CTASection />
    </>
  );
}
