import { createFileRoute } from "@tanstack/react-router";

import Link from "@/components/core/link";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";
import { app } from "@/lib/config/app.config";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const signIn = async () =>
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/tasks",
    });

  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <LoadingSwap isLoading={isPending} className="flex items-center gap-2">
          Loading
        </LoadingSwap>
      </div>
    );
  }

  return (
    <div className="flex h-dvh items-center justify-center">
      {session ? (
        <div className="flex flex-col items-center gap-8">
          <h1 className="font-medium text-h1">Landing Page Stuff</h1>
          <div className="flex gap-4">
            <Link to="/tasks">Tasks</Link>
            <Link to="/preferences" variant="outline">
              Preferences
            </Link>
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 p-4">
          {/* TODO: Logo here */}
          <div className="size-10 rounded-full border border-primary bg-primary/20 shadow-xl" />
          <h1 className="mt-4 text-h2">Log in to {app.name}</h1>

          {/* Minimal button */}
          <Button onClick={signIn} size="lg" className="px-12 py-6">
            <svg className="icon-lg mr-1" viewBox="0 0 24 24">
              <title>Google</title>
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>

            <p className="font-medium text-body-lg">Sign in with Google</p>
          </Button>
        </div>
      )}
    </div>
  );
}
