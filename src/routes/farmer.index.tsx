import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Bell, ArrowRight, Package, LockSimple, ArrowsLeftRight, CheckCircle } from "@phosphor-icons/react";
import { FarmerScreen } from "@/components/farmledge/FarmerScreen";
import { activity, farmer, formatKg, formatNgn, tokens } from "@/lib/farmledge-data";

export const Route = createFileRoute("/farmer/")({
  head: () => ({
    meta: [
      { title: "Home — Farmledge" },
      { name: "description", content: "Your stored goods, safely recorded." },
    ],
  }),
  component: FarmerHome,
});

function FarmerHome() {
  const active = tokens.filter((t) => t.status === "active" || t.status === "locked");
  const totalValue = active.reduce((sum, t) => sum + t.valueNgn, 0);
  const totalKg = active.reduce((sum, t) => sum + t.weightKg, 0);

  return (
    <FarmerScreen>
      <div className="flex items-center justify-between pb-4 pt-1">
        <div>
          <p className="label-tracked">Sannu</p>
          <h1 className="font-display text-2xl font-semibold text-earth-deep">{farmer.name}</h1>
        </div>
        <Link
          to="/farmer/notifications"
          className="relative flex size-10 items-center justify-center rounded-full bg-grain-warm text-earth-deep"
        >
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-alert-red" />
        </Link>
      </div>

      {/* Safety hero */}
      <section className="relative overflow-hidden rounded-2xl bg-forest-dark p-6 text-primary-foreground shadow-[0_8px_30px_rgba(45,80,22,0.25)]">
        <div className="absolute -right-6 -top-6 size-40 rounded-full bg-forest-mid/40 blur-2xl" />
        <div className="relative flex items-start gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-forest-mid/40">
            <ShieldCheck weight="fill" className="size-6" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-forest-light/90">Stored value</p>
            <p className="mt-1 font-display text-[40px] font-semibold leading-none">{formatNgn(totalValue)}</p>
            <p className="mt-2 text-sm text-forest-light/90">All your goods are recorded and safe.</p>
          </div>
        </div>
        <div className="relative mt-5 grid grid-cols-2 gap-3 border-t border-white/15 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-forest-light/80">Active records</p>
            <p className="mt-1 font-display text-xl font-semibold">{active.length}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-forest-light/80">Total weight</p>
            <p className="mt-1 font-display text-xl font-semibold">{formatKg(totalKg)}</p>
          </div>
        </div>
      </section>

      {/* Latest deposit */}
      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-earth-deep">Most recent deposit</h2>
          <Link to="/farmer/records" className="text-sm font-medium text-forest-dark">View all</Link>
        </div>
        <Link
          to="/farmer/records/$id"
          params={{ id: tokens[0].id }}
          className="mt-3 block rounded-2xl border-l-4 border-forest-mid bg-card p-4 shadow-[0_2px_8px_rgba(59,42,26,0.06)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-earth-mid">{tokens[0].depositDate}</p>
              <p className="mt-0.5 font-display text-lg font-semibold text-earth-deep">{tokens[0].commodity}</p>
              <p className="text-sm text-earth-mid">{formatKg(tokens[0].weightKg)} · {tokens[0].grade}</p>
              <p className="mt-2 text-xs text-earth-mid">{tokens[0].warehouse}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-lg font-semibold text-earth-deep">{formatNgn(tokens[0].valueNgn)}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-forest-light/60 px-2 py-0.5 text-[11px] font-medium text-forest-dark">
                <CheckCircle weight="fill" className="size-3" /> Safe
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Recent activity */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-semibold text-earth-deep">Recent activity</h2>
        <ul className="mt-3 space-y-2">
          {activity.slice(0, 3).map((e) => (
            <li key={e.id} className="flex gap-3 rounded-xl bg-card/70 p-3">
              <div className="mt-0.5 flex size-9 items-center justify-center rounded-full bg-grain-pale text-forest-dark">
                {e.type === "deposit" && <Package weight="duotone" className="size-5" />}
                {e.type === "lock" && <LockSimple weight="duotone" className="size-5" />}
                {e.type === "transfer" && <ArrowsLeftRight weight="duotone" className="size-5" />}
                {e.type === "exit" && <ArrowRight weight="duotone" className="size-5" />}
                {e.type === "unlock" && <CheckCircle weight="duotone" className="size-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-earth-deep">{e.description}</p>
                <p className="mt-0.5 text-xs text-earth-mid">{e.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </FarmerScreen>
  );
}
