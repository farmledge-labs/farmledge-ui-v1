import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/custodian")({
  component: () => {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    if (pathname === "/custodian/login") return <Outlet />;
    return <Outlet />;
  },
});
