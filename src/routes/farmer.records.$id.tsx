import { createFileRoute, notFound } from "@tanstack/react-router";
import { FarmerScreen } from "@/components/farmledge/FarmerScreen";
import { tokens, formatKg, formatNgn } from "@/lib/farmledge-data";
import { ShieldCheck, Warehouse, CalendarBlank, Scales, CurrencyNgn, Download, QrCode, ArrowsLeftRight } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/farmer/records/$id")({
  loader: ({ params }) => {
    const token = tokens.find((t) => t.id === params.id);
    if (!token) throw notFound();
    return { token };
  },
  component: TokenDetail,
  notFoundComponent: () => (
    <FarmerScreen title="Not found" backTo="/farmer/records">
      <p className="text-sm text-earth-mid">This record could not be found.</p>
    </FarmerScreen>
  ),
});

function TokenDetail() {
  const { token } = Route.useLoaderData();

  return (
    <FarmerScreen title="Record details" backTo="/farmer/records">
      <div className="rounded-2xl bg-card p-5 shadow-[0_2px_8px_rgba(59,42,26,0.06)]">
        <p className="label-tracked">Record number</p>
        <p className="mt-1 font-mono text-sm text-earth-deep">{token.id}</p>
        <h2 className="mt-4 font-display text-3xl font-semibold text-earth-deep">{token.commodity}</h2>
        <p className="text-sm text-earth-mid">{token.grade}</p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest-light/60 px-3 py-1 text-sm font-medium text-forest-dark">
          <ShieldCheck weight="fill" className="size-4" /> Verified & safe in storage
        </div>

        <dl className="mt-6 divide-y divide-border/70">
          <Row Icon={Scales} label="Weight" value={formatKg(token.weightKg)} />
          <Row Icon={CurrencyNgn} label="Stored value" value={formatNgn(token.valueNgn)} />
          <Row Icon={Warehouse} label="Warehouse" value={`${token.warehouse}, ${token.warehouseCity}`} />
          <Row Icon={CalendarBlank} label="Deposit date" value={token.depositDate} />
        </dl>
      </div>

      <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-earth-mid/40 bg-grain-warm/60 p-5 text-center">
        <div className="flex size-32 items-center justify-center rounded-lg bg-grain-pale">
          <QrCode weight="duotone" className="size-24 text-earth-deep" />
        </div>
        <p className="mt-3 text-xs font-medium uppercase tracking-wider text-earth-mid">Blockchain verification</p>
        <p className="font-mono text-xs text-earth-mid">{token.txHash}</p>
        <p className="mt-2 max-w-xs text-xs text-earth-mid">
          Scan to verify this record on the public ledger. Anyone can confirm it’s real.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          to="/farmer/certificates/$id"
          params={{ id: token.id }}
          className="flex h-12 items-center justify-center gap-2 rounded-lg border border-earth-mid/40 bg-grain-warm text-sm font-medium text-earth-deep"
        >
          <Download className="size-4" /> Certificate
        </Link>
        <Link
          to="/farmer/transfer"
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-forest-dark text-sm font-semibold text-primary-foreground"
        >
          <ArrowsLeftRight className="size-4" /> Transfer
        </Link>
      </div>
    </FarmerScreen>
  );
}

function Row({ Icon, label, value }: { Icon: typeof ShieldCheck; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <Icon weight="duotone" className="size-5 text-earth-mid" />
      <span className="text-sm text-earth-mid">{label}</span>
      <span className="ml-auto text-right text-sm font-medium text-earth-deep">{value}</span>
    </div>
  );
}
