import type { KnipConfig } from "knip";

export default {
  ignoreExportsUsedInFile: true,
  ignore: ["src/components/ui/**"],
  entry: ["src/router.tsx"],
} satisfies KnipConfig;
