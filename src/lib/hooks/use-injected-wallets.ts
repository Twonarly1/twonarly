import { useEffect, useSyncExternalStore } from "react";

/**
 * EIP-6963: Multi Injected Provider Discovery
 * Replaces wagmi's useConnectors() with zero dependencies.
 */

export interface EIP6963Provider {
  info: {
    uuid: string;
    name: string;
    icon: string;
    rdns: string;
  };
  provider: EIP1193Provider;
}

export interface EIP1193Provider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
}

// ── Module-level store ──

let providers: EIP6963Provider[] = [];
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return providers;
}

const EMPTY: EIP6963Provider[] = [];
function getServerSnapshot() {
  return EMPTY;
}

function handleAnnounce(event: Event) {
  const { detail } = event as CustomEvent<EIP6963Provider>;

  // Deduplicate by rdns
  if (providers.some((p) => p.info.rdns === detail.info.rdns)) return;

  providers = [...providers, detail];
  for (const listener of listeners) listener();
}

/**
 * Discovers all injected wallet providers via EIP-6963.
 * Returns an array of providers with name, icon, and the raw EIP-1193 provider.
 */
export function useInjectedWallets() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("eip6963:announceProvider", handleAnnounce);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () => {
      window.removeEventListener("eip6963:announceProvider", handleAnnounce);
    };
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
