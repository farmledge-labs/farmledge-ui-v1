import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "@phosphor-icons/react";
import { useState } from "react";

export const Route = createFileRoute("/lender/login")({
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"password" | "api">("password");
  return (
    <div className="grain-bg flex min-h-screen items-center justify-center bg-grain-pale px-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2">
          <ShieldCheck weight="fill" className="size-6 text-forest-dark" />
          <span className="font-display text-xl font-semibold text-earth-deep">Farmledge</span>
          <span className="ml-auto rounded-full bg-grain-warm px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-earth-mid">Lender portal</span>
        </div>
        <div className="mt-10 rounded-2xl bg-card p-7 shadow-[0_4px_18px_rgba(59,42,26,0.08)]">
          <h1 className="font-display text-2xl font-semibold text-earth-deep">Institutional sign in</h1>
          <p className="mt-1 text-sm text-earth-mid">Verify collateral. Manage loan locks.</p>

          <div className="mt-5 flex gap-1 rounded-lg bg-grain-pale p-1">
            <button onClick={() => setMode("password")} className={`flex-1 rounded-md py-2 text-sm font-medium ${mode === "password" ? "bg-card text-earth-deep shadow-sm" : "text-earth-mid"}`}>Email & password</button>
            <button onClick={() => setMode("api")} className={`flex-1 rounded-md py-2 text-sm font-medium ${mode === "api" ? "bg-card text-earth-deep shadow-sm" : "text-earth-mid"}`}>API key</button>
          </div>

          <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "password" ? (
              <>
                <Input label="Email" defaultValue="t.adekunle@karfimfb.ng" />
                <Input label="Password" type="password" />
              </>
            ) : (
              <Input label="API key" placeholder="key_prod_…" mono />
            )}
            <Link to="/lender" className="flex h-12 w-full items-center justify-center rounded-lg bg-forest-dark text-sm font-semibold text-primary-foreground">
              Continue
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
function Input({ label, mono, ...rest }: { label: string; mono?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-earth-mid">{label}</span>
      <input {...rest} className={`h-12 rounded-lg border border-earth-mid/40 bg-grain-pale px-3 text-sm ${mono ? "font-mono" : ""}`} />
    </label>
  );
}
