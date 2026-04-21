"use client";

import { PanelLeft } from "lucide-react";
import React from "react";
import { match } from "ts-pattern";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { COOKIES } from "@/lib/constants/cookies";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Slot } from "@/lib/utils/slot";
import { useLayout } from "@/providers/layout-provider";

import type { CSSProperties } from "react";

const SIDEBAR_COOKIE_NAME = COOKIES.sidebar;
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "14rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const { layout } = useLayout();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      // biome-ignore lint/suspicious/noDocumentCookie: Cookie to persist sidebar state
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  const toggleSidebar = React.useCallback(() => {
    if (layout.sidebarCollapsible === "none" && !isMobile) return;

    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, layout.sidebarCollapsible]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            ...style,
          } as CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper max-h-svh min-h-svh w-full",
          layout.sidebarVariant === "inset" ? "flex bg-sidebar" : "flex",
          layout.sidebarPosition === "right" && "flex-row-reverse",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({ className, children, ...props }: React.ComponentProps<"div">) {
  const { isMobile, state, openMobile, setOpenMobile, toggleSidebar } = useSidebar();
  const { layout } = useLayout();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) border-l-0 bg-transparent p-2 text-sidebar-foreground [&>button]:hidden"
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as CSSProperties}
          side={layout.sidebarPosition}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="z-50 flex h-full w-full flex-col rounded-lg bg-sidebar">
            {children}
            <Button variant="ghost" className="m-2" onClick={toggleSidebar}>
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const {
    sidebarPosition: position,
    sidebarVariant: variant,
    sidebarCollapsible: collapsible,
  } = layout;
  const isLeft = position === "left";
  const isFloating = variant === "floating";

  const borderClass = match({ variant, position })
    .with({ variant: "classic", position: "left" }, () => "shadow-[1px_0_0_0_var(--color-border)]")
    .with(
      { variant: "classic", position: "right" },
      () => "shadow-[-1px_0_0_0_var(--color-border)]",
    )
    // We use outline here to avoid layout shift with borders
    .with({ variant: "floating" }, () => "rounded-lg outline outline-border")
    .otherwise(() => undefined);

  return (
    <div
      className="group peer hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={position}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) transition-none",
          "group-data-[collapsible=icon]:w-12",
          "group-data-[collapsible=offcanvas]:w-0",
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) md:flex",
          "transition-[transform,opacity] duration-300 ease-out-strong",
          "group-data-[collapsible=icon]:w-12",
          isLeft
            ? cn(
                "left-0",
                isFloating
                  ? "group-data-[collapsible=offcanvas]:-translate-x-[calc(100%+0.5rem)]"
                  : "group-data-[collapsible=offcanvas]:-translate-x-full",
              )
            : cn(
                "right-0 order-last",
                isFloating
                  ? "group-data-[collapsible=offcanvas]:translate-x-[calc(100%+0.5rem)]"
                  : "group-data-[collapsible=offcanvas]:translate-x-full",
              ),
          isFloating && (isLeft ? "ml-2 py-2" : "mr-2 py-2"),
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={cn(
            "flex h-full w-full flex-col bg-sidebar text-sidebar-foreground",
            borderClass,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  const { layout } = useLayout();

  return (
    <div
      className={cn(
        "flex w-full",
        layout?.sidebarPosition === "right" && "justify-end",
        layout.sidebarCollapsible === "none" && "invisible",
      )}
    >
      <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        size="icon"
        className={cn(
          "z-10 flex transition-transform duration-150",
          layout.sidebarVariant === "inset" && "m-2",
          layout.sidebarVariant === "classic" && "mt-4 ml-2",
          layout.sidebarVariant === "floating" && "m-4",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft className="icon-sm" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </div>
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar, state } = useSidebar();
  const { layout } = useLayout();

  if (layout.sidebarCollapsible === "none") return null;
  if (layout.sidebarVariant === "floating") return null;

  const isLeft = layout.sidebarPosition === "left";

  const railPosition =
    layout.sidebarCollapsible === "offcanvas" && state === "collapsed"
      ? isLeft
        ? "-right-2"
        : "-left-6"
      : isLeft
        ? "right-0"
        : "-left-4";

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 cursor-ew-resize focus-visible:outline-none sm:flex",
        "after:absolute after:inset-y-0 after:right-0 after:w-px hover:after:bg-primary/50",
        layout.sidebarVariant === "inset" && "my-4",
        railPosition,
        className,
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, children, ...props }: React.ComponentProps<"main">) {
  const { layout } = useLayout();
  const { state, isMobile } = useSidebar();

  const insetClass =
    layout.sidebarVariant === "inset"
      ? cn(
          "rounded-lg border bg-background",
          layout.sidebarCollapsible === "offcanvas" && state === "collapsed"
            ? "m-2"
            : layout.sidebarPosition === "left"
              ? "my-2 mr-2"
              : "my-2 ml-2",
        )
      : undefined;

  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative grid min-h-0 w-full flex-1 grid-rows-[auto_1fr] overflow-hidden",
        insetClass,
        isMobile && "m-0 rounded-none",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className="flex flex-col gap-2 p-2 group-data-[collapsible=icon]:items-center"
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn(
        "relative flex w-full min-w-0 flex-col p-2 group-data-[collapsible=icon]:items-center",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 select-none items-center px-0 font-medium text-sidebar-foreground/70 text-sm outline-hidden group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:px-0 [&>svg]:size-4 [&>svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn(
        "flex w-full min-w-0 flex-col gap-px group-data-[collapsible=icon]:items-center",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn(
        "group/menu-item relative",

        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-active={isActive}
      className={cn(
        "peer/menu-button group/menu-button group/button",
        "flex h-8 w-full select-none items-center gap-1.5 overflow-hidden px-2 py-2 outline-none",
        "whitespace-nowrap font-medium text-sidebar-foreground/70 leading-snug",
        "rounded-lg border border-transparent",
        "hover:bg-sidebar-accent/60 hover:text-sidebar-foreground focus-visible:border focus-visible:border-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground",
        "transition-none group-data-[collapsible=icon]:size-8!",
        "[&>span:last-child]:truncate [&_svg]:shrink-0",

        className,
      )}
      {...props}
    />
  );

  if (!tooltip) return button;

  const tooltipProps = typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        sideOffset={16}
        hidden={state !== "collapsed" || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
};
