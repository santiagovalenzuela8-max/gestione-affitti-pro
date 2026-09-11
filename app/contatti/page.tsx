import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contatti | Gestione Affitti Pro",
  description:
    "Contatta Gestione Affitti Pro per una valutazione gratuita della tua casa vacanze a Verona, Lago di Garda o Trentino. Risposta entro 24 ore.",
};

export default function ContattiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contatti"
        title="Parliamo della tua casa vacanze"
        description="Compila il modulo o scrivici su WhatsApp: ti rispondiamo entro 24 ore con una stima realistica di incasso e occupazione, senza impegno."
        showCta={false}
      />
      <div className="pt-4 sm:pt-6">
        <ContactCTA />
      </div>
    </>
  );
}
