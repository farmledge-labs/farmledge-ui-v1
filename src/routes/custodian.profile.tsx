import { createFileRoute } from "@tanstack/react-router";
import { CustodianShell } from "@/components/farmledge/CustodianShell";
import { custodian } from "@/lib/farmledge-data";
import { ShieldCheck, Warehouse, Wallet, Certificate } from "@phosphor-icons/react";

export const Route = createFileRoute("/custodian/profile")({
  component: Profile,
});

function Profile() {
  return (
    <CustodianShell title="Profile">
      <div className="mx-auto max-w-2xl space-y-5">
        <section className="rounded-2xl bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-forest-light/60 text-forest-dark">
              <ShieldCheck weight="fill" className="size-7" />
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-earth-deep">{custodian.name}</p>
              <p className="text-sm text-earth-mid">Warehouse custodian</p>
            </div>
          </div>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <Item Icon={Warehouse} label="Warehouse" value={`${custodian.warehouse}, ${custodian.city}`} />
            <Item Icon={Certificate} label="Certification" value={custodian.certification} />
            <Item Icon={Wallet} label="Signing wallet" value={custodian.walletAddress} mono />
          </dl>
        </section>

        <section className="rounded-2xl border-l-4 border-forest-mid bg-card p-5">
          <p className="font-medium text-earth-deep">Hardware wallet status</p>
          <p className="mt-1 text-sm text-earth-mid">Connected — last verified 18 minutes ago.</p>
        </section>
      </div>
    </CustodianShell>
  );
}

function Item({ Icon, label, value, mono }: { Icon: typeof ShieldCheck; label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-xl bg-grain-pale p-4">
      <div className="flex items-center gap-2 text-earth-mid">
        <Icon className="size-4" />
        <span className="text-[11px] uppercase tracking-wider">{label}</span>
      </div>
      <p className={`mt-1 text-sm text-earth-deep ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}
