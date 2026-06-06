import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/lender")({
  component: () => <Outlet />,
});
