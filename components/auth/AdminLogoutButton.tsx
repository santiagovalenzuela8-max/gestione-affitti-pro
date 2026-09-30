import { adminLogout } from "@/app/actions/adminAuth";
import { IconLogOut } from "@/components/icons";

export function AdminLogoutButton() {
  return (
    <form action={adminLogout}>
      <button
        type="submit"
        className="flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-ink"
      >
        <IconLogOut className="h-4 w-4" />
        Esci
      </button>
    </form>
  );
}
