import { Hero } from "@/components/sections/Hero";
import { AppTabs } from "@/components/sections/AppTabs";
import { FlightMatrix } from "@/components/sections/FlightMatrix";
import { QuickActions } from "@/components/sections/QuickActions";
import { BrowseCatalog } from "@/components/sections/BrowseCatalog";
import { WhyDiscVault } from "@/components/sections/WhyDiscVault";
import { About } from "@/components/sections/About";
import { SecurityPrivacy } from "@/components/sections/SecurityPrivacy";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <AppTabs />
      <FlightMatrix />
      <QuickActions />
      <BrowseCatalog />
      <WhyDiscVault />
      <About />
      <SecurityPrivacy />
      <CTA />
    </>
  );
}
