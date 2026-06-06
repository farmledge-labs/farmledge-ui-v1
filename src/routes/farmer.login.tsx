import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Plant } from "@phosphor-icons/react";
import { useState } from "react";

export const Route = createFileRoute("/farmer/login")({
  component: FarmerLogin,
});

function FarmerLogin() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  return (
    <div className="grain-bg hero-warmth mx-auto flex min-h-screen max-w-md flex-col px-6 py-10">
      <div className="flex items-center gap-2">
        <ShieldCheck weight="fill" className="size-6 text-forest-dark" />
        <span className="font-display text-xl font-semibold text-earth-deep">Farmledge</span>
      </div>

      <div className="mt-14 flex flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-forest-light/40">
          <Plant weight="duotone" className="size-8 text-forest-dark" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold text-earth-deep">Welcome back</h1>
        <p className="mt-2 text-sm text-earth-mid">Your goods are safe. Sign in to see them.</p>
      </div>

      <form
        className="mt-10 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-earth-deep">Phone number</span>
          <input
            type="tel"
            inputMode="tel"
            placeholder="0803 555 0142"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-12 rounded-lg border border-earth-mid/60 bg-grain-warm px-4 text-base text-earth-deep placeholder:text-earth-mid/60 focus:border-earth-light focus:outline-none focus:ring-4 focus:ring-earth-light/30"
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-earth-deep">4-digit PIN</span>
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
                  const next = (pin.slice(0, i) + v + pin.slice(i + 1)).slice(0, 4);
                  setPin(next);
                }}
                className="h-14 flex-1 rounded-lg border border-earth-mid/60 bg-grain-warm text-center text-2xl font-semibold text-earth-deep focus:border-earth-light focus:outline-none focus:ring-4 focus:ring-earth-light/30"
              />
            ))}
          </div>
        </div>

        <Link
          to="/farmer"
          className="mt-4 flex h-12 items-center justify-center rounded-lg bg-forest-dark text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-forest-mid"
        >
          Sign in
        </Link>

        <button type="button" className="text-sm text-earth-mid hover:text-earth-deep">
          Forgot PIN?
        </button>
      </form>

      <p className="mt-auto pt-12 text-center text-xs text-earth-mid">
        Your records are protected by Farmledge’s certified ledger.
      </p>
    </div>
  );
}
