import { lchToHex } from "@/lib/utils/color";

import type { LchTuple } from "@/lib/utils/color";

export interface CustomTheme {
  base?: LchTuple;
  accent?: LchTuple;
  contrast: number;
  sidebar?: {
    base?: LchTuple;
    contrast: number;
  };
}

const clamp = (v: number) => Math.max(0, Math.min(100, v));

type ColorPalette = Record<string, [number, number, number]>;

function computePalette(theme: CustomTheme): ColorPalette {
  const palette: ColorPalette = {};

  if (theme.base) {
    const [L, C, H] = theme.base;
    const isLight = L >= 50;
    const { contrast } = theme;

    palette.background = [L, C, H];
    palette.content = [isLight ? clamp(L + 3) : clamp(L + 2), C * 0.9, H];

    if (isLight) {
      palette.surface = [clamp(L + contrast * 0.12), C * (1 - (contrast / 100) * 0.78), H];
      palette.border = [clamp(L - contrast * 0.29), C * 0.5, H];
      palette.muted = [clamp(L - 3), C * 0.5, H];
    } else {
      palette.surface = [clamp(L + contrast * 0.12), C * 0.85, H];
      palette.border = [clamp(L + contrast * 0.37), C * 0.5, H];
      palette.muted = [clamp(L + 4), C * 0.5, H];
    }

    if (isLight) {
      palette.foreground = [15, C * 0.15, H];
      palette["secondary-foreground"] = [25, C * 0.2, H];
      palette["muted-foreground"] = [45, C * 0.2, H];
      palette["faded-foreground"] = [65, C * 0.2, H];
    } else {
      palette.foreground = [95, C * 0.15, H];
      palette["secondary-foreground"] = [82, C * 0.2, H];
      palette["muted-foreground"] = [65, C * 0.2, H];
      palette["faded-foreground"] = [45, C * 0.2, H];
    }

    palette.sidebar = [clamp(L - 1.5), C, H];
    palette["sidebar-foreground"] = [isLight ? 15 : 95, 0, 0];
    palette["sidebar-accent"] = [clamp(isLight ? L - 8 : L + 10), C * 0.8, H];
  }

  if (theme.accent) {
    const [aL, aC, aH] = theme.accent;
    palette.primary = [aL, aC, aH];
    palette["primary-foreground"] = [aL > 60 ? 5 : 98, 0, 0];
  }

  if (theme.sidebar?.base) {
    const [sL, sC, sH] = theme.sidebar.base;
    const sc = theme.sidebar.contrast;
    palette.sidebar = [sL, sC, sH];
    palette["sidebar-foreground"] = [sL >= 50 ? 15 : 95, 0, 0];
    palette["sidebar-accent"] = [clamp(sL - sc * 0.1), sC * 0.8, sH];
  }

  return palette;
}

// ─── Client: apply LCH values to DOM ────────────────────────────────────────

export function applyCustomTheme(root: HTMLElement, theme: CustomTheme) {
  const palette = computePalette(theme);
  for (const [key, [L, C, H]] of Object.entries(palette)) {
    root.style.setProperty(`--${key}`, `lch(${L.toFixed(2)} ${C.toFixed(2)} ${H.toFixed(2)})`);
  }
}

export function clearCustomTheme(root: HTMLElement) {
  const allKeys = computePalette({
    base: [0, 0, 0],
    accent: [0, 0, 0],
    contrast: 100,
    sidebar: { base: [0, 0, 0], contrast: 50 },
  });

  for (const key of Object.keys(allKeys)) {
    root.style.removeProperty(`--${key}`);
  }
}

// ─── Server: precompute hex values for cookie/SSR ───────────────────────────

export function computeColorsFromTheme(theme: CustomTheme): Record<string, string> {
  const palette = computePalette(theme);
  const colors: Record<string, string> = {};
  for (const [key, lch] of Object.entries(palette)) {
    colors[key] = lchToHex(lch as LchTuple);
  }
  return colors;
}
