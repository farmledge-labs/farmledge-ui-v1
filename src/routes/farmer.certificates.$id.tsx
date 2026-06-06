import { createFileRoute, notFound } from "@tanstack/react-router";
import { FarmerScreen } from "@/components/farmledge/FarmerScreen";
import { tokens, formatKg, formatNgn, farmer } from "@/lib/farmledge-data";
import { ShieldCheck, Download } from "@phosphor-icons/react";

export const Route = createFileRoute("/farmer/certificates/$id")({
  loader: ({ params }) => {
    const token = tokens.find((t) => t.id === params.id);
    if (!token) throw notFound();
    return { token };
  },
  component: CertificateView,
});

function CertificateView() {
  const { token } = Route.useLoaderData();
  return (
    <FarmerScreen title="Certificate" backTo="/farmer/certificates">
      <article className="overflow-hidden rounded-2xl border border-earth-light/60 bg-grain-pale">
        <div className="bg-forest-dark px-5 py-4 text-primary-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck weight="fill" className="size-5" />
            <span className="text-xs font-medium uppercase tracking-[0.16em]">Farmledge warehouse receipt</span>
          </div>
        </div>
        <div className="px-5 py-6">
          <p className="label-tracked">Certificate no.</p>
          <p className="font-mono text-sm text-earth-deep">{token.id}</p>

          <h2 className="mt-5 font-display text-3xl font-semibold text-earth-deep">{token.commodity}</h2>
          <p className="text-sm text-earth-mid">{token.grade}</p>

          <dl className="mt-5 grid grid-cols-2 gap-y-3 text-sm">
            <Cell label="Depositor" value={farmer.name} />
            <Cell label="Weight" value={formatKg(token.weightKg)} />
            <Cell label="Warehouse" value={token.warehouse} />
            <Cell label="Stored value" value={formatNgn(token.valueNgn)} />
            <Cell label="Deposit date" value={token.depositDate} />
            <Cell label="Custodian" value={token.custodianName} />
          </dl>

          <div className="mt-6 border-t border-dashed border-earth-mid/40 pt-4">
            <p className="text-xs text-earth-mid">
              This document certifies that the goods listed above are held in storage and recorded on the Farmledge ledger.
            </p>
            <p className="mt-2 font-mono text-[11px] text-earth-mid">Verification: {token.txHash}</p>
          </div>
        </div>
      </article>

      <button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-forest-dark text-sm font-semibold text-primary-foreground">
        <Download className="size-4" /> Download PDF
      </button>
    </FarmerScreen>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-earth-mid">{label}</dt>
      <dd className="text-earth-deep">{value}</dd>
    </div>
  );
}
