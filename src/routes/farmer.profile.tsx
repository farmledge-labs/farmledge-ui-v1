import { createFileRoute, Link } from "@tanstack/react-router";
import { FarmerScreen } from "@/components/farmledge/FarmerScreen";
import { farmer } from "@/lib/farmledge-data";
import { User, Phone, MapPin, Bell, ShieldCheck, SignOut, CaretRight } from "@phosphor-icons/react";

export const Route = createFileRoute("/farmer/profile")({
  component: Profile,
});

function Profile() {
  return (
    <FarmerScreen title="Profile">
      <div className="flex items-center gap-4 rounded-2xl bg-card p-5">
        <div className="flex size-14 items-center justify-center rounded-full bg-forest-light/60 text-forest-dark">
          <User weight="duotone" className="size-7" />
        </div>
        <div>
          <p className="font-display text-xl font-semibold text-earth-deep">{farmer.name}</p>
          <p className="text-sm text-earth-mid">Member since {farmer.joined}</p>
        </div>
      </div>

      <ul className="mt-5 divide-y divide-border/60 rounded-2xl bg-card">
        <Item Icon={Phone} label="Phone" value={farmer.phone} />
        <Item Icon={MapPin} label="Village" value={farmer.village} />
      </ul>

      <ul className="mt-5 divide-y divide-border/60 rounded-2xl bg-card">
        <Action Icon={ShieldCheck} label="Change PIN" />
        <Action Icon={Bell} label="Notification settings" />
      </ul>

      <Link
        to="/farmer/login"
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-alert-red/40 text-sm font-medium text-alert-red"
      >
        <SignOut className="size-4" /> Sign out
      </Link>
    </FarmerScreen>
  );
}

function Item({ Icon, label, value }: { Icon: typeof User; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <Icon weight="duotone" className="size-5 text-earth-mid" />
      <span className="text-sm text-earth-mid">{label}</span>
      <span className="ml-auto text-sm font-medium text-earth-deep">{value}</span>
    </li>
  );
}
function Action({ Icon, label }: { Icon: typeof User; label: string }) {
  return (
    <li>
      <button className="flex w-full items-center gap-3 px-4 py-3 text-left">
        <Icon weight="duotone" className="size-5 text-earth-mid" />
        <span className="text-sm font-medium text-earth-deep">{label}</span>
        <CaretRight className="ml-auto size-4 text-earth-mid" />
      </button>
    </li>
  );
}
