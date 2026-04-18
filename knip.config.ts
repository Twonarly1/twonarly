import type { KnipConfig } from "knip";

const knipConfig: KnipConfig = {
  ignoreDependencies: ["@radix-ui/react-*", "tailwindcss", "tw-animate-css"],
  ignoreExportsUsedInFile: true,
  entry: ["src/**/*.{ts,tsx}"],
  project: ["src/**/*.{ts,tsx}"],
  paths: {
    "src/components/ui/*": ["src/components/ui/*"],
  },
};

export default knipConfig;
