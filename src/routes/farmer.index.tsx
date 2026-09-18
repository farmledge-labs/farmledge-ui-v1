import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ArrowRight, Package, LockSimple, ArrowsLeftRight, CheckCircle, UserCircle, User, ListBullets, FileText } from "@phosphor-icons/react";
import { FarmerScreen } from "@/components/farmledge/FarmerScreen";
import { activity, farmer, formatKg, formatNgn, tokens } from "@/lib/farmledge-data";

export const Route = createFileRoute("/farmer/")({
  head: () => ({
    meta: [
      { title: "Home — Farmledge" },
      { name: "description", content: "Your stored goods, safely recorded." },
      { property: "og:title", content: "Home — Farmledge" },
      { property: "og:description", content: "Your stored goods, safely recorded." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FarmerHome,
});

function FarmerHome() {
  const active = tokens.filter((t) => t.status === "active" || t.status === "locked");
  const totalValue = active.reduce((sum, t) => sum + t.valueNgn, 0);
  const totalKg = active.reduce((sum, t) => sum + t.weightKg, 0);

  return (
    <div className="farmer-home">
    <FarmerScreen>
      <div className="farmer-home-header">
        <Link to="/farmer/profile" className="farmer-home-person" aria-label="Your profile">
          <UserCircle weight="fill" className="size-10 shrink-0" />
          <h1 className="font-display text-base font-bold leading-tight">{farmer.name.split(" ").map((name, i) => <span className="block" key={i}>{name}</span>)}</h1>
        </Link>
        <Link to="/farmer/notifications" aria-label="Notifications" className="relative p-2">
          <Bell weight="fill" className="size-7" />
          <span className="absolute right-2 top-1 size-2 rounded-full bg-alert-red" />
        </Link>
      </div>

      <section className="farmer-home-balance" aria-label="Stored value">
        <p className="farmer-home-total">{formatNgn(totalValue)}</p>
        <p className="text-[11px] text-primary-foreground/65">All your goods are recorded and safe.</p>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-3 border-t border-primary-foreground/70 pt-3">
          <div><p className="text-[10px] uppercase">Active records</p><p className="text-lg font-bold leading-tight">{active.length}</p></div>
          <div><p className="text-[10px] uppercase">Total weight</p><p className="text-lg font-bold leading-tight">{formatKg(totalKg)}</p></div>
        </div>
      </section>

      <nav aria-label="Quick actions" className="farmer-home-actions">
        {[
          { to: "/farmer/transfer", label: "Transfer", Icon: ArrowsLeftRight },
          { to: "/farmer/records", label: "Records", Icon: ListBullets },
          { to: "/farmer/profile", label: "Profile", Icon: User },
          { to: "/farmer/transfer", label: "Transfer", Icon: ArrowsLeftRight },
          { to: "/farmer/records", label: "Records", Icon: ListBullets },
          { to: "/farmer/certificates", label: "Certificates", Icon: FileText },
        ].map(({ to, label, Icon }, index) => (
          <Link key={index} to={to} className="farmer-home-action">
            <Icon className="size-10" strokeWidth={1.5} />
            <span className="text-[10px] uppercase">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Latest deposit */}
      <section className="mt-6 farmer-home-section">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase text-earth-deep">Most recent deposit</h2>
          <Link to="/farmer/records" className="text-sm font-medium text-forest-dark">View all</Link>
        </div>
        <Link
          to="/farmer/records/$id"
          params={{ id: tokens[0].id }}
          className="farmer-home-deposit mt-4 block p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-earth-mid">{tokens[0].depositDate}</p>
              <p className="mt-0.5 text-xl font-bold text-earth-deep">{tokens[0].commodity}</p>
              <p className="text-sm text-earth-mid">{formatKg(tokens[0].weightKg)} · {tokens[0].grade}</p>
              <p className="mt-2 text-xs text-earth-mid">{tokens[0].warehouse}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-earth-deep">{formatNgn(tokens[0].valueNgn)}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-forest-light/60 px-2 py-0.5 text-[11px] font-medium text-forest-dark">
                <CheckCircle weight="fill" className="size-3" /> Safe
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Recent activity */}
      <section className="mt-6 farmer-home-section">
        <h2 className="text-sm font-bold text-earth-deep">Recent activity</h2>
        <ul className="mt-3 space-y-2">
          {activity.slice(0, 2).map((e) => (
            <li key={e.id} className="farmer-home-activity flex items-center gap-2 p-4">
              <div className="mt-0.5 flex size-9 items-center justify-center rounded-full bg-forest-dark text-primary-foreground">
                {e.type === "deposit" && <Package weight="duotone" className="size-5" />}
                {e.type === "lock" && <LockSimple weight="duotone" className="size-5" />}
                {e.type === "transfer" && <ArrowsLeftRight weight="duotone" className="size-5" />}
                {e.type === "exit" && <ArrowRight weight="duotone" className="size-5" />}
                {e.type === "unlock" && <CheckCircle weight="duotone" className="size-5" />}
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-earth-deep">{e.description}</p>
                <p className="mt-0.5 text-xs text-earth-mid">{e.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </FarmerScreen>
    </div>
  );
}
