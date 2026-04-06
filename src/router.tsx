import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { WagmiProvider } from "wagmi";

import DefaultError from "@/components/core/default-error";
import DefaultNotFound from "@/components/core/default-not-found";
import DefaultPending from "@/components/core/default-pending";
import { routeTree } from "@/routeTree.gen";
import { wagmiConfig } from "./lib/config/wagmi.config";

import type { PropsWithChildren } from "react";

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient, session: null, user: undefined },
    defaultErrorComponent: DefaultError,
    defaultNotFoundComponent: DefaultNotFound,
    defaultPendingComponent: DefaultPending,
    defaultPreloadStaleTime: 0,
    defaultPendingMs: 300,
    defaultPendingMinMs: 200,
    scrollRestoration: true,
    Wrap: ({ children }: PropsWithChildren) => (
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
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
