"use client";

import clsx from "clsx";
import React from "react";
import { match } from "ts-pattern";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { COOKIES } from "@/lib/constants/cookies";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useLayout } from "@/providers/layout-provider";

import type { CSSProperties } from "react";

const SIDEBAR_COOKIE_NAME = COOKIES.sidebar;
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "14rem";

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
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
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
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  return (
    <SidebarContext value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={{ "--sidebar-width": SIDEBAR_WIDTH, ...style } as CSSProperties}
        className={clsx(
          "group/sidebar-wrapper flex max-h-svh min-h-svh w-full overflow-hidden",
          layout.sidebarVariant === "inset" ? "bg-sidebar" : "bg-content",
          layout.sidebarPosition === "right" && "flex-row-reverse",
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext>
  );
}

function Sidebar({ children, ...props }: React.ComponentProps<"div">) {
  const { state } = useSidebar();
  const { layout } = useLayout();

  const {
    sidebarPosition: position,
    sidebarVariant: variant,
    sidebarCollapsible: collapsible,
  } = layout;
  const isLeft = position === "left";
  const isFloating = variant === "floating";

  const borderClass = match({ variant, position })
    .with({ variant: "classic", position: "left" }, () =>
      collapsible === "offcanvas" && state === "collapsed"
        ? undefined
        : "shadow-[1px_0_0_0_var(--color-border)]",
    )
    .with({ variant: "classic", position: "right" }, () =>
      collapsible === "offcanvas" && state === "collapsed"
        ? undefined
        : "shadow-[-1px_0_0_0_var(--color-border)]",
    )
    .with({ variant: "floating" }, () => "rounded-lg outline outline-border")
    .otherwise(() => undefined);

  const offcanvasTranslate = isLeft
    ? isFloating
      ? "group-data-[collapsible=offcanvas]:-translate-x-[calc(100%+1rem)]"
      : "group-data-[collapsible=offcanvas]:-translate-x-full"
    : isFloating
      ? "group-data-[collapsible=offcanvas]:translate-x-[calc(100%+1rem)]"
      : "group-data-[collapsible=offcanvas]:translate-x-full";

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
        className="relative w-(--sidebar-width) transition-none group-data-[collapsible=icon]:w-12 group-data-[collapsible=offcanvas]:w-0"
      />
      <div
        data-slot="sidebar-container"
        className={clsx(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) md:flex",
          "transition-[transform,opacity] duration-300 ease-out-strong",
          "bg-content group-data-[collapsible=icon]:w-12",
          isLeft ? "left-0" : "right-0 order-last",
          isFloating && !isLeft && "right-2",
          offcanvasTranslate,
          isFloating && (isLeft ? "ml-2 py-2" : "py-2"),
          variant === "inset" && "mt-2.25",
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={clsx(
            "flex h-full w-full flex-col bg-sidebar pb-16 text-sidebar-foreground",
            borderClass,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({ onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { state, toggleSidebar } = useSidebar();
  const { layout } = useLayout();

  return (
    <div
      className={clsx(
        "flex w-full",
        layout.sidebarPosition === "right" && "justify-end",
        layout.sidebarCollapsible === "none" && "invisible",
      )}
    >
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <Button
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="ghost"
            size="icon"
            className={clsx(
              "z-10 flex transition-transform duration-150 custom:hover:bg-surface",
              layout.sidebarVariant === "floating" && "m-2 mb-0",
            )}
            onClick={(event) => {
              onClick?.(event);
              toggleSidebar();
            }}
            {...props}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <title>"Toggle sidebar</title>
              <rect
                x="1.5"
                y="1.5"
                width="15"
                height="15"
                rx="4"
                stroke="currentColor"
                strokeWidth="0.7"
              />
              <rect x="4" y="3.5" width="5" height="11" rx="2" fill="currentColor" opacity="0.3" />
            </svg>
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side={layout.sidebarPosition === "right" ? "left" : "right"} sideOffset={8}>
          {state === "collapsed" ? "Expand sidebar" : "Collapse sidebar"}
          <Kbd>B</Kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

function SidebarInset({ children, ...props }: React.ComponentProps<"main">) {
  const { layout } = useLayout();
  const { state, isMobile } = useSidebar();

  const insetMargin =
    layout.sidebarCollapsible === "offcanvas" && state === "collapsed"
      ? "m-2"
      : layout.sidebarPosition === "left"
        ? "my-2 mr-2"
        : "my-2 ml-2";

  return (
    <main
      data-slot="sidebar-inset"
      className={clsx(
        "relative grid min-h-0 w-full flex-1 grid-rows-[auto_1fr] overflow-hidden bg-content",
        layout.sidebarVariant === "inset" && `rounded-lg border ${insetMargin}`,
        isMobile && "m-0 rounded-none",
      )}
      {...props}
    >
      {children}
    </main>
  );
}

function SidebarContent(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden"
      {...props}
    />
  );
}

function SidebarGroup(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className="relative flex w-full min-w-0 flex-col group-data-[collapsible=icon]:items-center"
      {...props}
    />
  );
}

function SidebarGroupLabel({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className="mt-4 flex shrink-0 select-none items-center px-2 font-medium text-sidebar-foreground/70 text-sm outline-hidden group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:px-0 [&>svg]:size-4 [&>svg]:shrink-0"
      {...props}
    />
  );
}

function SidebarMenu(props: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className="flex w-full min-w-0 flex-col gap-px p-2 group-data-[collapsible=icon]:items-center"
      {...props}
    />
  );
}

function SidebarMenuItem(props: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className="group/menu-item relative"
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
  const { isMobile, state } = useSidebar();

  const button = (
    <button
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-active={isActive}
      className={clsx(
        "peer/menu-button group/menu-button text-sm",
        "flex h-8 w-full select-none items-center gap-1.5 overflow-hidden px-2 py-1.5 outline-none",
        "whitespace-nowrap font-medium text-sidebar-foreground/70 leading-snug",
        "rounded-lg border border-transparent",
        "hover:bg-sidebar-accent/60 hover:text-sidebar-foreground focus-visible:border focus-visible:border-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground",
        "transition-none group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:[&>span]:hidden",
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
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};
