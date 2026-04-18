"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { updateLayout as updateLayoutServerFn } from "@/server/functions/preferences/layout";

import type { PropsWithChildren } from "react";

type SidebarPosition = "left" | "right";
type SidebarVariant = "floating" | "inset" | "classic";
type SidebarCollapsible = "offcanvas" | "icon" | "none";

type LayoutSettings = {
  sidebarPosition: SidebarPosition;
  sidebarVariant: SidebarVariant;
  sidebarCollapsible: SidebarCollapsible;
};

const LAYOUT_DEFAULTS: LayoutSettings = {
  sidebarPosition: "left",
  sidebarVariant: "inset",
  sidebarCollapsible: "offcanvas",
};

interface LayoutContextValue {
  layout: LayoutSettings;
  updateLayout: (patch: Partial<LayoutSettings>) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({
  children,
  initial,
}: PropsWithChildren<{
  initial?: {
    sidebarPosition: string;
    sidebarVariant: string;
    sidebarCollapsible: string;
  } | null;
}>) {
  const [layout, setLayout] = useState<LayoutSettings>({
    sidebarPosition:
      (initial?.sidebarPosition as SidebarPosition) ?? LAYOUT_DEFAULTS.sidebarPosition,
    sidebarVariant: (initial?.sidebarVariant as SidebarVariant) ?? LAYOUT_DEFAULTS.sidebarVariant,
    sidebarCollapsible:
      (initial?.sidebarCollapsible as SidebarCollapsible) ?? LAYOUT_DEFAULTS.sidebarCollapsible,
  });

  // Debounced DB sync
  const pendingRef = useRef<Partial<LayoutSettings>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const updateLayout = useCallback((patch: Partial<LayoutSettings>) => {
    setLayout((prev) => ({ ...prev, ...patch }));

    pendingRef.current = { ...pendingRef.current, ...patch };
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (Object.keys(pendingRef.current).length > 0) {
        updateLayoutServerFn({ data: pendingRef.current });
        pendingRef.current = {};
      }
    }, 500);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return <LayoutContext value={{ layout, updateLayout }}>{children}</LayoutContext>;
}

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "`useLayout` must be used within `<LayoutProvider />` — is this component inside the authenticated layout?",
    );
  }
  return context;
};

export type { LayoutSettings };
