import { createFileRoute } from "@tanstack/react-router";
import { FarmerScreen } from "@/components/farmledge/FarmerScreen";
import { activity } from "@/lib/farmledge-data";
import { Package, LockSimple, ArrowsLeftRight, ArrowRight, CheckCircle } from "@phosphor-icons/react";

export const Route = createFileRoute("/farmer/notifications")({
  component: Notifications,
});

function Notifications() {
  return (
    <FarmerScreen title="Notifications" backTo="/farmer">
      <ul className="space-y-3">
        {activity.map((e) => (
          <li key={e.id} className="flex gap-3 rounded-2xl bg-card p-4 shadow-[0_2px_8px_rgba(59,42,26,0.06)]">
            <div className="mt-0.5 flex size-10 items-center justify-center rounded-full bg-grain-pale text-forest-dark">
              {e.type === "deposit" && <Package weight="duotone" className="size-5" />}
              {e.type === "lock" && <LockSimple weight="duotone" className="size-5" />}
              {e.type === "transfer" && <ArrowsLeftRight weight="duotone" className="size-5" />}
              {e.type === "exit" && <ArrowRight weight="duotone" className="size-5" />}
              {e.type === "unlock" && <CheckCircle weight="duotone" className="size-5" />}
            </div>
            <div>
              <p className="text-sm text-earth-deep">{e.description}</p>
              <p className="mt-1 text-xs text-earth-mid">{e.date} · {e.actor}</p>
            </div>
          </li>
        ))}
      </ul>
    </FarmerScreen>
  );
}
