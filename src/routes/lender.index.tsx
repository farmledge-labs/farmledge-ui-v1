import { createFileRoute, Link } from "@tanstack/react-router";
import { LenderShell } from "@/components/farmledge/LenderShell";
import { farmerSearchResults, tokens, formatKg, formatNgn } from "@/lib/farmledge-data";
import { useState } from "react";
import { MagnifyingGlass, ShieldCheck, ArrowRight, LockSimple, CheckCircle } from "@phosphor-icons/react";

export const Route = createFileRoute("/lender/")({
  head: () => ({
    meta: [
      { title: "Farmer Lookup — Farmledge Lender" },
      { name: "description", content: "Instantly verify a farmer’s on-warehouse collateral." },
    ],
  }),
  component: Lookup,
});

function Lookup() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(farmerSearchResults[0].phone);
  const farmer = farmerSearchResults.find((f) => f.phone === selected);
  const matches = q ? farmerSearchResults.filter((f) => f.phone.includes(q) || f.name.toLowerCase().includes(q.toLowerCase())) : farmerSearchResults;

  const farmerTokens = farmer ? tokens.filter((t) => t.farmerPhone === farmer.phone) : [];
  const active = farmerTokens.filter((t) => t.status === "active" || t.status === "locked");
  const totalWeight = active.reduce((s, t) => s + t.weightKg, 0);
  const totalValue = active.reduce((s, t) => s + t.valueNgn, 0);
  const ltv = totalValue ? Math.round((500000 / totalValue) * 100) : 0;
  const byCommodity = Object.entries(
    active.reduce<Record<string, number>>((acc, t) => {
      acc[t.commodity] = (acc[t.commodity] ?? 0) + t.weightKg;
      return acc;
    }, {}),
  );

  return (
    <LenderShell title="Farmer Lookup" subtitle="Search by phone or name to verify collateral in real time.">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-3">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Phone or name"
              className="h-11 w-full rounded-lg border border-earth-mid/40 bg-card pl-10 pr-3 text-sm"
            />
            <MagnifyingGlass className="absolute left-3 top-3 size-5 text-earth-mid" />
          </div>
          <ul className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card">
            {matches.map((f) => (
              <li key={f.phone}>
                <button
                  onClick={() => setSelected(f.phone)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-grain-pale ${selected === f.phone ? "bg-grain-pale" : ""}`}
                >
                  <div>
                    <p className="font-medium text-earth-deep">{f.name}</p>
                    <p className="text-xs text-earth-mid">{f.village}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-earth-deep">{formatNgn(f.totalValue)}</p>
                    <p className="text-[11px] text-earth-mid">{f.activeTokens} tokens</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {farmer && (
          <section className="space-y-5">
            <div className="rounded-2xl bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="label-tracked">Farmer</p>
                  <h2 className="font-display text-2xl font-semibold text-earth-deep">{farmer.name}</h2>
                  <p className="text-sm text-earth-mid">{farmer.phone} · {farmer.village}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-light/60 px-3 py-1 text-xs font-medium text-forest-dark">
                  <ShieldCheck weight="fill" className="size-4" /> Verified custodian record
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <Stat label="Active tokens" value={String(active.length)} />
                <Stat label="Total weight" value={formatKg(totalWeight)} />
                <Stat label="Estimated value" value={formatNgn(totalValue)} accent />
                <Stat label="Current LTV" value={`${ltv}%`} />
              </div>
            </div>

            <div className="rounded-2xl bg-card p-6">
              <h3 className="font-display text-lg font-semibold text-earth-deep">Commodity breakdown</h3>
              <ul className="mt-4 space-y-3">
                {byCommodity.map(([name, kg]) => {
                  const pct = Math.round((kg / totalWeight) * 100);
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
            </div>

            <div className="overflow-hidden rounded-2xl bg-card">
              <div className="flex items-center justify-between px-6 py-4">
                <h3 className="font-display text-lg font-semibold text-earth-deep">Tokens</h3>
                <Link to="/lender/locks" className="text-sm font-medium text-forest-dark">Manage locks →</Link>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-grain-pale text-[11px] uppercase tracking-wider text-earth-mid">
                  <tr>
                    <th className="px-6 py-3 font-medium">Token</th>
                    <th className="font-medium">Commodity</th>
                    <th className="text-right font-medium">Weight</th>
                    <th className="text-right font-medium">Value</th>
                    <th className="font-medium">Warehouse</th>
                    <th className="px-6 font-medium">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {farmerTokens.map((t) => (
                    <tr key={t.id}>
                      <td className="px-6 py-3 font-mono text-xs text-earth-deep">{t.id}</td>
                      <td>{t.commodity} <span className="text-earth-mid">· {t.grade}</span></td>
                      <td className="text-right">{formatKg(t.weightKg)}</td>
                      <td className="text-right font-medium">{formatNgn(t.valueNgn)}</td>
                      <td className="text-earth-mid">{t.warehouse}</td>
                      <td className="px-6">
                        {t.status === "locked" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-alert-amber/25 px-2 py-0.5 text-[11px] font-medium text-earth-deep"><LockSimple weight="fill" className="size-3" />Locked</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-forest-light/60 px-2 py-0.5 text-[11px] font-medium text-forest-dark"><CheckCircle weight="fill" className="size-3" />Available</span>
                        )}
                      </td>
                      <td className="pr-4">
                        <Link to="/lender/tokens/$id" params={{ id: t.id }} className="inline-flex items-center gap-1 text-sm font-medium text-forest-dark">
                          Verify <ArrowRight className="size-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </LenderShell>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${accent ? "bg-forest-dark text-primary-foreground" : "bg-grain-pale"}`}>
      <p className={`text-[11px] font-medium uppercase tracking-wider ${accent ? "text-forest-light/90" : "text-earth-mid"}`}>{label}</p>
      <p className={`mt-1.5 font-display text-2xl font-semibold ${accent ? "text-primary-foreground" : "text-earth-deep"}`}>{value}</p>
    </div>
  );
}
