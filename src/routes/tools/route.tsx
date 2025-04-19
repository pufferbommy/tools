import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/tools")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="container-sm py-8 space-y-8">
      <Outlet />
    </main>
  );
}
