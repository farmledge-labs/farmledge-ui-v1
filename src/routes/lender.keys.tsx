import { createFileRoute } from "@tanstack/react-router";
import { LenderShell } from "@/components/farmledge/LenderShell";
import { apiKeys } from "@/lib/farmledge-data";
import { Key, Trash, Plus } from "@phosphor-icons/react";

export const Route = createFileRoute("/lender/keys")({
  component: Keys,
});

function Keys() {
  return (
    <LenderShell
      title="API & Keys"
      subtitle="Manage credentials used by your loan engine and reporting systems."
      actions={
        <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-forest-dark px-4 text-sm font-semibold text-primary-foreground">
          <Plus className="size-4" /> Generate key
        </button>
      }
    >
      <div className="overflow-hidden rounded-2xl bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-grain-pale text-[11px] uppercase tracking-wider text-earth-mid">
            <tr><th className="px-6 py-3 font-medium">Label</th><th className="font-medium">Key</th><th className="font-medium">Created</th><th className="font-medium">Last used</th><th className="px-6 font-medium">Action</th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {apiKeys.map((k) => (
              <tr key={k.id}>
                <td className="px-6 py-3 text-earth-deep">
                  <div className="flex items-center gap-2"><Key weight="duotone" className="size-4 text-earth-mid" />{k.label}</div>
                </td>
                <td className="font-mono text-xs">{k.id}••••••••</td>
                <td className="text-earth-mid">{k.created}</td>
                <td className="text-earth-mid">{k.lastUsed}</td>
                <td className="px-6">
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-alert-red/40 px-3 py-1.5 text-xs font-medium text-alert-red"><Trash className="size-4" /> Revoke</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-6 rounded-2xl bg-card p-6">
        <h3 className="font-display text-lg font-semibold text-earth-deep">Recent API calls</h3>
        <ul className="mt-4 space-y-2 font-mono text-xs">
          {[
            { t: "09:11", m: "GET", p: "/v1/farmers/+2348035550142/collateral", c: 200 },
            { t: "09:07", m: "POST", p: "/v1/tokens/KN-2026-000038/lock", c: 200 },
            { t: "08:55", m: "GET", p: "/v1/tokens/KN-2026-000042", c: 200 },
            { t: "08:42", m: "GET", p: "/v1/audit?farmer=+2348072218830", c: 200 },
          ].map((r, i) => (
            <li key={i} className="flex gap-3 rounded-lg bg-grain-pale px-3 py-2">
              <span className="text-earth-mid">{r.t}</span>
              <span className="font-semibold text-forest-dark">{r.m}</span>
              <span className="flex-1 text-earth-deep">{r.p}</span>
              <span className="text-forest-mid">{r.c}</span>
            </li>
          ))}
        </ul>
      </section>
    </LenderShell>
  );
}
