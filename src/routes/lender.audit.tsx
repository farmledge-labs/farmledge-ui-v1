import { createFileRoute } from "@tanstack/react-router";
import { LenderShell } from "@/components/farmledge/LenderShell";
import { auditEvents } from "@/lib/farmledge-data";
import { useState } from "react";
import { Package, LockSimple, ArrowsLeftRight, ArrowRight, CheckCircle, MagnifyingGlass } from "@phosphor-icons/react";

const TYPES = ["all", "deposit", "transfer", "lock", "unlock", "exit"] as const;

export const Route = createFileRoute("/lender/audit")({
  component: Audit,
});

function Audit() {
  const [type, setType] = useState<typeof TYPES[number]>("all");
  const [q, setQ] = useState("");
  const rows = auditEvents
    .filter((e) => type === "all" || e.type === type)
    .filter((e) => !q || [e.tokenId, e.actor, e.description].some((s) => s.toLowerCase().includes(q.toLowerCase())));

  return (
    <LenderShell title="Audit Log" subtitle="Every deposit, lock, transfer, and exit — with blockchain proof.">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[260px]">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by token, actor, or text" className="h-11 w-full rounded-lg border border-earth-mid/40 bg-card pl-10 pr-3 text-sm" />
          <MagnifyingGlass className="absolute left-3 top-3 size-5 text-earth-mid" />
        </div>
        <div className="flex gap-1 rounded-lg bg-card p-1">
          {TYPES.map((t) => (
            <button key={t} onClick={() => setType(t)} className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${type === t ? "bg-forest-dark text-primary-foreground" : "text-earth-deep"}`}>{t}</button>
          ))}
        </div>
      </div>

      <ol className="overflow-hidden rounded-2xl bg-card">
        {rows.map((e, i) => (
          <li key={e.id} className={`flex gap-4 px-6 py-4 ${i > 0 ? "border-t border-border/60" : ""}`}>
            <div className="mt-0.5 flex size-10 items-center justify-center rounded-full bg-grain-pale text-forest-dark">
              {e.type === "deposit" && <Package weight="duotone" className="size-5" />}
              {e.type === "lock" && <LockSimple weight="duotone" className="size-5" />}
              {e.type === "transfer" && <ArrowsLeftRight weight="duotone" className="size-5" />}
              {e.type === "exit" && <ArrowRight weight="duotone" className="size-5" />}
              {e.type === "unlock" && <CheckCircle weight="duotone" className="size-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm text-earth-deep">{e.description}</p>
              <p className="mt-1 text-xs text-earth-mid">{e.date} · {e.actor}</p>
            </div>
            <div className="text-right text-xs">
              <p className="font-mono text-earth-deep">{e.tokenId}</p>
              <p className="font-mono text-earth-mid">{e.txHash}</p>
            </div>
          </li>
        ))}
      </ol>
    </LenderShell>
  );
}
