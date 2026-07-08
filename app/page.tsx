import { Hero } from "@/components/sections/Hero";
import { AppTabs } from "@/components/sections/AppTabs";
import { QuickActions } from "@/components/sections/QuickActions";
import { WhyDiscVault } from "@/components/sections/WhyDiscVault";
import { About } from "@/components/sections/About";
import { SecurityPrivacy } from "@/components/sections/SecurityPrivacy";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <AppTabs />
      <QuickActions />
      <WhyDiscVault />
      <About />
      <SecurityPrivacy />
      <CTA />
    </>
  );
}
