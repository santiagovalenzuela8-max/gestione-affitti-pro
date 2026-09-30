import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email({ error: "Inserisci un'email valida." }).trim().toLowerCase(),
  password: z.string().min(1, { error: "Inserisci la password." }),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const ChangePasswordFormSchema = z.object({
  currentPassword: z.string().min(1, { error: "Inserisci la password attuale." }),
  newPassword: z
    .string()
    .min(8, { error: "La nuova password deve avere almeno 8 caratteri." })
    .regex(/[a-zA-Z]/, { error: "Deve contenere almeno una lettera." })
    .regex(/[0-9]/, { error: "Deve contenere almeno un numero." }),
});

export type ChangePasswordFormState =
  | {
      errors?: {
        currentPassword?: string[];
        newPassword?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
