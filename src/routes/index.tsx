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
          <h1 className="text-center text-h2">Log in to {app.name}</h1>

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

// const VINE_PATHS = [
//   {
//     d: "M 0 600 Q 60 500 40 400 Q 20 300 80 200 Q 120 120 100 40",
//     delay: 0,
//     duration: 3,
//     side: "left",
//   },
//   {
//     d: "M 0 650 Q 80 580 60 480 Q 40 380 120 280 Q 160 200 140 100",
//     delay: 0.4,
//     duration: 3.2,
//     side: "left",
//   },
//   {
//     d: "M 0 700 Q 100 620 70 520 Q 50 440 130 340 Q 170 260 150 160",
//     delay: 0.8,
//     duration: 3.5,
//     side: "left",
//   },
//   {
//     d: "M 400 600 Q 340 500 360 400 Q 380 300 320 200 Q 280 120 300 40",
//     delay: 0.2,
//     duration: 3,
//     side: "right",
//   },
//   {
//     d: "M 400 650 Q 320 580 340 480 Q 360 380 280 280 Q 240 200 260 100",
//     delay: 0.6,
//     duration: 3.2,
//     side: "right",
//   },
//   {
//     d: "M 400 700 Q 300 620 330 520 Q 350 440 270 340 Q 230 260 250 160",
//     delay: 1,
//     duration: 3.5,
//     side: "right",
//   },
// ];

// function VineBackground() {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 0,
//         overflow: "hidden",
//         pointerEvents: "none",
//       }}
//     >
//       <svg
//         viewBox="0 0 400 700"
//         preserveAspectRatio="xMidYMid slice"
//         style={{ width: "100%", height: "100%", opacity: 0.45 }}
//       >
//         <title>Vine Background Animation</title>
//         <defs>
//           <linearGradient id="vineGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
//             <stop offset="0%" stopColor="#2d6a4f" />
//             <stop offset="50%" stopColor="#40916c" />
//             <stop offset="100%" stopColor="#74c69d" />
//           </linearGradient>
//           <linearGradient id="vineGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
//             <stop offset="0%" stopColor="#1b4332" />
//             <stop offset="60%" stopColor="#2d6a4f" />
//             <stop offset="100%" stopColor="#52b788" />
//           </linearGradient>
//           <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#74c69d" />
//             <stop offset="100%" stopColor="#40916c" />
//           </linearGradient>
//         </defs>

//         {/* Vine strokes */}
//         {VINE_PATHS.map((vine, i) => (
//           <path
//             key={`vine-${
//               // biome-ignore lint/suspicious/noArrayIndexKey: allow using index as key for static array
//               i
//             }`}
//             d={vine.d}
//             fill="none"
//             stroke="url(#vineGrad1)"
//             strokeWidth={1.8}
//             strokeLinecap="round"
//             style={{
//               strokeDasharray: 1000,
//               strokeDashoffset: 1000,
//               animation: `vineGrow ${vine.duration}s ease-out ${vine.delay}s forwards`,
//             }}
//           />
//         ))}
//       </svg>

//       <style>{`
//         @keyframes vineGrow {
//           to { stroke-dashoffset: 0; }
//         }
//         @keyframes leafPop {
//           0% { opacity: 0; transform: translate(var(--tx, 0), var(--ty, 0)) rotate(var(--rot, 0)) scale(0); }
//           100% { opacity: 1; transform: translate(var(--tx, 0), var(--ty, 0)) rotate(var(--rot, 0)) scale(1); }
//         }
//         @keyframes budAppear {
//           0% { opacity: 0; r: 0; }
//           60% { opacity: 0.9; r: 3; }
//           100% { opacity: 0.6; r: 2.5; }
//         }
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes subtlePulse {
//           0%, 100% { opacity: 0.15; }
//           50% { opacity: 0.25; }
//         }
//       `}</style>
//     </div>
//   );
// }
