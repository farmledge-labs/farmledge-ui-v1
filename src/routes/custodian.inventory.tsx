import { createFileRoute } from "@tanstack/react-router";
import { CustodianShell } from "@/components/farmledge/CustodianShell";
import { inventoryRows, formatKg, formatNgn } from "@/lib/farmledge-data";
import { useState } from "react";
import { MagnifyingGlass, Funnel, CheckCircle, LockSimple, ArrowsLeftRight, ArrowRight } from "@phosphor-icons/react";

export const Route = createFileRoute("/custodian/inventory")({
  component: Inventory,
});

function Inventory() {
  const [q, setQ] = useState("");
  const rows = inventoryRows.filter((r) =>
    [r.id, r.farmerName, r.commodity].some((s) => s.toLowerCase().includes(q.toLowerCase())),
  );
  return (
    <CustodianShell title="Inventory">
      <div className="flex flex-wrap items-center gap-3 pb-4">
        <div className="relative flex-1 min-w-[240px]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by token, farmer, or commodity"
            className="h-11 w-full rounded-lg border border-earth-mid/40 bg-card pl-10 pr-3 text-sm"
          />
          <MagnifyingGlass className="absolute left-3 top-3 size-5 text-earth-mid" />
        </div>
        <button className="flex h-11 items-center gap-2 rounded-lg border border-earth-mid/40 bg-card px-4 text-sm font-medium text-earth-deep">
          <Funnel className="size-4" /> Filters
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-grain-pale text-[11px] uppercase tracking-wider text-earth-mid">
            <tr>
              <th className="px-4 py-3 font-medium">Token</th>
              <th className="font-medium">Farmer</th>
              <th className="font-medium">Commodity</th>
              <th className="font-medium">Grade</th>
              <th className="text-right font-medium">Weight</th>
              <th className="text-right font-medium">Value</th>
              <th className="font-medium">Deposit</th>
              <th className="px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-grain-pale/60">
                <td className="px-4 py-3 font-mono text-xs text-earth-deep">{r.id}</td>
                <td>{r.farmerName}</td>
                <td>{r.commodity}</td>
                <td className="text-earth-mid">{r.grade}</td>
                <td className="text-right font-medium">{formatKg(r.weightKg)}</td>
                <td className="text-right font-medium">{formatNgn(r.valueNgn)}</td>
                <td className="text-earth-mid">{r.depositDate}</td>
                <td className="px-4"><Badge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CustodianShell>
  );
}

function Badge({ status }: { status: string }) {
  if (status === "active") return <span className="inline-flex items-center gap-1 rounded-full bg-forest-light/60 px-2 py-0.5 text-[11px] font-medium text-forest-dark"><CheckCircle weight="fill" className="size-3" />Active</span>;
  if (status === "locked") return <span className="inline-flex items-center gap-1 rounded-full bg-alert-amber/25 px-2 py-0.5 text-[11px] font-medium text-earth-deep"><LockSimple weight="fill" className="size-3" />Locked</span>;
  if (status === "transferred") return <span className="inline-flex items-center gap-1 rounded-full bg-earth-light/40 px-2 py-0.5 text-[11px] font-medium text-earth-deep"><ArrowsLeftRight weight="fill" className="size-3" />Transferred</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-alert-red/15 px-2 py-0.5 text-[11px] font-medium text-alert-red"><ArrowRight weight="fill" className="size-3" />Exited</span>;
}
