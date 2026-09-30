import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getAdminSessionPayload } from "@/lib/adminSession";
import { AdminLogoutButton } from "@/components/auth/AdminLogoutButton";
import { NewClientForm } from "@/components/admin/NewClientForm";
import { NewReportForm } from "@/components/admin/NewReportForm";
import { IconUsers } from "@/components/icons";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Pannello amministratore | Gestione Affitti Pro",
  robots: { index: false, follow: false },
};

const currency = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
const monthLabel = new Intl.DateTimeFormat("it-IT", { month: "short", year: "numeric" });

export default async function AdminPage() {
  const session = await getAdminSessionPayload();
  if (!session) {
    redirect("/admin/login");
  }

  const users = await prisma.user.findMany({
    include: {
      properties: {
        include: { reports: { orderBy: { month: "desc" }, take: 1 } },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const propertyOptions = users.flatMap((user) =>
    user.properties.map((property) => ({
      id: property.id,
      label: `${user.name} — ${property.name}`,
    })),
  );

  return (
    <section className="bg-paper-dim py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between gap-4 border-b border-paper-line pb-6">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <h1 className="font-serif text-xl text-ink">Pannello amministratore</h1>
          </div>
          <AdminLogoutButton />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="border border-paper-line bg-paper p-6 shadow-sm shadow-ink/5">
            <h2 className="font-serif text-lg text-ink">Nuovo cliente</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Crea l&rsquo;accesso all&rsquo;Area Clienti e il primo immobile collegato.
            </p>
            <div className="mt-6">
              <NewClientForm />
            </div>
          </div>

          <div className="border border-paper-line bg-paper p-6 shadow-sm shadow-ink/5">
            <h2 className="font-serif text-lg text-ink">Nuovo rapportino mensile</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Se il mese esiste già per l&rsquo;immobile selezionato, viene aggiornato.
            </p>
            <div className="mt-6">
              <NewReportForm properties={propertyOptions} />
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-2 text-ink">
            <IconUsers className="h-5 w-5 text-cyan-600" />
            <h2 className="font-serif text-xl text-ink">Clienti</h2>
          </div>

          {users.length === 0 ? (
            <p className="mt-6 text-sm text-ink-soft">Nessun cliente ancora registrato.</p>
          ) : (
            <div className="mt-6 overflow-hidden border border-paper-line bg-paper">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-paper-line bg-paper-dim text-ink-soft">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Cliente</th>
                    <th className="px-4 py-3 font-semibold">Immobile</th>
                    <th className="px-4 py-3 font-semibold">Ultimo rapportino</th>
                    <th className="px-4 py-3 font-semibold">Profitto netto</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) =>
                    user.properties.length === 0 ? (
                      <tr key={user.id} className="border-b border-paper-line last:border-0">
                        <td className="px-4 py-3 text-ink">{user.name}</td>
                        <td className="px-4 py-3 text-ink-soft" colSpan={3}>
                          Nessun immobile
                        </td>
                      </tr>
                    ) : (
                      user.properties.map((property, index) => {
                        const latest = property.reports[0];
                        return (
                          <tr
                            key={property.id}
                            className="border-b border-paper-line last:border-0"
                          >
                            <td className="px-4 py-3 text-ink">
                              {index === 0 ? user.name : ""}
                            </td>
                            <td className="px-4 py-3 text-ink-soft">{property.name}</td>
                            <td className="px-4 py-3 text-ink-soft">
                              {latest ? capitalize(monthLabel.format(latest.month)) : "—"}
                            </td>
                            <td className="px-4 py-3 text-ink">
                              {latest ? currency.format(Number(latest.profittoNetto)) : "—"}
                            </td>
                          </tr>
                        );
                      })
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
