import { ClientPortalSection } from "@/components/ClientPortalSection";
import { ContactBand } from "@/components/ContactBand";
import { Hero } from "@/components/Hero";
import { ProcessPreview } from "@/components/ProcessPreview";
import { Results } from "@/components/Results";
import { ServicesPreview } from "@/components/ServicesPreview";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";
import { Zones } from "@/components/Zones";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <ProcessPreview />
      <ClientPortalSection />
      <Zones />
      <Results />
      <Testimonials />
      <ContactBand />
    </>
  );
}
