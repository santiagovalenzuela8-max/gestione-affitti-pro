"use client";

import { useActionState, useState } from "react";
import { changePassword } from "@/app/actions/auth";

export function ChangePasswordForm() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(changePassword, undefined);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-medium text-ink-soft underline decoration-paper-line underline-offset-4 transition hover:text-ink"
      >
        Cambia password
      </button>
    );
  }

  return (
    <form action={action} className="max-w-sm space-y-4">
      <div>
        <label htmlFor="currentPassword" className="text-sm font-medium text-ink">
          Password attuale
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        {state?.errors?.currentPassword && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.currentPassword[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="newPassword" className="text-sm font-medium text-ink">
          Nuova password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          autoComplete="new-password"
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-2.5 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        {state?.errors?.newPassword && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.newPassword[0]}</p>
        )}
      </div>

      {state?.message && (
        <p className={`text-sm font-medium ${state.success ? "text-cyan-700" : "text-red-600"}`}>
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-noir-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Salvataggio..." : "Salva"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm font-medium text-ink-soft hover:text-ink"
        >
          Annulla
        </button>
      </div>
    </form>
  );
}
