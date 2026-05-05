import { createFileRoute } from "@tanstack/react-router";

import Map3D from "@/components/environment/map";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Map3D />;
}
