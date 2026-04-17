import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

import { env } from "./t3.config";

// ssr issues, notice @ `ConnectWalletDialog.tsx`
const connectors =
  typeof window !== "undefined"
    ? [
        injected(),
        walletConnect({
          projectId: env.VITE_WALLETCONNECT_PROJECT_ID,
          qrModalOptions: { themeMode: "light" },
        }),
      ]
    : [injected()];

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors,
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
});
