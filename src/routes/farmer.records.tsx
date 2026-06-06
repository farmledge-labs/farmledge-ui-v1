import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FarmerScreen } from "@/components/farmledge/FarmerScreen";
import { tokens, formatKg, formatNgn } from "@/lib/farmledge-data";
import { CheckCircle, LockSimple, ArrowsLeftRight, ArrowRight, Package } from "@phosphor-icons/react";

export const Route = createFileRoute("/farmer/records")({
  component: Records,
});

const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Safe" },
  { id: "locked", label: "Locked" },
  { id: "transferred", label: "Transferred" },
  { id: "exited", label: "Released" },
] as const;

function StatusBadge({ status }: { status: string }) {
  if (status === "active")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-forest-light/60 px-2 py-0.5 text-[11px] font-medium text-forest-dark">
        <CheckCircle weight="fill" className="size-3" /> Safe
      </span>
    );
  if (status === "locked")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-alert-amber/25 px-2 py-0.5 text-[11px] font-medium text-earth-deep">
        <LockSimple weight="fill" className="size-3" /> Locked
      </span>
    );
  if (status === "transferred")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-earth-light/40 px-2 py-0.5 text-[11px] font-medium text-earth-deep">
        <ArrowsLeftRight weight="fill" className="size-3" /> Transferred
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-alert-red/15 px-2 py-0.5 text-[11px] font-medium text-alert-red">
      <ArrowRight weight="fill" className="size-3" /> Released
    </span>
  );
}

function Records() {
  const [filter, setFilter] = useState<typeof FILTERS[number]["id"]>("all");
  const list = filter === "all" ? tokens : tokens.filter((t) => t.status === filter);

  return (
    <FarmerScreen title="My Records">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filter === f.id ? "bg-earth-deep text-grain-pale" : "bg-grain-warm text-earth-mid"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="space-y-3">
          {list.map((t) => (
            <li key={t.id}>
              <Link
                to="/farmer/records/$id"
                params={{ id: t.id }}
                className={`block rounded-2xl border-l-4 bg-card p-4 shadow-[0_2px_8px_rgba(59,42,26,0.06)] ${
                  t.status === "active"
                    ? "border-forest-mid"
                    : t.status === "locked"
                      ? "border-alert-amber"
                      : t.status === "exited"
                        ? "border-alert-red"
                        : "border-earth-light"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-earth-mid">{t.depositDate}</p>
                    <p className="mt-0.5 font-display text-lg font-semibold text-earth-deep">{t.commodity}</p>
                    <p className="text-sm text-earth-mid">{formatKg(t.weightKg)} · {t.grade}</p>
                    <p className="mt-2 text-xs text-earth-mid">{t.warehouse}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-base font-semibold text-earth-deep">{formatNgn(t.valueNgn)}</p>
                    <div className="mt-1 flex justify-end"><StatusBadge status={t.status} /></div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </FarmerScreen>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 flex flex-col items-center text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-grain-warm">
        <Package weight="duotone" className="size-8 text-earth-mid" />
      </div>
      <h2 className="mt-5 font-display text-xl font-semibold text-earth-deep">No records yet</h2>
      <p className="mt-2 max-w-xs text-sm text-earth-mid">
        Once a warehouse records your first deposit, it will appear here — safely and clearly.
      </p>
    </div>
  );
}
