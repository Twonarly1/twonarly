import { createFileRoute } from "@tanstack/react-router";

import Link from "@/components/core/link";
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
        <div className="container mx-auto flex flex-col items-center justify-center gap-4">
          {/* TODO: Logo here */}
          <div className="size-10 rounded-full border border-primary bg-primary/20 shadow-xl" />
          <h1 className="mt-4 text-h2">Log in to {app.name}</h1>

          <div className="grid gap-2">
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

            {/* <Button
              variant="outline"
              size="lg"
              onClick={handlePasskeySignIn}
              className="px-12 py-4"
            >
              <Fingerprint className="size-4" />
              <p className="font-medium text-body-lg">Sign in with passkey</p>
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
}
