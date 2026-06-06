import { Link, useRouterState } from "@tanstack/react-router";
import { ShieldCheck, SignOut } from "@phosphor-icons/react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/lender", label: "Farmer Lookup", exact: true },
  { to: "/lender/locks", label: "Lock Management" },
  { to: "/lender/keys", label: "API & Keys" },
  { to: "/lender/audit", label: "Audit Log" },
];

export function LenderShell({ title, subtitle, children, actions }: { title: string; subtitle?: string; children: ReactNode; actions?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="grain-bg min-h-screen bg-grain-pale">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-8 py-4">
          <div className="flex items-center gap-2">
            <ShieldCheck weight="fill" className="size-6 text-forest-dark" />
            <span className="font-display text-lg font-semibold text-earth-deep">Farmledge</span>
            <span className="ml-1 rounded-full bg-grain-pale px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-earth-mid">Lender</span>
          </div>
          <nav className="flex items-center gap-1">
            {tabs.map((t) => {
              const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
              return (
                <Link
                  key={t.to}
                  to={t.to as never}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${active ? "bg-forest-dark text-primary-foreground" : "text-earth-deep hover:bg-grain-pale"}`}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right text-xs">
              <p className="font-medium text-earth-deep">Tunde Adekunle</p>
              <p className="text-earth-mid">Karfi Microfinance Bank</p>
            </div>
            <Link to="/lender/login" className="flex size-9 items-center justify-center rounded-full bg-grain-pale text-earth-mid hover:bg-grain-warm"><SignOut className="size-4" /></Link>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-8 py-8">
        <div className="flex items-end justify-between gap-4 pb-6">
          <div>
            <h1 className="font-display text-3xl font-semibold text-earth-deep">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-earth-mid">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">{actions}</div>
        </div>
        {children}
      </div>
    </div>
  );
}
