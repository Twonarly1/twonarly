import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { applyCustomTheme, clearCustomTheme } from "@/lib/utils/theme";
import { setThemePreferences } from "@/server/functions/preferences/theme";

import type { PropsWithChildren } from "react";
import type { CustomTheme, Theme } from "@/server/functions/preferences/theme";

interface ThemeContext {
  theme: Theme;
  setTheme: (value: Theme) => void;
  customTheme: CustomTheme | undefined;
}

const ThemeContext = createContext<ThemeContext | null>(null);

export function ThemeProvider({
  children,
  theme: initialTheme,
  customTheme: initialCustomTheme,
}: PropsWithChildren<{
  theme: Theme;
  customTheme: CustomTheme | undefined;
}>) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [customTheme] = useState<CustomTheme | undefined>(initialCustomTheme);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      setThemePreferences({ data: { theme: newTheme, customTheme } });
    },
    [customTheme],
  );

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

  // Custom theme — apply on mount AND when theme/customTheme changes
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "custom" && customTheme) {
      applyCustomTheme(root, customTheme);
    } else {
      clearCustomTheme(root);
    }

    return () => clearCustomTheme(root);
  }, [theme, customTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const contextValue = useMemo(
    () => ({ theme, setTheme, customTheme }),
    [theme, setTheme, customTheme],
  );

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("`useTheme` must be used within a ThemeProvider.");
  return context;
};
