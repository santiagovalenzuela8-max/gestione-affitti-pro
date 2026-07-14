import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileCTABar } from "@/components/MobileCTABar";
import { Process } from "@/components/Process";
import { Results } from "@/components/Results";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";
import { Zones } from "@/components/Zones";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Services />
        <Process />
        <Zones />
        <Results />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
