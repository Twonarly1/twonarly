import { createFileRoute } from "@tanstack/react-router";
import { FingerprintPattern } from "lucide-react";

import { ConnectWalletDialog } from "@/components/connect-wallet-dialog";
import Link from "@/components/core/link";
import { EthereumIcon } from "@/components/icons/ethereum";
import { GitHubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth/auth-client";
import { app } from "@/lib/config/app.config";
import { getSession } from "@/server/functions/session/get-session";

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => {
    const session = await getSession();
    return { session };
  },
});

function App() {
  const { session } = Route.useLoaderData();

  // const handlePasskeySignIn = async () => {
  //   const { error } = await authClient.signIn.passkey({
  //     autoFill: true,
  //     fetchOptions: {
  //       onSuccess: () => navigate({ to: "/tasks" }),
  //     },
  //   });

  //   if (error) {
  //     toast.error({
  //       title: "Sign in failed",
  //       description: "Could not sign in with passkey.",
  //     });
  //   }
  // };

  return (
    <div className="flex h-dvh items-center justify-center">
      {session ? (
        <div className="flex flex-col items-center gap-8">
          <Link to="/tasks">Enter Shell</Link>
        </div>
      ) : (
        <div className="rounded-lg border p-8">
          <h1 className="text-center font-semibold text-h2 text-primary">Log in to {app.name}</h1>

          <div className="mt-4 grid gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => signIn("google")}
              className="px-12 py-4"
            >
              <GoogleIcon className="size-4" />
              <p className="font-medium text-body-lg">Sign in with Google</p>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => signIn("github")}
              className="px-12 py-4"
            >
              <GitHubIcon className="size-4" />
              <p className="font-medium text-body-lg">Sign in with GitHub</p>
            </Button>

            <div className="flex w-full items-center gap-3 text-muted-foreground">
              <div className="h-px w-full bg-border" />
              <span className="text-sm">or</span>
              <div className="h-px w-full bg-border" />
            </div>

            <Button
              variant="outline"
              size="lg"
              disabled
              // onClick={handlePasskeySignIn}
              className="px-12 py-4"
            >
              <FingerprintPattern className="size-4" />
              <p className="font-medium text-body-lg">Sign in with passkey</p>
            </Button>

            <ConnectWalletDialog
              mode="sign-in"
              trigger={
                <Button variant="outline" size="lg" className="px-12 py-4">
                  <EthereumIcon className="size-4" />
                  <p className="font-medium text-body-lg">Sign In With Ethereum</p>
                </Button>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
