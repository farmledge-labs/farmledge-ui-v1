import { Link } from "@tanstack/react-router";
import { CaretLeft, WifiSlash } from "@phosphor-icons/react";
import type { ReactNode } from "react";

interface Props {
  title?: string;
  backTo?: string;
  right?: ReactNode;
  offline?: boolean;
  children: ReactNode;
}

export function FarmerScreen({ title, backTo, right, offline, children }: Props) {
  return (
    <div className="grain-bg mx-auto flex min-h-screen max-w-md flex-col bg-grain-pale">
      {(title || backTo) && (
        <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-border/60 bg-grain-pale/95 px-4 py-3 backdrop-blur">
          {backTo ? (
            <Link to={backTo} className="-ml-1 flex size-9 items-center justify-center rounded-full hover:bg-grain-warm">
              <CaretLeft className="size-5 text-earth-deep" />
            </Link>
          ) : (
            <div className="w-1" />
          )}
          <h1 className="font-display text-lg font-semibold text-earth-deep">{title}</h1>
          <div className="ml-auto">{right}</div>
        </header>
      )}
      {offline && (
        <div className="flex items-center gap-2 bg-alert-amber/15 px-4 py-2 text-xs font-medium text-earth-deep">
          <WifiSlash className="size-4" /> You’re offline. We’ll sync once you’re back online.
        </div>
      )}
      <main className="flex-1 px-4 pb-6 pt-4">{children}</main>
    </div>
  );
}
