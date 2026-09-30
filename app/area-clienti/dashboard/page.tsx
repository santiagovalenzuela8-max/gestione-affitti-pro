import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSessionPayload } from "@/lib/session";
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { IconMapPin } from "@/components/icons";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "La tua area clienti | Gestione Affitti Pro",
  robots: { index: false, follow: false },
};

const currency = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
const monthLabel = new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric" });

export default async function DashboardPage() {
  const session = await getSessionPayload();
  if (!session) {
    redirect("/area-clienti/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      properties: {
        include: { reports: { orderBy: { month: "desc" } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!user) {
    redirect("/area-clienti/login");
  }

  return (
    <section className="bg-paper-dim py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between gap-4 border-b border-paper-line pb-6">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <div>
              <p className="text-sm text-ink-soft">Bentornato/a,</p>
              <h1 className="font-serif text-xl text-ink">{user.name}</h1>
            </div>
          </div>
          <LogoutButton />
        </div>

        {user.properties.length === 0 ? (
          <p className="mt-10 text-ink-soft">
            Non ci sono ancora immobili collegati al tuo account. Contattaci se pensi sia un
            errore.
          </p>
        ) : (
          <div className="mt-10 space-y-14">
            {user.properties.map((property) => (
              <div key={property.id}>
                <div className="flex items-center gap-2 text-ink">
                  <IconMapPin className="h-5 w-5 text-cyan-600" />
                  <h2 className="font-serif text-2xl text-ink">{property.name}</h2>
                </div>
                <p className="mt-1 text-sm text-ink-soft">{property.location}</p>

                {property.reports.length === 0 ? (
                  <p className="mt-6 text-sm text-ink-soft">
                    Il primo rapportino mensile non è ancora disponibile.
                  </p>
                ) : (
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {property.reports.map((report) => (
                      <div
                        key={report.id}
                        className="border border-paper-line bg-paper p-6 shadow-sm shadow-ink/5"
                      >
                        <p className="text-sm font-semibold uppercase tracking-wide text-gold-700">
                          {capitalize(monthLabel.format(report.month))}
                        </p>

                        <dl className="mt-4 space-y-2.5 text-sm">
                          <div className="flex items-center justify-between">
                            <dt className="text-ink-soft">Incasso lordo</dt>
                            <dd className="font-semibold text-ink">
                              {currency.format(Number(report.incassoLordo))}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-ink-soft">Spese di gestione</dt>
                            <dd className="text-ink">
                              {currency.format(Number(report.speseGestione))}
                            </dd>
                          </div>
                          {Number(report.altreSpese) > 0 && (
                            <div className="flex items-center justify-between">
                              <dt className="text-ink-soft">Altre spese</dt>
                              <dd className="text-ink">
                                {currency.format(Number(report.altreSpese))}
                              </dd>
                            </div>
                          )}
                          <div className="flex items-center justify-between border-t border-paper-line pt-2.5">
                            <dt className="font-semibold text-ink">Profitto netto</dt>
                            <dd className="font-serif text-lg text-cyan-700">
                              {currency.format(Number(report.profittoNetto))}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between pt-1 text-ink-soft">
                            <dt>Notti prenotate</dt>
                            <dd>{report.nottiPrenotate}</dd>
                          </div>
                          {report.tassoOccupazione != null && (
                            <div className="flex items-center justify-between text-ink-soft">
                              <dt>Occupazione</dt>
                              <dd>{Number(report.tassoOccupazione)}%</dd>
                            </div>
                          )}
                        </dl>

                        {report.note && (
                          <p className="mt-4 border-t border-paper-line pt-3 text-sm text-ink-soft">
                            {report.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 border-t border-paper-line pt-8">
          <ChangePasswordForm />
        </div>
      </div>
    </section>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
