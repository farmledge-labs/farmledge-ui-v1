import { createFileRoute } from "@tanstack/react-router";
import { CustodianShell } from "@/components/farmledge/CustodianShell";
import { pendingSyncQueue, formatKg } from "@/lib/farmledge-data";
import { CloudArrowUp, ArrowsClockwise, WarningCircle } from "@phosphor-icons/react";

export const Route = createFileRoute("/custodian/sync")({
  component: Sync,
});

function Sync() {
  return (
    <CustodianShell title="Pending sync">
      <div className="rounded-2xl border-l-4 border-alert-amber bg-card p-5">
        <div className="flex items-center gap-2">
          <WarningCircle weight="duotone" className="size-5 text-alert-amber" />
          <p className="text-sm text-earth-deep">
            {pendingSyncQueue.length} deposits saved offline. They will sync automatically when connectivity is stable.
          </p>
        </div>
      </div>

      <ul className="mt-5 divide-y divide-border/60 overflow-hidden rounded-2xl bg-card">
        {pendingSyncQueue.map((p) => (
          <li key={p.tempId} className="flex items-center gap-4 px-5 py-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-grain-pale text-alert-amber">
              <CloudArrowUp weight="duotone" className="size-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-earth-deep">{p.farmer} · {p.commodity}</p>
              <p className="text-xs text-earth-mid">{formatKg(p.weightKg)} · saved {p.savedAt} · {p.tempId}</p>
            </div>
            <button className="flex h-10 items-center gap-2 rounded-lg border border-earth-mid/40 px-3 text-xs font-medium text-earth-deep">
              <ArrowsClockwise className="size-4" /> Retry
            </button>
          </li>
        ))}
      </ul>
    </CustodianShell>
  );
}
