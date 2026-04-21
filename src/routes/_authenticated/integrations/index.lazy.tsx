import { createLazyFileRoute } from "@tanstack/react-router";

import PageContainer from "@/components/page-container";

export const Route = createLazyFileRoute("/_authenticated/integrations/")({
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return (
    <PageContainer>
      <h1 className="items-baseline font-medium text-4xl">Integrations</h1>
    </PageContainer>
  );
}
