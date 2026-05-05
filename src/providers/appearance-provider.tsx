"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

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

  // Debounced cookie sync
  const pendingRef = useRef<Partial<AppearanceSettings>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const updateAppearance = useCallback((patch: Partial<AppearanceSettings>) => {
    setAppearance((prev) => ({ ...prev, ...patch }));

    pendingRef.current = { ...pendingRef.current, ...patch };
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (Object.keys(pendingRef.current).length > 0) {
        setAppearanceServerFn({ data: pendingRef.current });
        pendingRef.current = {};
      }
    }, 500);
  }, []);

  // Sync to DOM
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-size-base", appearance.fontSize);
    root.classList.toggle("pointer-cursor", appearance.usePointerCursor);
  }, [appearance.fontSize, appearance.usePointerCursor]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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
