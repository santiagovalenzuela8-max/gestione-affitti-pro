"use client";

import { useActionState } from "react";
import { adminLogin } from "@/app/actions/adminAuth";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(adminLogin, undefined);

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-3 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        {state?.errors?.email && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border border-paper-line bg-paper-dim px-4 py-3 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        {state?.errors?.password && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.password[0]}</p>
        )}
      </div>

      {state?.message && (
        <p className="text-center text-sm font-medium text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-paper shadow-lg shadow-ink/15 transition hover:bg-noir-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Accesso in corso..." : "Accedi"}
      </button>
    </form>
  );
}
