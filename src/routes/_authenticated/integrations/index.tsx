import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/integrations/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto space-y-6 p-4 sm:space-y-12">
      <h1 className="items-baseline font-medium text-h1">Integrations</h1>
    </div>
  );
}
