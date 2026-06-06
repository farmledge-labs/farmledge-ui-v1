import { createFileRoute } from "@tanstack/react-router";
import { LenderShell } from "@/components/farmledge/LenderShell";
import { inventoryRows, formatKg, formatNgn } from "@/lib/farmledge-data";
import { useState } from "react";
import { LockSimple, LockSimpleOpen, CheckCircle } from "@phosphor-icons/react";

export const Route = createFileRoute("/lender/locks")({
  component: Locks,
});

function Locks() {
  const [tab, setTab] = useState<"initiate" | "active">("active");
  const [tokenId, setTokenId] = useState(inventoryRows.find((t) => t.status === "active")!.id);
  const [amount, setAmount] = useState("500000");
  const [ref, setRef] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const token = inventoryRows.find((t) => t.id === tokenId)!;
  const locked = inventoryRows.filter((t) => t.status === "locked");

  return (
    <LenderShell title="Lock Management" subtitle="Lock tokens as collateral. Release on repayment.">
      <div className="mb-5 inline-flex gap-1 rounded-lg bg-card p-1">
        <button onClick={() => setTab("active")} className={`rounded-md px-4 py-2 text-sm font-medium ${tab === "active" ? "bg-forest-dark text-primary-foreground" : "text-earth-deep"}`}>Active locks ({locked.length})</button>
        <button onClick={() => setTab("initiate")} className={`rounded-md px-4 py-2 text-sm font-medium ${tab === "initiate" ? "bg-forest-dark text-primary-foreground" : "text-earth-deep"}`}>Initiate lock</button>
      </div>

      {tab === "active" ? (
        <div className="overflow-hidden rounded-2xl bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-grain-pale text-[11px] uppercase tracking-wider text-earth-mid">
              <tr><th className="px-6 py-3 font-medium">Token</th><th className="font-medium">Farmer</th><th className="font-medium">Loan ref</th><th className="text-right font-medium">Loan amount</th><th className="text-right font-medium">Collateral value</th><th className="px-6 font-medium">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {locked.map((l) => (
                <tr key={l.id}>
                  <td className="px-6 py-3 font-mono text-xs">{l.id}</td>
                  <td>{l.farmerName}</td>
                  <td className="font-medium text-earth-deep">{l.loanRef}</td>
                  <td className="text-right">{formatNgn(l.loanAmount ?? 0)}</td>
                  <td className="text-right">{formatNgn(l.valueNgn)}</td>
                  <td className="px-6">
                    <button className="inline-flex items-center gap-1.5 rounded-lg border border-earth-mid/40 px-3 py-1.5 text-xs font-medium text-earth-deep hover:bg-grain-pale">
                      <LockSimpleOpen className="size-4" /> Release
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : confirmed ? (
        <div className="mx-auto max-w-xl rounded-2xl border-l-4 border-forest-mid bg-card p-8 text-center">
          <CheckCircle weight="fill" className="mx-auto size-12 text-forest-dark" />
          <h2 className="mt-4 font-display text-2xl font-semibold text-earth-deep">Token locked</h2>
          <p className="mt-1 text-sm text-earth-mid">Loan {ref || "LN-7742"} is now backed by {token.id}.</p>
          <button onClick={() => { setConfirmed(false); setTab("active"); }} className="mt-6 h-11 w-full rounded-lg bg-forest-dark text-sm font-semibold text-primary-foreground">View active locks</button>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl rounded-2xl bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-earth-deep">Initiate lock</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Token to lock">
              <select value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="h-11 w-full rounded-lg border border-earth-mid/40 bg-grain-pale px-3 text-sm">
                {inventoryRows.filter((t) => t.status === "active").map((t) => (
                  <option key={t.id} value={t.id}>{t.id} · {t.farmerName} · {formatKg(t.weightKg)}</option>
                ))}
              </select>
            </Field>
            <Field label="Loan reference">
              <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="LN-7742" className="h-11 w-full rounded-lg border border-earth-mid/40 bg-grain-pale px-3 text-sm" />
            </Field>
            <Field label="Loan amount (₦)">
              <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="numeric" className="h-11 w-full rounded-lg border border-earth-mid/40 bg-grain-pale px-3 text-sm" />
            </Field>
            <Field label="Collateral value">
              <div className="h-11 rounded-lg bg-grain-warm/60 px-3 py-2.5 text-sm text-earth-deep">{formatNgn(token.valueNgn)}</div>
            </Field>
          </div>
          <div className="mt-5 rounded-lg bg-grain-pale p-4 text-sm">
            <div className="flex justify-between"><span className="text-earth-mid">LTV at this loan amount</span><span className="font-medium text-earth-deep">{Math.round((Number(amount) / token.valueNgn) * 100)}%</span></div>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <button onClick={() => setTab("active")} className="h-11 rounded-lg border border-earth-mid/40 px-5 text-sm font-medium text-earth-deep">Cancel</button>
            <button onClick={() => setConfirmed(true)} className="inline-flex h-11 items-center gap-2 rounded-lg bg-forest-dark px-5 text-sm font-semibold text-primary-foreground">
              <LockSimple className="size-4" /> Confirm lock
            </button>
          </div>
        </div>
      )}
    </LenderShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-wider text-earth-mid">{label}</span>
      {children}
    </label>
  );
}
