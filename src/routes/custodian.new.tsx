import { createFileRoute } from "@tanstack/react-router";
import { CustodianShell } from "@/components/farmledge/CustodianShell";
import { useState } from "react";
import { CheckCircle, Camera, MagnifyingGlass, X } from "@phosphor-icons/react";

export const Route = createFileRoute("/custodian/new")({
  component: NewDeposit,
});

function NewDeposit() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [phone, setPhone] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [commodity, setCommodity] = useState("White Maize");
  const [grade, setGrade] = useState("Grade A");
  const [weight, setWeight] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  if (step === "success") {
    return (
      <CustodianShell title="Deposit recorded">
        <div className="mx-auto max-w-xl rounded-2xl border-l-4 border-forest-mid bg-card p-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-forest-light/60">
            <CheckCircle weight="fill" className="size-10 text-forest-dark" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-semibold text-earth-deep">Token issued</h2>
          <p className="mt-1 text-sm text-earth-mid">A new warehouse receipt has been recorded and sent to the farmer.</p>

          <div className="mt-6 rounded-xl bg-grain-pale p-5">
            <p className="label-tracked">Token ID</p>
            <p className="mt-1 font-mono text-lg text-earth-deep">KN-2026-000046</p>
            <p className="mt-3 text-xs text-earth-mid">Stellar tx · GA7K2P…9LX3M</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button onClick={() => setStep("form")} className="h-11 rounded-lg border border-earth-mid/40 text-sm font-medium text-earth-deep">Record another</button>
            <button className="h-11 rounded-lg bg-forest-dark text-sm font-semibold text-primary-foreground">Print receipt</button>
          </div>
        </div>
      </CustodianShell>
    );
  }

  return (
    <CustodianShell title="New deposit">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStep("success");
        }}
        className="mx-auto max-w-3xl space-y-6"
      >
        <Card title="Farmer">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Farmer phone">
              <div className="relative">
                <input
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (e.target.value.length >= 10) setFarmerName("Amina Yusuf");
                  }}
                  placeholder="0803 555 0142"
                  className="h-12 w-full rounded-lg border border-earth-mid/40 bg-grain-pale pl-10 pr-3 text-sm"
                />
                <MagnifyingGlass className="absolute left-3 top-3.5 size-5 text-earth-mid" />
              </div>
            </Field>
            <Field label="Farmer name (auto-filled)">
              <input value={farmerName} readOnly className="h-12 w-full rounded-lg border border-earth-mid/40 bg-grain-warm/60 px-3 text-sm text-earth-deep" />
            </Field>
          </div>
        </Card>

        <Card title="Commodity">
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Commodity">
              <select value={commodity} onChange={(e) => setCommodity(e.target.value)} className="h-12 w-full rounded-lg border border-earth-mid/40 bg-grain-pale px-3 text-sm">
                <option>White Maize</option><option>Yellow Maize</option><option>Sesame</option><option>Sorghum</option>
              </select>
            </Field>
            <Field label="Grade">
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className="h-12 w-full rounded-lg border border-earth-mid/40 bg-grain-pale px-3 text-sm">
                <option>Grade A</option><option>Grade B</option><option>Grade C</option>
              </select>
            </Field>
            <Field label="Weight (kg)">
              <input inputMode="numeric" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="0" className="h-12 w-full rounded-lg border border-earth-mid/40 bg-grain-pale px-3 text-sm" />
            </Field>
          </div>
        </Card>

        <Card title="Photos (up to 5)">
          <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
            {photos.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-grain-warm">
                <div className="flex h-full items-center justify-center text-xs text-earth-mid">Photo {i + 1}</div>
                <button type="button" onClick={() => setPhotos(photos.filter((_, j) => j !== i))} className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-earth-deep/80 text-white">
                  <X className="size-3" />
                </button>
              </div>
            ))}
            {photos.length < 5 && (
              <button
                type="button"
                onClick={() => setPhotos([...photos, "x"])}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-earth-mid/40 text-xs text-earth-mid"
              >
                <Camera className="size-6" /> Add
              </button>
            )}
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <button type="button" className="h-12 rounded-lg border border-earth-mid/40 px-5 text-sm font-medium text-earth-deep">Save to queue</button>
          <button type="submit" className="h-12 rounded-lg bg-forest-dark px-6 text-sm font-semibold text-primary-foreground">Submit deposit</button>
        </div>
      </form>
    </CustodianShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-card p-5">
      <h2 className="font-display text-base font-semibold text-earth-deep">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-earth-mid">{label}</span>
      {children}
    </label>
  );
}
