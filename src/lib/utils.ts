import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-body-2xs",
        "text-body-xs",
        "text-body-sm",
        "text-body",
        "text-body-lg",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-h5",
        "text-h6",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function formatDate(date: Date | string | null | undefined, options?: { year?: boolean }) {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(options?.year && { year: "numeric" }),
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

export function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
}
