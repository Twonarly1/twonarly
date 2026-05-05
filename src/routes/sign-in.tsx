import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Fingerprint } from "lucide-react";

import Link from "@/components/core/link";
import { EthereumIcon } from "@/components/icons/ethereum";
import { GitHubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import { ConnectWalletDialog } from "@/components/siwe/connect-wallet-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { authClient, signIn } from "@/lib/auth/auth-client";
import { app } from "@/lib/config/app.config";
import { getSession } from "@/server/functions/session/get-session";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
  loader: async () => {
    const session = await getSession();
    return { session };
  },
  beforeLoad: async () => {
    const session = await getSession();
    if (session) {
      throw redirect({ to: "/tasks", search: { archived: undefined, newTask: undefined } });
    }
  },
});

function SignInPage() {
  const navigate = useNavigate();

  const handlePasskeySignIn = async () => {
    const { error } = await authClient.signIn.passkey({
      fetchOptions: {
        onSuccess: () =>
          navigate({ to: "/tasks", search: { archived: undefined, newTask: undefined } }),
      },
    });

    if (error) {
      toast.error({
        title: "Sign in failed",
        description: "Could not sign in with passkey.",
      });
    }
  };

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-background px-4">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.646 0.196 293.756 / 0.12), transparent)",
        }}
      />

      <div className="relative w-full max-w-sm">
        <Link variant="ghost" to="/">
          <ArrowLeft className="icon-sm" />
          Back
        </Link>

        <div className="mt-6 mb-8 text-center">
          <span className="font-semibold text-foreground text-xl">{app.name}</span>
          <h1 className="mt-2 font-bold text-2xl text-foreground tracking-tight">Welcome back</h1>
          <p className="mt-1 text-muted-foreground text-sm">Choose how you'd like to sign in</p>
        </div>

        <div className="rounded-xl border bg-background p-8 shadow-sm">
          <div className="grid gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => signIn("google")}
              className="justify-center"
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => signIn("github")}
              className="justify-center"
            >
              <GitHubIcon />
              Continue with GitHub
            </Button>

            <div className="flex w-full items-center gap-3 py-1 text-muted-foreground">
              <div className="h-px w-full bg-border" />
              <span className="shrink-0 text-xs">or</span>
              <div className="h-px w-full bg-border" />
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={handlePasskeySignIn}
              className="justify-center"
            >
              <Fingerprint className="size-4" />
              Sign in with Passkey
            </Button>

            <ConnectWalletDialog
              mode="sign-in"
              trigger={
                <Button variant="outline" size="lg" className="justify-center">
                  <EthereumIcon />
                  Sign In With Ethereum
                </Button>
              }
            />
          </div>
        </div>

        <p className="mt-6 text-center text-muted-foreground text-xs">
          By signing in you agree to our{" "}
          <a href="/terms" className="underline underline-offset-2 hover:text-foreground">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
