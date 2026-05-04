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
      "Sign in with Google, GitHub, Passkeys, or your Ethereum wallet. Multi-session support lets you switch accounts instantly.",
  },
  {
    icon: Palette,
    title: "Fully Themeable",
    description:
      "Light, dark, system, or fully custom themes powered by OKLCH. Adjust colors, font sizes, sidebar layout, and more — all persisted across devices.",
  },
  {
    icon: CreditCard,
    title: "Stripe Billing",
    description:
      "Subscription management built in. Track plans, trial periods, invoices, and cancellations with a Stripe-powered billing portal.",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description:
      "A full CRUD module with inline editing, bulk actions, search, filtering, archiving, and virtualized rendering for large datasets.",
  },
  {
    icon: Wallet,
    title: "Web3 Ready",
    description:
      "Sign In With Ethereum (SIWE) with full nonce validation, wallet linking, and WalletConnect support baked right in.",
  },
  {
    icon: Zap,
    title: "Modern Stack",
    description:
      "TanStack Start + React 19, Drizzle ORM, Tailwind CSS v4, and Bun. Server functions, streaming SSR, and type-safe routing out of the box.",
  },
];

function LandingPage() {
  const { session } = Route.useLoaderData();

  return (
    <div className="flex min-h-dvh w-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 items-center justify-between px-6">
          <span className="font-semibold text-foreground">{app.name}</span>
          <nav className="flex items-center gap-3">
            {session ? (
              <Link
                to="/tasks"
                search={{ archived: undefined, newTask: undefined }}
                className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-90"
              >
                Open App
                <ArrowRight className="size-3.5" />
              </Link>
            ) : (
              <Link to="/sign-in">Sign in</Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-24 text-center md:py-36">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.646 0.196 293.756 / 0.12), transparent)",
            }}
          />

          <div className="relative max-w-3xl">
            <h1 className="mb-5 font-bold text-5xl text-foreground leading-tight tracking-tight md:text-6xl">
              Your app, <span style={{ color: "var(--primary)" }}>fully equipped</span>
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              {app.name} gives you authentication, billing, theming, and a full task management
              module — all wired together on a modern TanStack Start stack. Skip the boilerplate.
              Build what matters.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {session ? (
                <Link
                  to="/tasks"
                  search={{ archived: undefined, newTask: undefined }}
                  className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground text-sm transition-opacity hover:opacity-90"
                >
                  Open App
                  <ArrowRight className="size-4" />
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/sign-in" className="h-8">
                    Get started free
                    <ArrowRight className="icon-sm" />
                  </Link>

                  <Button
                    variant="outline"
                    onClick={() => {
                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="h-8"
                  >
                    See what's included
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Social proof / stack badges */}
        <section className="border-y bg-muted/40 px-6 py-5">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              "TanStack Start",
              "React 19",
              "Drizzle ORM",
              "Tailwind CSS v4",
              "better-auth",
              "Stripe",
              "Wagmi + SIWE",
              "Bun",
            ].map((tech) => (
              <span key={tech} className="select-none font-medium text-muted-foreground text-sm">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <h2 className="mb-3 font-bold text-3xl text-foreground tracking-tight md:text-4xl">
                Everything you need, nothing you don't
              </h2>
              <p className="mx-auto max-w-lg text-muted-foreground">
                Six production-grade modules that cover the hard parts of building a modern
                application — so you can focus on your product.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-xl border bg-background p-6">
                    <div
                      className="mb-4 flex size-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "oklch(0.646 0.196 293.756 / 0.1)" }}
                    >
                      <Icon className="size-5" style={{ color: "var(--primary)" }} />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Auth methods highlight */}
        <section className="border-y bg-muted/30 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-4 font-bold text-3xl text-foreground tracking-tight">
                  Sign in however you like
                </h2>
                <p className="mb-8 text-muted-foreground leading-relaxed">
                  {app.name} ships with four authentication methods out of the box. Users can link
                  multiple accounts, switch sessions without signing out, and manage passkeys and
                  connected wallets from one place.
                </p>
                <ul className="grid gap-3">
                  {[
                    { icon: GoogleIcon, label: "Google OAuth" },
                    { icon: GitHubIcon, label: "GitHub OAuth" },
                    {
                      icon: () => <Fingerprint className="icon-sm shrink-0" />,
                      label: "Passkeys (biometric)",
                    },
                    { icon: EthereumIcon, label: "Sign In With Ethereum" },
                  ].map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-foreground text-sm">
                      <span className="flex size-8 items-center justify-center rounded-lg border bg-background">
                        <Icon />
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 text-center md:py-32">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 font-bold text-4xl text-foreground tracking-tight">
              Ready to ship?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              Stop building auth and billing from scratch. {app.name} is your foundation — already
              done, already tested, already production-ready.
            </p>

            {session ? (
              <Link to="/tasks" search={{ archived: undefined, newTask: undefined }}>
                Open App
                <ArrowRight className="icon-sm" />
              </Link>
            ) : (
              <Link to="/sign-in">
                Create your account
                <ArrowRight className="icon-sm" />
              </Link>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <span className="font-semibold text-foreground text-sm">{app.name}</span>
          <p className="text-muted-foreground text-xs">
            Built with TanStack Start · Deployed on Vercel
          </p>
        </div>
      </footer>
    </div>
  );
}
