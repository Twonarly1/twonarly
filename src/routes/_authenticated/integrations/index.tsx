import { createFileRoute } from "@tanstack/react-router";

import PageContainer from "@/components/page-container";

export const Route = createFileRoute("/_authenticated/integrations/")({
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return (
    <PageContainer>
      <h1 className="items-baseline font-medium text-h1">Integrations</h1>
    </PageContainer>
  );
}
