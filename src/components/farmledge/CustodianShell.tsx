import { Link, useRouterState } from "@tanstack/react-router";
import { ShieldCheck, House, PlusCircle, ListChecks, ArrowsCounterClockwise, CloudArrowUp, Gear, SignOut } from "@phosphor-icons/react";
import type { ReactNode } from "react";

const items = [
  { to: "/custodian", label: "Overview", Icon: House, exact: true },
  { to: "/custodian/new", label: "New Deposit", Icon: PlusCircle },
  { to: "/custodian/inventory", label: "Inventory", Icon: ListChecks },
  { to: "/custodian/exit", label: "Exit Goods", Icon: ArrowsCounterClockwise },
  { to: "/custodian/sync", label: "Pending Sync", Icon: CloudArrowUp, badge: 2 },
  { to: "/custodian/profile", label: "Profile", Icon: Gear },
];

export function CustodianShell({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="grain-bg flex min-h-screen bg-grain-pale">
      <aside className="hidden w-64 flex-col border-r border-border bg-card md:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <ShieldCheck weight="fill" className="size-6 text-forest-dark" />
          <span className="font-display text-lg font-semibold text-earth-deep">Farmledge</span>
          <span className="ml-auto rounded-full bg-grain-pale px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-earth-mid">Custodian</span>
        </div>
        <nav className="flex-1 px-3 py-2">
          <ul className="space-y-1">
            {items.map((it) => {
              const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
              return (
                <li key={it.to}>
                  <Link
                    to={it.to as never}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      active ? "bg-forest-dark text-primary-foreground" : "text-earth-deep hover:bg-grain-pale"
                    }`}
                  >
                    <it.Icon weight={active ? "fill" : "duotone"} className="size-5" />
                    <span>{it.label}</span>
                    {it.badge ? (
                      <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? "bg-white/20" : "bg-alert-amber/30 text-earth-deep"}`}>
                        {it.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-border p-3">
          <Link to="/custodian/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-earth-mid hover:bg-grain-pale">
            <SignOut className="size-5" /> Sign out
          </Link>
        </div>
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-grain-pale/95 px-6 py-4 backdrop-blur">
          <h1 className="font-display text-2xl font-semibold text-earth-deep">{title}</h1>
          <div className="ml-auto flex items-center gap-3">{actions}</div>
        </header>
        <main className="px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
