"use client";

import { useActionState } from "react";
import { createReport } from "@/app/actions/admin";

type PropertyOption = {
  id: string;
  label: string;
};

export function NewReportForm({ properties }: { properties: PropertyOption[] }) {
  const [state, action, pending] = useActionState(createReport, undefined);

  if (properties.length === 0) {
    return (
      <p className="text-sm text-ink-soft">
        Crea prima un cliente con un immobile per poter inserire un rapportino.
      </p>
    );
  }

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="propertyId" className="text-sm font-medium text-ink">
          Immobile
        </label>
        <select
          id="propertyId"
          name="propertyId"
          required
          defaultValue=""
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        >
          <option value="" disabled>
            Seleziona un immobile
          </option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.label}
            </option>
          ))}
        </select>
        {state?.errors?.propertyId && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.propertyId[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="month" className="text-sm font-medium text-ink">
          Mese di riferimento
        </label>
        <input
          id="month"
          name="month"
          type="month"
          required
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        {state?.errors?.month && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.month[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="incassoLordo" className="text-sm font-medium text-ink">
          Incasso lordo (€)
        </label>
        <input
          id="incassoLordo"
          name="incassoLordo"
          type="number"
          step="0.01"
          min="0"
          required
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        {state?.errors?.incassoLordo && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.incassoLordo[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="speseGestione" className="text-sm font-medium text-ink">
          Spese di gestione (€)
        </label>
        <input
          id="speseGestione"
          name="speseGestione"
          type="number"
          step="0.01"
          min="0"
          required
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        {state?.errors?.speseGestione && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.speseGestione[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="altreSpese" className="text-sm font-medium text-ink">
          Altre spese (€)
        </label>
        <input
          id="altreSpese"
          name="altreSpese"
          type="number"
          step="0.01"
          min="0"
          defaultValue="0"
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </div>

      <div>
        <label htmlFor="nottiPrenotate" className="text-sm font-medium text-ink">
          Notti prenotate
        </label>
        <input
          id="nottiPrenotate"
          name="nottiPrenotate"
          type="number"
          step="1"
          min="0"
          defaultValue="0"
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </div>

      <div>
        <label htmlFor="tassoOccupazione" className="text-sm font-medium text-ink">
          Occupazione (%)
        </label>
        <input
          id="tassoOccupazione"
          name="tassoOccupazione"
          type="number"
          step="0.1"
          min="0"
          max="100"
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="note" className="text-sm font-medium text-ink">
          Note (facoltativo)
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          className="mt-2 w-full resize-none rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </div>

      {state?.message && (
        <p
          className={`text-sm font-medium sm:col-span-2 ${
            state.success ? "text-cyan-700" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition hover:bg-noir-soft disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 sm:w-fit"
      >
        {pending ? "Salvataggio..." : "Salva rapportino"}
      </button>
    </form>
  );
}
