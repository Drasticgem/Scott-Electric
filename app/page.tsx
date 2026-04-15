import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyScottElectric } from "@/components/sections/WhyScottElectric";
import { About } from "@/components/sections/About";
import { Clients } from "@/components/sections/Clients";
import { Community } from "@/components/sections/Community";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyScottElectric />
      <About />
      <Clients />
      <Community />
      <CTA />
    </>
  );
}
