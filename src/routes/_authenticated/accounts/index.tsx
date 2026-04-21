import { createFileRoute } from "@tanstack/react-router";

import { fetchAccounts } from "@/server/functions/accounts/fetch-accounts";
import { fetchUserPasskeys } from "@/server/functions/user/fetch-passkeys";
import { fetchLinkedWallets } from "@/server/functions/wallet/fetch-linked-wallets";

export const Route = createFileRoute("/_authenticated/accounts/")({
  loader: async () => {
    const accounts = await fetchAccounts();
    const wallets = await fetchLinkedWallets();
    const passkeys = await fetchUserPasskeys();
    return { accounts, wallets, passkeys };
  },
});
