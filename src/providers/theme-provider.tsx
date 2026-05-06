import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { useDebounce } from "@/lib/hooks/use-debounce";
import { applyCustomTheme, clearCustomTheme } from "@/lib/utils/theme";
import { setThemePreferences } from "@/server/functions/preferences/theme";

import type { PropsWithChildren } from "react";
import type { CustomTheme, Theme } from "@/server/functions/preferences/theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (value: Theme) => void;
  customTheme: CustomTheme | undefined;
  setCustomTheme: (theme: CustomTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  theme: initialTheme,
  customTheme: initialCustomTheme,
}: PropsWithChildren<{
  theme: Theme;
  customTheme: CustomTheme | undefined;
}>) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [customTheme, setCustomTheme] = useState<CustomTheme | undefined>(initialCustomTheme);

  const debouncedTheme = useDebounce(theme, 500);
  const debouncedCustomTheme = useDebounce(customTheme, 500);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Persist to server (debounced)
  useEffect(() => {
    setThemePreferences({ data: { theme: debouncedTheme, customTheme: debouncedCustomTheme } });
  }, [debouncedTheme, debouncedCustomTheme]);

  // System theme
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const applySystemTheme = () => {
        root.classList.toggle("dark", mediaQuery.matches);
        root.classList.toggle("light", !mediaQuery.matches);
      };
      applySystemTheme();
      mediaQuery.addEventListener("change", applySystemTheme);
      return () => mediaQuery.removeEventListener("change", applySystemTheme);
    }

    if (theme !== "custom") {
      root.classList.remove("dark", "light");
      root.classList.add(theme);
    }
  }, [theme]);

  // Custom theme colors
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "custom" && customTheme?.base) {
      applyCustomTheme(root, customTheme);
    } else {
      clearCustomTheme(root);
    }
  }, [theme, customTheme]);

  // data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const contextValue = useMemo(
    () => ({ theme, setTheme, customTheme, setCustomTheme }),
    [theme, setTheme, customTheme],
  );

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("`useTheme` must be used within a ThemeProvider.");
  return context;
};
