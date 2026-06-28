import TopNavBar from "@/components/sections/TopNavBar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import HowItWorks from "@/components/sections/HowItWorks";
import DualEntry from "@/components/sections/DualEntry";
import CapabilitiesGrid from "@/components/sections/CapabilitiesGrid";
import IndustryFocus from "@/components/sections/IndustryFocus";
import AiTradeIntel from "@/components/sections/AiTradeIntel";
import DashboardShowcase from "@/components/sections/DashboardShowcase";
import Metrics from "@/components/sections/Metrics";
import TradeAssurance from "@/components/sections/TradeAssurance";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface overflow-x-hidden">
      <TopNavBar />
      <main className="flex-grow">
        <Hero />
        <TrustBar />
        <HowItWorks />
        <DualEntry />
        <CapabilitiesGrid />
        <IndustryFocus />
        <AiTradeIntel />
        <DashboardShowcase />
        <Metrics />
        <TradeAssurance />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
