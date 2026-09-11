import type { Metadata } from "next";
import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { Services } from "@/components/Services";

export const metadata: Metadata = {
  title: "Servizi | Gestione Affitti Pro",
  description:
    "Gestione multi-piattaforma, check-in e pulizie, pricing dinamico, manutenzione e assistenza 24/7 per la tua casa vacanze a Verona, Lago di Garda e Trentino.",
};

export default function ServiziPage() {
  return (
    <>
      <PageHeader
        eyebrow="Servizi"
        title="Un unico referente per tutto ciò che serve alla tua casa"
        description="Dall'annuncio online al bucato, dal check-in alla dichiarazione dei redditi: gestiamo ogni dettaglio dell'affitto breve così tu devi solo controllare l'incasso."
      />
      <div className="pt-4 sm:pt-6">
        <Services />
      </div>
      <ContactBand />
    </>
  );
}
