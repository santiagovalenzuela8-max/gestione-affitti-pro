import type { Metadata } from "next";
import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { Process } from "@/components/Process";

export const metadata: Metadata = {
  title: "Come funziona | Gestione Affitti Pro",
  description:
    "Dalla valutazione gratuita al primo bonifico: scopri come Gestione Affitti Pro prende in carico la tua casa vacanze, passo dopo passo.",
};

export default function ComeFunzionaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Come funziona"
        title="Dalla prima chiamata al primo bonifico"
        description="Un percorso chiaro in quattro fasi: valutiamo la tua casa, la mettiamo online, la gestiamo ogni giorno e ti inviamo un report puntuale con l'incasso già accreditato."
      />
      <div className="pt-4 sm:pt-6">
        <Process />
      </div>
      <ContactBand />
    </>
  );
}
