import { createContext, use, useCallback, useEffect, useState } from "react";

import { adjustColorLightness } from "@/lib/utils";
import {
  setCustomColors as setCustomColorsServerFn,
  setTheme as setThemeServerFn,
} from "@/server/functions/preferences/theme";

import type { PropsWithChildren } from "react";
import type { CustomColors, Theme } from "@/server/functions/preferences/theme";

interface ThemeContext {
  theme: Theme;
  setTheme: (value: Theme) => void;
  customColors: CustomColors | null;
  setCustomColors: (colors: CustomColors) => void;
  clearCustomColors: () => void;
}

const ThemeContext = createContext<ThemeContext | null>(null);

const ThemeProvider = ({
  children,
  theme: initialTheme,
  customColors: initialCustomColors,
}: PropsWithChildren<{
  theme: Theme;
  customColors: CustomColors | null;
}>) => {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [customColors, setCustomColorsState] = useState<CustomColors | null>(initialCustomColors);

  const setTheme = useCallback((newTheme: Theme) => {
    document.documentElement.className = newTheme;
    setThemeState(newTheme);
    setThemeServerFn({ data: newTheme });
  }, []);

  const setCustomColors = useCallback((colors: CustomColors) => {
    setCustomColorsState(colors);
    setCustomColorsServerFn({ data: colors });
  }, []);

  const clearCustomColors = useCallback(() => {
    setCustomColorsState(null);
  }, []);

  // system theme
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const applySystemTheme = () => {
        root.className = mediaQuery.matches ? "dark" : "light";
      };

      applySystemTheme();

      mediaQuery.addEventListener("change", applySystemTheme);

      return () => mediaQuery.removeEventListener("change", applySystemTheme);
    } else {
      root.className = theme;
    }
  }, [theme]);

  // custom theme
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "custom" && customColors) {
      if (customColors.background) {
        const bgColor = adjustColorLightness(customColors.background, 0);
        const insetColor = adjustColorLightness(customColors.background, 80);

        root.style.setProperty("--sidebar", bgColor);
        root.style.setProperty("--background", insetColor);
      }

      if (customColors.accent) {
        root.style.setProperty("--primary", customColors.accent);
        root.style.setProperty("--ring", customColors.accent);
      }

      if (customColors.border) {
        const borderColor = adjustColorLightness(customColors.border, 0);
        root.style.setProperty("--border", borderColor);
        root.style.setProperty("--input", borderColor);
      }
    } else {
      // Only remove properties when switching away from custom theme
      root.style.removeProperty("--sidebar");
      root.style.removeProperty("--background");
      root.style.removeProperty("--border");
      root.style.removeProperty("--primary");
      root.style.removeProperty("--ring");
      root.style.removeProperty("--input");
    }
  }, [theme, customColors]);

  return (
    <ThemeContext value={{ theme, setTheme, customColors, setCustomColors, clearCustomColors }}>
      {children}
    </ThemeContext>
  );
};

export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) throw new Error("`useTheme` called outside of `<ThemeProvider />`");
  return context;
};

export default ThemeProvider;
