import { createFileRoute, Link } from "@tanstack/react-router";
import { CustodianShell } from "@/components/farmledge/CustodianShell";
import { custodian, todayDeposits, pendingSyncQueue, inventoryRows, formatKg, formatNgn } from "@/lib/farmledge-data";
import { Package, WarningCircle, CloudArrowUp, ArrowRight } from "@phosphor-icons/react";

export const Route = createFileRoute("/custodian/")({
  head: () => ({
    meta: [
      { title: "Overview — Farmledge Custodian" },
      { name: "description", content: "Today's deposits, inventory, and pending sync at your warehouse." },
    ],
  }),
  component: Overview,
});

function Overview() {
  const totalKg = inventoryRows.filter((t) => t.status === "active" || t.status === "locked").reduce((s, t) => s + t.weightKg, 0);
  const totalValue = inventoryRows.filter((t) => t.status === "active" || t.status === "locked").reduce((s, t) => s + t.valueNgn, 0);
  const byCommodity = Object.entries(
    inventoryRows
      .filter((t) => t.status === "active" || t.status === "locked")
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.commodity] = (acc[t.commodity] ?? 0) + t.weightKg;
        return acc;
      }, {}),
  );

  return (
    <CustodianShell
      title="Overview"
      actions={
        <Link
          to="/custodian/new"
          className="flex h-10 items-center gap-2 rounded-lg bg-forest-dark px-4 text-sm font-semibold text-primary-foreground"
        >
          + New deposit
        </Link>
      }
    >
      <div className="mb-2">
        <p className="text-sm text-earth-mid">{custodian.warehouse} · {custodian.city}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Deposits today" value={String(todayDeposits.length)} />
        <Stat label="Active inventory" value={formatKg(totalKg)} />
        <Stat label="Stored value" value={formatNgn(totalValue)} />
        <Stat label="Pending sync" value={String(pendingSyncQueue.length)} accent={pendingSyncQueue.length > 0} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-earth-deep">Today’s deposits</h2>
            <Link to="/custodian/inventory" className="text-sm font-medium text-forest-dark inline-flex items-center gap-1">
              Open inventory <ArrowRight className="size-4" />
            </Link>
          </div>
          <table className="mt-4 w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-earth-mid">
              <tr><th className="py-2 font-medium">Time</th><th className="font-medium">Token</th><th className="font-medium">Farmer</th><th className="font-medium">Commodity</th><th className="text-right font-medium">Weight</th></tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {todayDeposits.map((d) => (
                <tr key={d.id}>
                  <td className="py-3 text-earth-mid">{d.time}</td>
                  <td className="font-mono text-xs text-earth-deep">{d.id}</td>
                  <td className="text-earth-deep">{d.farmer}</td>
                  <td className="text-earth-deep">{d.commodity}</td>
                  <td className="py-3 text-right font-medium text-earth-deep">{formatKg(d.weightKg)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-2xl bg-card p-5">
          <h2 className="font-display text-lg font-semibold text-earth-deep">Inventory by commodity</h2>
          <ul className="mt-4 space-y-3">
            {byCommodity.map(([name, kg]) => {
              const pct = Math.round((kg / totalKg) * 100);
              return (
                <li key={name}>
                  <div className="flex justify-between text-sm">
                    <span className="text-earth-deep">{name}</span>
                    <span className="text-earth-mid">{formatKg(kg)} · {pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-grain-pale">
                    <div className="h-full bg-forest-mid" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border-l-4 border-alert-amber bg-card p-5">
          <div className="flex items-center gap-2">
            <CloudArrowUp weight="duotone" className="size-5 text-alert-amber" />
            <h2 className="font-display text-base font-semibold text-earth-deep">Pending sync queue</h2>
          </div>
          <p className="mt-1 text-sm text-earth-mid">{pendingSyncQueue.length} deposits saved offline.</p>
          <ul className="mt-3 space-y-2 text-sm">
            {pendingSyncQueue.map((p) => (
              <li key={p.tempId} className="flex justify-between rounded-lg bg-grain-pale px-3 py-2">
                <span className="text-earth-deep">{p.farmer} · {p.commodity}</span>
                <span className="text-earth-mid">{formatKg(p.weightKg)} · {p.savedAt}</span>
              </li>
            ))}
          </ul>
          <Link to="/custodian/sync" className="mt-4 inline-flex text-sm font-medium text-forest-dark">Review queue →</Link>
        </section>

        <section className="rounded-2xl border-l-4 border-alert-red bg-card p-5">
          <div className="flex items-center gap-2">
            <WarningCircle weight="duotone" className="size-5 text-alert-red" />
            <h2 className="font-display text-base font-semibold text-earth-deep">Alerts</h2>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-earth-deep">
            <li className="flex gap-2"><Package className="size-4 text-earth-mid" /> Token KN-2026-000019 marked for exit — pending custodian sign-off.</li>
            <li className="flex gap-2"><Package className="size-4 text-earth-mid" /> Hardware wallet last connected 2 days ago.</li>
          </ul>
        </section>
      </div>
    </CustodianShell>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl bg-card p-5 ${accent ? "ring-1 ring-alert-amber/40" : ""}`}>
      <p className="label-tracked">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-earth-deep">{value}</p>
    </div>
  );
}
