import { createFileRoute } from "@tanstack/react-router";
import { CustodianShell } from "@/components/farmledge/CustodianShell";
import { useState } from "react";
import { inventoryRows, formatKg, formatNgn } from "@/lib/farmledge-data";
import { WarningCircle, CheckCircle, MagnifyingGlass } from "@phosphor-icons/react";

export const Route = createFileRoute("/custodian/exit")({
  component: Exit,
});

function Exit() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [step, setStep] = useState<"search" | "confirm" | "done">("search");
  const matches = inventoryRows.filter((r) => r.status === "active" || r.status === "locked")
    .filter((r) => q && [r.id, r.farmerName].some((s) => s.toLowerCase().includes(q.toLowerCase())));
  const token = inventoryRows.find((r) => r.id === selected);

  if (step === "done" && token) {
    return (
      <CustodianShell title="Exit complete">
        <div className="mx-auto max-w-xl rounded-2xl border-l-4 border-forest-mid bg-card p-8 text-center">
          <CheckCircle weight="fill" className="mx-auto size-12 text-forest-dark" />
          <h2 className="mt-4 font-display text-2xl font-semibold text-earth-deep">Goods released</h2>
          <p className="mt-1 text-sm text-earth-mid">
            Token {token.id} has been burned and a delivery receipt generated.
          </p>
          <div className="mt-5 rounded-xl bg-grain-pale p-4 text-left text-sm">
            <Row label="Delivery note" value={deliveryNote || "DN-2249"} />
            <Row label="Released to" value={token.farmerName} />
            <Row label="Weight" value={formatKg(token.weightKg)} />
          </div>
          <button onClick={() => { setStep("search"); setSelected(null); setQ(""); }} className="mt-6 h-11 w-full rounded-lg bg-forest-dark text-sm font-semibold text-primary-foreground">Process another exit</button>
        </div>
      </CustodianShell>
    );
  }

  return (
    <CustodianShell title="Exit goods">
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="rounded-2xl bg-card p-5">
          <h2 className="font-display text-lg font-semibold text-earth-deep">Find token</h2>
          <div className="relative mt-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Token ID or farmer name"
              className="h-12 w-full rounded-lg border border-earth-mid/40 bg-grain-pale pl-10 pr-3 text-sm"
            />
            <MagnifyingGlass className="absolute left-3 top-3.5 size-5 text-earth-mid" />
          </div>
          {q && (
            <ul className="mt-3 divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60">
              {matches.length === 0 && <li className="p-3 text-sm text-earth-mid">No matches.</li>}
              {matches.map((m) => (
                <li key={m.id}>
                  <button onClick={() => { setSelected(m.id); setStep("confirm"); }} className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-grain-pale ${selected === m.id ? "bg-grain-pale" : ""}`}>
                    <span><span className="font-mono text-xs text-earth-deep">{m.id}</span> · {m.farmerName} · {m.commodity}</span>
                    <span className="text-earth-mid">{formatKg(m.weightKg)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {step === "confirm" && token && (
          <div className="rounded-2xl border-l-4 border-alert-red bg-card p-5">
            <div className="flex items-center gap-2 text-alert-red">
              <WarningCircle weight="fill" className="size-5" />
              <h2 className="font-display text-lg font-semibold">Confirm physical exit</h2>
            </div>
            <p className="mt-2 text-sm text-earth-mid">
              This action burns the token and cannot be undone. Make sure goods have physically left the warehouse.
            </p>
            <div className="mt-4 rounded-xl bg-grain-pale p-4 text-sm">
              <Row label="Token" value={token.id} />
              <Row label="Farmer" value={token.farmerName} />
              <Row label="Goods" value={`${token.commodity} (${token.grade})`} />
              <Row label="Weight" value={formatKg(token.weightKg)} />
              <Row label="Value" value={formatNgn(token.valueNgn)} />
            </div>
            <label className="mt-4 flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-earth-mid">Delivery note number</span>
              <input value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} placeholder="DN-2249" className="h-12 rounded-lg border border-earth-mid/40 bg-grain-pale px-3 text-sm" />
            </label>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setStep("search")} className="h-11 flex-1 rounded-lg border border-earth-mid/40 text-sm font-medium text-earth-deep">Cancel</button>
              <button onClick={() => setStep("done")} className="h-11 flex-1 rounded-lg bg-alert-red text-sm font-semibold text-destructive-foreground">Sign exit & burn</button>
            </div>
          </div>
        )}
      </div>
    </CustodianShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border/40 py-2 last:border-b-0">
      <span className="text-earth-mid">{label}</span>
      <span className="font-medium text-earth-deep">{value}</span>
    </div>
  );
}
