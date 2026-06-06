import { createFileRoute, Link } from "@tanstack/react-router";
import { FarmerScreen } from "@/components/farmledge/FarmerScreen";
import { tokens, formatKg, formatNgn } from "@/lib/farmledge-data";
import { Download, FileText } from "@phosphor-icons/react";

export const Route = createFileRoute("/farmer/certificates")({
  component: Certificates,
});

function Certificates() {
  return (
    <FarmerScreen title="Certificates">
      <p className="text-sm text-earth-mid">
        A certificate is your official proof of deposit. Download it any time to share with a buyer or lender.
      </p>
      <ul className="mt-5 space-y-3">
        {tokens.map((t) => (
          <li key={t.id}>
            <Link
              to="/farmer/certificates/$id"
              params={{ id: t.id }}
              className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-[0_2px_8px_rgba(59,42,26,0.06)]"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-grain-pale text-forest-dark">
                <FileText weight="duotone" className="size-6" />
              </div>
              <div className="flex-1">
                <p className="font-display text-base font-semibold text-earth-deep">{t.commodity}</p>
                <p className="text-xs text-earth-mid">
                  {t.depositDate} · {formatKg(t.weightKg)} · {formatNgn(t.valueNgn)}
                </p>
              </div>
              <Download className="size-5 text-earth-mid" />
            </Link>
          </li>
        ))}
      </ul>
    </FarmerScreen>
  );
}
