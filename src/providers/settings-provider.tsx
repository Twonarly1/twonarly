import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { setSettings as setSettingsServerFn } from "@/server/functions/preferences/settings";

import type { PropsWithChildren } from "react";

type FontSize = "smaller" | "small" | "default" | "large" | "larger";

type Settings = {
  fontSize: FontSize;
  usePointerCursor: boolean;
  sidebarPosition: "left" | "right";
  sidebarVariant: "floating" | "inset" | "classic";
  sidebarCollapsible: "offcanvas" | "icon" | "none";
};

interface SettingsContext {
  settings: Settings;
  setFontSize: (size: FontSize) => void;
  setUsePointerCursor: (value: boolean) => void;
  sidebarPosition: "left" | "right";
  setSidebarPosition: (position: "left" | "right") => void;
  sidebarVariant: "floating" | "inset" | "classic";
  setSidebarVariant: (variant: "floating" | "inset" | "classic") => void;
  sidebarCollapsible: "offcanvas" | "icon" | "none";
  setSidebarCollapsible: (value: "offcanvas" | "icon" | "none") => void;
}

const SettingsContext = createContext<SettingsContext | null>(null);

export function SettingsProvider({
  children,
  settings: initialSettings,
}: PropsWithChildren<{ settings: Settings }>) {
  const [settings, setSettingsState] = useState<Settings>(initialSettings);

  // Track pending server updates to debounce
  const pendingUpdateRef = useRef<NodeJS.Timeout | null>(null);
  const pendingSettingsRef = useRef<Partial<Settings>>({});

  // Apply initial settings to DOM on mount
  useEffect(() => {
    // Apply font size
    if (settings.fontSize !== "default") {
      document.documentElement.setAttribute("data-font-size", settings.fontSize);
    } else {
      document.documentElement.removeAttribute("data-font-size");
    }

    // Apply pointer cursor
    if (settings.usePointerCursor) {
      document.documentElement.classList.add("pointer-cursor");
    } else {
      document.documentElement.classList.remove("pointer-cursor");
    }

    // Apply sidebar position
    if (settings.sidebarPosition === "left") {
      document.documentElement.setAttribute("data-sidebar-position", "left");
    } else {
      document.documentElement.setAttribute("data-sidebar-position", "right");
    }

    // Apply sidebar collapsible
    document.documentElement.setAttribute("data-sidebar-collapsible", settings.sidebarCollapsible);

    // Apply sidebar variant
    document.documentElement.setAttribute("data-sidebar-variant", settings.sidebarVariant);
  }, [
    settings.fontSize,
    settings.usePointerCursor,
    settings.sidebarPosition,
    settings.sidebarVariant,
    settings.sidebarCollapsible,
  ]);

  // Debounced server sync - only sends after 500ms of no changes
  const syncToServer = useCallback(() => {
    if (pendingUpdateRef.current) {
      clearTimeout(pendingUpdateRef.current);
    }

    pendingUpdateRef.current = setTimeout(() => {
      if (Object.keys(pendingSettingsRef.current).length > 0) {
        setSettingsServerFn({ data: pendingSettingsRef.current });
        pendingSettingsRef.current = {};
      }
    }, 500);
  }, []);

  const setFontSize = useCallback(
    (newFontSize: FontSize) => {
      // Update local state (DOM will be updated by useEffect)
      setSettingsState((prev) => ({ ...prev, fontSize: newFontSize }));

      // Queue server update (debounced)
      pendingSettingsRef.current.fontSize = newFontSize;
      syncToServer();
    },
    [syncToServer],
  );

  const setUsePointerCursor = useCallback(
    (usePointerCursor: boolean) => {
      // Update DOM immediately for instant feedback
      if (usePointerCursor) {
        document.documentElement.classList.add("pointer-cursor");
      } else {
        document.documentElement.classList.remove("pointer-cursor");
      }

      // Update local state immediately
      setSettingsState((prev) => ({ ...prev, usePointerCursor }));

      // Queue server update (debounced)
      pendingSettingsRef.current.usePointerCursor = usePointerCursor;
      syncToServer();
    },
    [syncToServer],
  );

  const setSidebarPosition = useCallback(
    (position: "left" | "right") => {
      setSettingsState((prev) => ({ ...prev, sidebarPosition: position }));
      pendingSettingsRef.current.sidebarPosition = position;
      syncToServer();
    },
    [syncToServer],
  );

  const setSidebarVariant = useCallback(
    (variant: "floating" | "inset" | "classic") => {
      setSettingsState((prev) => ({ ...prev, sidebarVariant: variant }));
      pendingSettingsRef.current.sidebarVariant = variant;
      syncToServer();
    },
    [syncToServer],
  );
  const setSidebarCollapsible = useCallback(
    (collapsible: "offcanvas" | "icon" | "none") => {
      setSettingsState((prev) => ({ ...prev, sidebarCollapsible: collapsible }));
      pendingSettingsRef.current.sidebarCollapsible = collapsible;
      syncToServer();
    },
    [syncToServer],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current);
      }
    };
  }, []);

  return (
    <SettingsContext
      value={{
        settings,
        setFontSize,
        setUsePointerCursor,
        setSidebarPosition,
        sidebarPosition: settings.sidebarPosition,
        sidebarVariant: settings.sidebarVariant,
        setSidebarVariant,
        sidebarCollapsible: settings.sidebarCollapsible,
        setSidebarCollapsible,
      }}
    >
      {children}
    </SettingsContext>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("`useSettings` called outside of `<SettingsProvider />`");
  return context;
};
