"use client";

import { useState } from "react";

// Campi nascosti per il controllo anti-bot lato server (vedi lib/botCheck.ts):
// - honeypot: un campo esca fuori schermo, invisibile e non raggiungibile da
//   tastiera per una persona reale, ma spesso compilato dai bot.
// - timestamp: il momento in cui il form è comparso, per scartare invii
//   troppo rapidi per essere una persona che ha letto e scritto qualcosa.
export function BotCheckFields() {
  const [renderedAt] = useState(() => Date.now());

  return (
    <>
      <input
        type="text"
        name="azienda_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      />
      <input type="hidden" name="form_rendered_at" value={renderedAt} />
    </>
  );
}
