import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import DefaultError from "@/components/core/default-error";
import DefaultNotFound from "@/components/core/default-not-found";
import DefaultPending from "@/components/core/default-pending";
import { routeTree } from "@/routeTree.gen";

import type { PropsWithChildren } from "react";

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient, session: null, user: undefined },
    defaultErrorComponent: DefaultError,
    defaultNotFoundComponent: DefaultNotFound,
    defaultPendingComponent: DefaultPending,
    defaultPreloadStaleTime: 1000 * 30, // 30 seconds
    defaultPendingMs: 300,
    defaultPendingMinMs: 200,
    defaultStaleTime: 1000 * 60 * 5, // 5 minutes
    scrollRestoration: true,
    Wrap: ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
