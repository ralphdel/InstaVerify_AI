import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustBar } from "@/components/landing/TrustBar";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ProductPreviewSection } from "@/components/landing/ProductPreviewSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { TractionSection } from "@/components/landing/TractionSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { MetricsSection } from "@/components/landing/MetricsSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const metadata = {
  title: "InstaVerify-AI — Verify Business Documents in Under 60 Seconds",
  description:
    "AI-powered forensic verification for CAC certificates and utility bills. Detect fraud instantly and onboard Nigerian businesses faster. No more 72-hour delays.",
};

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
      <LandingNav />
      <main>
        <HeroSection />
        <TrustBar />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <ProductPreviewSection />
        <MetricsSection />
        <ComparisonSection />
        <UseCasesSection />
        <TractionSection />
        <TestimonialsSection />
        <FinalCTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
