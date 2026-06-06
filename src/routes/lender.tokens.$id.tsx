import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { LenderShell } from "@/components/farmledge/LenderShell";
import { inventoryRows, formatKg, formatNgn, auditEvents } from "@/lib/farmledge-data";
import { ShieldCheck, Warehouse, CalendarBlank, Scales, CurrencyNgn, LinkSimple, LockSimple } from "@phosphor-icons/react";

export const Route = createFileRoute("/lender/tokens/$id")({
  loader: ({ params }) => {
    const token = inventoryRows.find((t) => t.id === params.id);
    if (!token) throw notFound();
    return { token };
  },
  component: TokenVerification,
});

function TokenVerification() {
  const { token } = Route.useLoaderData();
  const events = auditEvents.filter((e) => e.tokenId === token.id);
  return (
    <LenderShell title="Token verification" subtitle="Full provenance and current standing of this collateral record.">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-5">
          <div className="rounded-2xl bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="label-tracked">Token</p>
                <p className="font-mono text-sm text-earth-deep">{token.id}</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-earth-deep">{token.commodity}</h2>
                <p className="text-sm text-earth-mid">{token.grade}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-light/60 px-3 py-1 text-xs font-medium text-forest-dark">
                  <ShieldCheck weight="fill" className="size-4" /> NAQS verified warehouse
                </span>
                {token.status === "locked" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-alert-amber/25 px-3 py-1 text-xs font-medium text-earth-deep">
                    <LockSimple weight="fill" className="size-3.5" /> Locked · {token.loanRef}
                  </span>
                )}
              </div>
            </div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <Cell Icon={Scales} label="Weight" value={formatKg(token.weightKg)} />
              <Cell Icon={CurrencyNgn} label="Estimated value" value={formatNgn(token.valueNgn)} />
              <Cell Icon={Warehouse} label="Warehouse" value={`${token.warehouse}, ${token.warehouseCity}`} />
              <Cell Icon={CalendarBlank} label="Deposit date" value={token.depositDate} />
            </dl>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h3 className="font-display text-lg font-semibold text-earth-deep">Collateral analysis</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Metric label="Market price (Kano spot)" value={`${formatNgn(Math.round(token.valueNgn / (token.weightKg / 100)))}/100kg`} />
              <Metric label="Suggested LTV" value="60%" />
              <Metric label="Max loan amount" value={formatNgn(Math.round(token.valueNgn * 0.6))} />
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-earth-deep">Token history</h3>
              <Link to="/lender/audit" className="text-sm font-medium text-forest-dark">Full audit log →</Link>
            </div>
            <ol className="mt-4 space-y-3">
              {events.map((e) => (
                <li key={e.id} className="flex gap-3 rounded-lg bg-grain-pale p-3 text-sm">
                  <div className="mt-0.5 size-2 rounded-full bg-forest-mid" />
                  <div className="flex-1">
                    <p className="text-earth-deep">{e.description}</p>
                    <p className="mt-0.5 text-xs text-earth-mid">{e.date} · {e.actor} · <span className="font-mono">{e.txHash}</span></p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-card p-5">
            <p className="label-tracked">Custodian</p>
            <p className="mt-1 font-medium text-earth-deep">{token.custodianName}</p>
            <p className="text-sm text-earth-mid">{token.warehouse}</p>
            <p className="mt-2 text-xs text-earth-mid">NAQS Certified · Tier 2</p>
          </div>
          <div className="rounded-2xl bg-card p-5">
            <p className="label-tracked">Blockchain verification</p>
            <p className="mt-1 font-mono text-xs text-earth-deep">{token.txHash}</p>
            <a className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-forest-dark">
              <LinkSimple className="size-4" /> View on Stellar explorer
            </a>
          </div>
          <Link to="/lender/locks" className="flex h-12 w-full items-center justify-center rounded-lg bg-forest-dark text-sm font-semibold text-primary-foreground">
            Lock this token
          </Link>
        </aside>
      </div>
    </LenderShell>
  );
}

function Cell({ Icon, label, value }: { Icon: typeof ShieldCheck; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-grain-pale p-4">
      <div className="flex items-center gap-2 text-earth-mid"><Icon className="size-4" /><span className="text-[11px] uppercase tracking-wider">{label}</span></div>
      <p className="mt-1 font-medium text-earth-deep">{value}</p>
    </div>
  );
}
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-grain-pale p-4">
      <p className="text-[11px] font-medium uppercase tracking-wider text-earth-mid">{label}</p>
      <p className="mt-1 font-display text-xl font-semibold text-earth-deep">{value}</p>
    </div>
  );
}
