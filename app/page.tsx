import { Hero } from "@/components/sections/Hero";
import { Divisions } from "@/components/sections/Divisions";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Clients } from "@/components/sections/Clients";
import { Community } from "@/components/sections/Community";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Divisions />
      <Stats />
      <Services />
      <About />
      <Clients />
      <Community />
      <CTA />
    </>
  );
}
