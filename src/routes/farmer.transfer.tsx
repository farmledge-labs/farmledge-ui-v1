import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FarmerScreen } from "@/components/farmledge/FarmerScreen";
import { tokens, formatKg, formatNgn } from "@/lib/farmledge-data";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react";

export const Route = createFileRoute("/farmer/transfer")({
  component: Transfer,
});

type Step = 1 | 2 | 3 | 4;

function Transfer() {
  const [step, setStep] = useState<Step>(1);
  const [recipient, setRecipient] = useState("0805 119 7720");
  const [tokenId, setTokenId] = useState(tokens.find((t) => t.status === "active")?.id ?? tokens[0].id);
  const [pin, setPin] = useState("");
  const token = tokens.find((t) => t.id === tokenId)!;

  return (
    <FarmerScreen title="Transfer">
      <Stepper step={step} />

      {step === 1 && (
        <section className="mt-6 space-y-5">
          <h2 className="font-display text-xl font-semibold text-earth-deep">Who is receiving?</h2>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-earth-deep">Buyer phone number</span>
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              inputMode="tel"
              className="h-12 rounded-lg border border-earth-mid/60 bg-grain-warm px-4 text-base"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-earth-deep">Choose a record</span>
            <select
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              className="h-12 rounded-lg border border-earth-mid/60 bg-grain-warm px-4 text-base"
            >
              {tokens
                .filter((t) => t.status === "active")
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.commodity} · {formatKg(t.weightKg)} · {t.id}
                  </option>
                ))}
            </select>
          </label>

          <button
            onClick={() => setStep(2)}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-forest-dark text-base font-semibold text-primary-foreground"
          >
            Continue
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="mt-6 space-y-5">
          <h2 className="font-display text-xl font-semibold text-earth-deep">Please confirm</h2>
          <div className="rounded-2xl bg-card p-5">
            <Row label="Goods" value={`${token.commodity} (${token.grade})`} />
            <Row label="Weight" value={formatKg(token.weightKg)} />
            <Row label="Value" value={formatNgn(token.valueNgn)} />
            <Row label="From" value="You" />
            <Row label="To" value={recipient} highlight />
          </div>
          <p className="text-xs text-earth-mid">
            Once you confirm, this record will belong to the buyer. You can’t reverse this without their help.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="h-12 flex-1 rounded-lg border border-earth-mid/40 text-sm font-medium text-earth-deep">
              Back
            </button>
            <button onClick={() => setStep(3)} className="h-12 flex-1 rounded-lg bg-forest-dark text-sm font-semibold text-primary-foreground">
              Confirm
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="mt-6 space-y-5">
          <h2 className="font-display text-xl font-semibold text-earth-deep">Enter your PIN</h2>
          <p className="text-sm text-earth-mid">Your PIN proves it’s really you.</p>
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={pin[i] ?? ""}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  setPin((p) => (p.slice(0, i) + v + p.slice(i + 1)).slice(0, 4));
                }}
                className="h-14 flex-1 rounded-lg border border-earth-mid/60 bg-grain-warm text-center text-2xl font-semibold text-earth-deep"
              />
            ))}
          </div>
          <button
            disabled={pin.length < 4}
            onClick={() => setStep(4)}
            className="h-12 w-full rounded-lg bg-forest-dark text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            Send transfer
          </button>
        </section>
      )}

      {step === 4 && (
        <section className="mt-10 flex flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-forest-light/60">
            <CheckCircle weight="fill" className="size-12 text-forest-dark" />
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold text-earth-deep">Transfer complete</h2>
          <p className="mt-2 max-w-xs text-sm text-earth-mid">
            Your {token.commodity.toLowerCase()} record now belongs to {recipient}. We’ve saved a copy in your activity.
          </p>
          <button
            onClick={() => {
              setStep(1);
              setPin("");
            }}
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-forest-dark"
          >
            Make another transfer <ArrowRight className="size-4" />
          </button>
        </section>
      )}
    </FarmerScreen>
  );
}

function Stepper({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3].map((n) => (
        <div key={n} className={`h-1.5 flex-1 rounded-full ${step >= n ? "bg-forest-mid" : "bg-grain-warm"}`} />
      ))}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between border-b border-border/60 py-2.5 last:border-b-0">
      <span className="text-sm text-earth-mid">{label}</span>
      <span className={`text-sm font-medium ${highlight ? "text-forest-dark" : "text-earth-deep"}`}>{value}</span>
    </div>
  );
}
