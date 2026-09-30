import { logout } from "@/app/actions/auth";
import { IconLogOut } from "@/components/icons";

export function LogoutButton() {
  return (
    <form action={logout}>
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
