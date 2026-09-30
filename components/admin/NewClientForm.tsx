"use client";

import { useActionState } from "react";
import { createClient } from "@/app/actions/admin";

export function NewClientForm() {
  const [state, action, pending] = useActionState(createClient, undefined);

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Nome e cognome cliente
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Elena Bertani"
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        {state?.errors?.name && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email cliente
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="cliente@email.it"
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        {state?.errors?.email && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="propertyName" className="text-sm font-medium text-ink">
          Nome immobile
        </label>
        <input
          id="propertyName"
          name="propertyName"
          type="text"
          required
          placeholder="Villa sul lago"
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        {state?.errors?.propertyName && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.propertyName[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="propertyLocation" className="text-sm font-medium text-ink">
          Comune
        </label>
        <input
          id="propertyLocation"
          name="propertyLocation"
          type="text"
          required
          placeholder="Bardolino"
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        {state?.errors?.propertyLocation && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.propertyLocation[0]}</p>
        )}
      </div>

      {state?.message && !state.temporaryPassword && (
        <p className="text-sm font-medium text-red-600 sm:col-span-2">{state.message}</p>
      )}

      {state?.success && (
        <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-4 text-sm text-ink sm:col-span-2">
          {state.temporaryPassword ? (
            <>
              <p className="font-semibold text-cyan-800">Cliente creato.</p>
              <p className="mt-1">
                Password provvisoria:{" "}
                <code className="rounded bg-paper px-2 py-0.5 font-mono">
                  {state.temporaryPassword}
                </code>
              </p>
              <p className="mt-1 text-ink-soft">
                È stata inviata anche via email (se Resend è configurato).
              </p>
            </>
          ) : (
            <p>{state.message}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition hover:bg-noir-soft disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 sm:w-fit"
      >
        {pending ? "Creazione in corso..." : "Crea cliente"}
      </button>
    </form>
  );
}
