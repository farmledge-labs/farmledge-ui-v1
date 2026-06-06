import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "@phosphor-icons/react";
import { useState } from "react";

export const Route = createFileRoute("/custodian/login")({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("ibrahim.garba@dawakin-depot.ng");
  const [pw, setPw] = useState("");
  return (
    <div className="grain-bg flex min-h-screen items-center justify-center bg-grain-pale px-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2">
          <ShieldCheck weight="fill" className="size-6 text-forest-dark" />
          <span className="font-display text-xl font-semibold text-earth-deep">Farmledge</span>
          <span className="ml-auto rounded-full bg-grain-warm px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-earth-mid">Custodian portal</span>
        </div>

        <div className="mt-10 rounded-2xl bg-card p-7 shadow-[0_4px_18px_rgba(59,42,26,0.08)]">
          <h1 className="font-display text-2xl font-semibold text-earth-deep">Sign in</h1>
          <p className="mt-1 text-sm text-earth-mid">Access your warehouse ledger.</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-earth-deep">Staff email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-lg border border-earth-mid/50 bg-grain-pale px-4 text-sm"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-earth-deep">Password</span>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="h-12 rounded-lg border border-earth-mid/50 bg-grain-pale px-4 text-sm"
              />
            </label>

            <div className="rounded-lg border border-dashed border-earth-light/60 bg-grain-pale/60 p-3 text-xs text-earth-mid">
              <span className="font-medium text-earth-deep">Hardware wallet:</span> connect device before signing critical operations in production.
            </div>

            <Link
              to="/custodian"
              className="flex h-12 w-full items-center justify-center rounded-lg bg-forest-dark text-sm font-semibold text-primary-foreground"
            >
              Sign in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
