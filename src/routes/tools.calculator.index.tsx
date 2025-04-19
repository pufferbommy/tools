import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/calculator/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <>Hello "/tools/calculator"!</>;
}
