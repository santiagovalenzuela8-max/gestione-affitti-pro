import * as z from "zod";

export const AdminLoginFormSchema = z.object({
  email: z.email({ error: "Inserisci un'email valida." }).trim().toLowerCase(),
  password: z.string().min(1, { error: "Inserisci la password." }),
});

export type AdminLoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const NewClientFormSchema = z.object({
  name: z.string().trim().min(2, { error: "Il nome deve avere almeno 2 caratteri." }).max(100),
  email: z.email({ error: "Inserisci un'email valida." }).trim().toLowerCase(),
  propertyName: z
    .string()
    .trim()
    .min(2, { error: "Il nome dell'immobile deve avere almeno 2 caratteri." })
    .max(120),
  propertyLocation: z
    .string()
    .trim()
    .min(2, { error: "Indica il comune dell'immobile." })
    .max(120),
});

export type NewClientFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        propertyName?: string[];
        propertyLocation?: string[];
      };
      message?: string;
      temporaryPassword?: string;
      success?: boolean;
    }
  | undefined;

export const NewReportFormSchema = z.object({
  propertyId: z.string().min(1, { error: "Seleziona un immobile." }),
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/, { error: "Seleziona un mese valido." }),
  incassoLordo: z.coerce.number().min(0, { error: "Inserisci un importo valido." }),
  speseGestione: z.coerce.number().min(0, { error: "Inserisci un importo valido." }),
  altreSpese: z.coerce.number().min(0, { error: "Inserisci un importo valido." }).optional(),
  nottiPrenotate: z.coerce.number().int().min(0).optional(),
  tassoOccupazione: z.coerce.number().min(0).max(100).optional(),
  note: z.string().trim().max(2000).optional(),
});

export type NewReportFormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      success?: boolean;
    }
  | undefined;
