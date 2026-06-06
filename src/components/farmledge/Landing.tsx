import { Link } from "@tanstack/react-router";
import { ShieldCheck, Plant, Bank, ArrowRight } from "@phosphor-icons/react";

export function Landing() {
  return (
    <div className="grain-bg hero-warmth min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <header className="flex items-center gap-2">
          <ShieldCheck weight="fill" className="size-7 text-forest-dark" />
          <span className="font-display text-2xl font-semibold text-earth-deep">Farmledge</span>
        </header>

        <section className="mt-16 md:mt-24 max-w-3xl">
          <p className="label-tracked">Inventory finance, grounded in proof</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl font-semibold leading-[1.05] text-earth-deep">
            Every harvest accounted for. Every record, unshakable.
          </h1>
          <p className="mt-6 text-lg text-earth-mid leading-relaxed max-w-2xl">
            Farmledge turns certified warehouse deposits into verifiable digital records — so farmers
            keep proof of their stored goods, custodians keep an honest ledger, and lenders can trust
            the collateral in front of them.
          </p>
        </section>

        <section className="mt-16 md:mt-20 grid gap-5 md:grid-cols-3">
          <RoleCard
            to="/farmer"
            tag="For farmers"
            title="My Stored Goods"
            blurb="See what you have in storage, share proof, and release your goods when you’re ready."
            Icon={Plant}
          />
          <RoleCard
            to="/custodian"
            tag="For warehouse staff"
            title="Custodian Dashboard"
            blurb="Record deposits, manage inventory, and issue verified receipts — even offline."
            Icon={ShieldCheck}
          />
          <RoleCard
            to="/lender"
            tag="For lenders"
            title="Lender Portal"
            blurb="Verify a farmer’s collateral instantly. Lock and release as loans move."
            Icon={Bank}
          />
        </section>

        <footer className="mt-24 flex flex-wrap items-center gap-3 text-sm text-earth-mid">
          <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-forest-mid" /> Stellar-secured ledger</span>
          <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-forest-mid" /> NAQS-certified warehouses</span>
          <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-forest-mid" /> Kano · Kaduna · Nasarawa</span>
        </footer>
      </div>
    </div>
  );
}

function RoleCard({
  to,
  tag,
  title,
  blurb,
  Icon,
}: {
  to: string;
  tag: string;
  title: string;
  blurb: string;
  Icon: React.ComponentType<{ className?: string; weight?: "regular" | "fill" | "duotone" }>;
}) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_2px_10px_rgba(59,42,26,0.06)] transition hover:shadow-[0_6px_22px_rgba(59,42,26,0.10)] hover:-translate-y-0.5"
    >
      <div className="flex size-11 items-center justify-center rounded-xl bg-forest-light/50 text-forest-dark">
        <Icon weight="duotone" className="size-6" />
      </div>
      <p className="label-tracked mt-5">{tag}</p>
      <h3 className="mt-1 font-display text-2xl font-semibold text-earth-deep">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-earth-mid">{blurb}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-forest-dark">
        Enter <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
