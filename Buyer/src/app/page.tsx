import TopNavBar from "@/components/sections/TopNavBar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
// import HowItWorks from "@/components/sections/HowItWorks";
import Marketplace from "@/components/sections/Marketplace";
import CapabilitiesGrid from "@/components/sections/CapabilitiesGrid";
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
        {/* <HowItWorks /> */}
        <Marketplace />
        <CapabilitiesGrid />
        <DashboardShowcase />
        <Metrics />
        <TradeAssurance />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
