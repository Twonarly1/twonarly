import { useMatchRoute } from "@tanstack/react-router";
import { MoreHorizontal, Plus, Search, X } from "lucide-react";
import { useState } from "react";

import Link from "@/components/core/link";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { navLinks } from "@/lib/constants/nav-links";
import useDialogStore, { DialogType } from "@/lib/hooks/use-dialog-store";

const PINNED_COUNT = 2;
const pinnedLinks = navLinks.slice(0, PINNED_COUNT);

const MobileBottomNav = () => {
  const [open, setOpen] = useState(false);
  const matchRoute = useMatchRoute();
  const isTasksPage = !!matchRoute({ to: "/tasks" });

  const { setIsOpen: setIsSearchTaskOpen } = useDialogStore({
    type: DialogType.SearchTask,
  });

  return (
    <>
      <button
        type="button"
        tabIndex={-1}
        className="fixed inset-0 z-50 bg-black/50 md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s var(--ease-in-out-strong)",
        }}
        onClick={() => setOpen(false)}
        aria-label="Close navigation menu"
      />

      <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:hidden">
        <div className="flex flex-col overflow-hidden rounded-2xl border bg-content shadow-lg">
          <Collapsible open={open}>
            <div className="flex flex-col gap-0.5 p-2 text-left">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  variant="outline-surface"
                  size="lg"
                  activeProps={{
                    className: "text-foreground bg-muted custom:bg-surface border-border",
                  }}
                >
                  <item.icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              ))}
            </div>
          </Collapsible>

          <div className="flex w-full items-center justify-between px-3 py-2">
            {open ? (
              <>
                <Link
                  to="/tasks"
                  search={{ newTask: true, archived: undefined }}
                  variant="mobileNav"
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  <Plus className="size-4" />
                </Link>

                <Button variant="mobileNav" size="lg" onClick={() => setOpen(false)}>
                  <X className="size-4" />
                </Button>
              </>
            ) : isTasksPage ? (
              <>
                <Button variant="mobileNav" size="lg" onClick={() => setIsSearchTaskOpen(true)}>
                  <Search className="size-4" />
                </Button>

                <Link
                  to="/tasks"
                  search={{ newTask: true, archived: undefined }}
                  variant="mobileNav"
                  size="lg"
                >
                  <Plus className="size-4" />
                </Link>

                <Button variant="mobileNav" size="lg" onClick={() => setOpen((v) => !v)}>
                  <MoreHorizontal className="size-4" />
                </Button>
              </>
            ) : (
              <>
                {pinnedLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    variant="mobileNav"
                    size="lg"
                    activeProps={{ className: "text-foreground bg-muted custom:bg-surface" }}
                  >
                    <item.icon className="size-4" />
                  </Link>
                ))}

                <Button variant="mobileNav" size="lg" onClick={() => setOpen((v) => !v)}>
                  <MoreHorizontal className="size-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileBottomNav;
