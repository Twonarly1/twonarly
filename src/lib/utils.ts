import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    // year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function adjustColorLightness(hex: string, percentage: number): string {
  // Remove # if present
  const cleanHex = hex.replace("#", "");

  // Convert to RGB
  let r = parseInt(cleanHex.substring(0, 2), 16);
  let g = parseInt(cleanHex.substring(2, 4), 16);
  let b = parseInt(cleanHex.substring(4, 6), 16);

  // Adjust lightness
  r = Math.min(255, Math.floor(r + (255 - r) * (percentage / 100)));
  g = Math.min(255, Math.floor(g + (255 - g) * (percentage / 100)));
  b = Math.min(255, Math.floor(b + (255 - b) * (percentage / 100)));

  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
