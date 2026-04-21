import type { KnipConfig } from "knip";

const knipConfig: KnipConfig = {
  ignoreDependencies: ["tailwindcss", "tw-animate-css"],
  ignoreExportsUsedInFile: true,
  entry: ["src/**/*.{ts,tsx}"],
  project: ["src/**/*.{ts,tsx}"],
  paths: {
    "src/components/ui/*": ["src/components/ui/*"],
  },
};

export default knipConfig;
