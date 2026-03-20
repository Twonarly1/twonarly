import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import DefaultCatchBoundary from "@/components/core/default-catch-boundary";
import NotFound from "@/components/core/not-found";
import { routeTree } from "@/routeTree.gen";

import type { Session } from "better-auth";
import type { PropsWithChildren } from "react";

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: { queryClient, session: null, user: undefined },
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    Wrap: ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

export interface RouterContext {
  queryClient: QueryClient;
  session: Session | null;
  user: Session | undefined;
}
