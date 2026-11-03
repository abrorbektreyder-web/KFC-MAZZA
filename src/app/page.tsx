import { HeroHybrid3D } from "@/components/HeroHybrid3D";
import { BentoDeals } from "@/components/BentoDeals";
import { MenuSection } from "@/components/MenuSection";
import { EventOrderSection } from "@/components/EventOrderSection";

export default function HomePage() {
  return (
    <>
      <HeroHybrid3D />
      <BentoDeals />
      <MenuSection />
      <EventOrderSection />
    </>
  );
}
