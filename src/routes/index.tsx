import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckSquare,
  CreditCard,
  Fingerprint,
  Palette,
  Shield,
  Wallet,
  Zap,
} from "lucide-react";

import Link from "@/components/core/link";
import { EthereumIcon } from "@/components/icons/ethereum";
import { GitHubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { app } from "@/lib/config/app.config";
import { getSession } from "@/server/functions/session/get-session";

export const Route = createFileRoute("/")({
  component: LandingPage,
  loader: async () => {
    const session = await getSession();
    return { session };
  },
});

const features = [
  {
    icon: Shield,
    title: "Multi-Provider Auth",
    description:
      "Google, GitHub, Passkeys, Ethereum. Yes, Ethereum. Switch accounts without logging out like an animal.",
  },
  {
    icon: Palette,
    title: "Fully Themeable",
    description:
      "Light, dark, custom. OKLCH colors that actually make sense. Font sizes, sidebar layouts, all persisted. You're welcome.",
  },
  {
    icon: CreditCard,
    title: "Stripe Billing",
    description:
      "Plans, trials, invoices, cancellations. The whole uncomfortable conversation, handled gracefully.",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description:
      "A fully functional task management module. Create, edit, delete, archive. Here's the todo app.",
  },
  {
    icon: Wallet,
    title: "Web3 Ready",
    description:
      "SIWE with nonce validation, wallet linking, WalletConnect. For when your users are built different.",
  },
  {
    icon: Zap,
    title: "Modern Stack",
    description:
      "TanStack Start, React 19, Drizzle, Tailwind v4, Bun. No legacy guilt. No webpack.",
  },
];

const authMethods = [
  { icon: GoogleIcon, label: "Google" },
  { icon: GitHubIcon, label: "GitHub" },
  { icon: () => <Fingerprint className="icon-sm" />, label: "Passkeys" },
  { icon: EthereumIcon, label: "Ethereum" },
];

const stack = [
  "TanStack Start",
  "React 19",
  "Drizzle ORM",
  "Tailwind v4",
  "better-auth",
  "Stripe",
  "Wagmi",
  "Bun",
];

function LandingPage() {
  const { session } = Route.useLoaderData();

  return (
    <div className="mx-auto flex min-h-dvh w-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
          <span className="font-semibold text-sm">{app.name}</span>
          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Features
            </Button>
            {session ? (
              <Link
                to="/tasks"
                tone="primary"
                size="sm"
                search={{ archived: undefined, newTask: undefined }}
              >
                Open App <ArrowRight className="icon-xs" />
              </Link>
            ) : (
              <Link to="/sign-in" tone="primary" size="sm">
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-16 py-16">
        {/* Hero */}
        <section id="hero">
          <div className="mx-auto max-w-5xl">
            <div>
              <p className="mb-3 font-mono text-muted-foreground text-xs uppercase tracking-widest">
                A starter kit that respects your time
              </p>
              <h1 className="mb-5 font-bold text-5xl leading-[1.1] tracking-tight md:text-6xl">
                Skip the setup.
                <br />
                <span style={{ color: "var(--primary)" }}>Ship the thing.</span>
              </h1>
              <p className="mb-8 max-w-lg text-muted-foreground leading-relaxed">
                {app.name} is a full-featured TanStack Start boilerplate. Auth, billing, theming,
                tasks — all wired up, no assembly required.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {session ? (
                  <Link
                    to="/tasks"
                    tone="primary"
                    search={{ archived: undefined, newTask: undefined }}
                  >
                    Open App <ArrowRight className="icon-sm" />
                  </Link>
                ) : (
                  <>
                    <Link to="/sign-in" tone="primary">
                      Get started free <ArrowRight className="icon-sm" />
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      What's included
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Auth + Stack row */}
            <div className="mx-auto flex max-w-6xl flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">Sign in with</span>
                <div className="flex items-center gap-1">
                  {authMethods.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      title={label}
                      className="flex size-7 items-center justify-center rounded-md border bg-surface text-foreground"
                    >
                      <Icon />
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {stack.map((tech) => (
                  <span key={tech} className="font-mono text-muted-foreground text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12">
              <h2 className="font-bold text-2xl tracking-tight">
                Everything you were going to build anyway.
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">Six modules. Zero excuses.</p>
            </div>
            <div className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex flex-col gap-3 bg-background p-6">
                    <Icon className="icon-sm text-primary" style={{ color: "var(--primary)" }} />
                    <div>
                      <h3 className="mb-1 font-semibold text-sm">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-xl border bg-surface px-8 py-12 text-center">
              <p className="mb-2 font-mono text-muted-foreground text-xs uppercase tracking-widest">
                Seriously though
              </p>
              <h2 className="mb-4 font-bold text-3xl tracking-tight">Just start building.</h2>
              <p className="mx-auto mb-8 max-w-sm text-muted-foreground text-sm">
                You've read this far. You already know you need this. The button is right there.
              </p>
              {session ? (
                <Link
                  to="/tasks"
                  tone="primary"
                  search={{ archived: undefined, newTask: undefined }}
                >
                  Open App <ArrowRight className="icon-sm" />
                </Link>
              ) : (
                <Link to="/sign-in" tone="primary">
                  Get started free <ArrowRight className="icon-sm" />
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t px-6 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-semibold text-sm">{app.name}</span>
          <p className="text-muted-foreground text-xs">
            Built with TanStack Start · Deployed on Vercel
          </p>
        </div>
      </footer>
    </div>
  );
}
