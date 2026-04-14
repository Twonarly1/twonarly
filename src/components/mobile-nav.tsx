import { Link, useRouter } from "@tanstack/react-router";
import { Ellipsis } from "lucide-react";
import React from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { navLinks } from "@/lib/constants/nav-links";
import { cn } from "@/lib/utils";

// First 2 are pinned, rest go in the "More" menu
const PINNED_COUNT = 2;
const pinnedLinks = navLinks.slice(0, PINNED_COUNT);
const moreLinks = navLinks.slice(PINNED_COUNT);

const MobileBottomNav = () => {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const [moreOpen, setMoreOpen] = React.useState(false);

  const isMoreActive = moreLinks.some((link) => link.to === pathname);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t md:hidden">
      <div className="flex h-14 items-center justify-around bg-sidebar px-2">
        {/* Pinned nav items */}
        {pinnedLinks.map((item) => {
          const isActive = item.to === pathname;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 transition-colors",
                "text-muted-foreground hover:text-foreground",
                "active:scale-95",
                isActive && "text-foreground",
              )}
            >
              <item.icon className={cn("size-5 transition-colors", isActive && "text-primary")} />
              <span
                className={cn("font-medium text-body-xs leading-none", isActive && "text-primary")}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        <Drawer open={moreOpen} onOpenChange={setMoreOpen}>
          <DrawerTrigger
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 transition-colors",
              "text-muted-foreground hover:text-foreground",
              "active:scale-95",
              isMoreActive && "text-foreground",
            )}
          >
            <Ellipsis className={cn("size-5 transition-colors", isMoreActive && "text-primary")} />
            <span
              className={cn(
                "font-medium text-body-xs leading-none",
                isMoreActive && "text-primary",
              )}
            >
              More
            </span>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="sr-only">
              <DrawerTitle className="hidden" />
              <DrawerDescription className="hidden" />
            </DrawerHeader>

            <div className="p-4">
              {moreLinks.map((item) => {
                const isActive = item.to === pathname;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-body transition-colors",
                      "text-muted-foreground hover:bg-accent hover:text-foreground",
                      isActive && "bg-muted text-foreground",
                    )}
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
