import { redirect } from "next/navigation";
import { getSessionPayload } from "@/lib/session";

export default async function AreaClientiPage() {
  const session = await getSessionPayload();
  redirect(session ? "/area-clienti/dashboard" : "/area-clienti/login");
}
