import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { FarmerTabBar } from "@/components/farmledge/FarmerTabBar";

export const Route = createFileRoute("/farmer")({
  component: FarmerLayout,
});

function FarmerLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideTabs = pathname === "/farmer/login";
  return (
    <div className="min-h-screen bg-grain-pale">
      <Outlet />
      {!hideTabs && <FarmerTabBar />}
    </div>
  );
}
