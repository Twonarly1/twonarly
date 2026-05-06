"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { useDebounce } from "@/lib/hooks/use-debounce";
import { setAppearance as setAppearanceServerFn } from "@/server/functions/preferences/appearance";

import type { PropsWithChildren } from "react";
import type { FontSize } from "@/server/functions/preferences/appearance";

type AppearanceSettings = {
  fontSize: FontSize;
  usePointerCursor: boolean;
};

interface AppearanceContextValue {
  appearance: AppearanceSettings;
  updateAppearance: (patch: Partial<AppearanceSettings>) => void;
}

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

export function AppearanceProvider({
  children,
  initial,
}: PropsWithChildren<{ initial: AppearanceSettings }>) {
  const [appearance, setAppearance] = useState<AppearanceSettings>(initial);
  const debouncedAppearance = useDebounce(appearance, 500);

  const updateAppearance = useCallback((patch: Partial<AppearanceSettings>) => {
    setAppearance((prev) => ({ ...prev, ...patch }));
  }, []);

  // Persist to server (debounced)
  useEffect(() => {
    setAppearanceServerFn({ data: debouncedAppearance });
  }, [debouncedAppearance]);

  // Sync to DOM
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-size-base", appearance.fontSize);
    root.classList.toggle("pointer-cursor", appearance.usePointerCursor);
  }, [appearance.fontSize, appearance.usePointerCursor]);

  return <AppearanceContext value={{ appearance, updateAppearance }}>{children}</AppearanceContext>;
}

export const useAppearance = () => {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("`useAppearance` must be used within `<AppearanceProvider />`");
  }
  return context;
};

export type { AppearanceSettings };
