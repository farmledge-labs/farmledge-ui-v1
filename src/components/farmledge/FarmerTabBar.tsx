import { Link, useRouterState } from "@tanstack/react-router";
import { House, ListBullets, ArrowsLeftRight, FileText, User } from "@phosphor-icons/react";

const tabs: Array<{ to: string; label: string; Icon: typeof House; exact?: boolean }> = [
  { to: "/farmer", label: "Home", Icon: House, exact: true },
  { to: "/farmer/records", label: "Records", Icon: ListBullets },
  { to: "/farmer/transfer", label: "Transfer", Icon: ArrowsLeftRight },
  { to: "/farmer/certificates", label: "Certificates", Icon: FileText },
  { to: "/farmer/profile", label: "Profile", Icon: User },
];

export function FarmerTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="sticky bottom-0 z-20 border-t border-border bg-grain-pale/95 backdrop-blur">
      <ul className="mx-auto grid max-w-md grid-cols-5 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
        {tabs.map((t) => {
          const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
          return (
            <li key={t.to}>
              <Link
                to={t.to as never}
                className={`flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition ${
                  active ? "text-earth-deep" : "text-earth-mid"
                }`}
              >
                <t.Icon weight={active ? "fill" : "regular"} className={`size-[22px] ${active ? "text-forest-mid" : "text-earth-mid"}`} />
                <span>{t.label}</span>
                <span className={`h-0.5 w-6 rounded-full ${active ? "bg-forest-mid" : "bg-transparent"}`} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
