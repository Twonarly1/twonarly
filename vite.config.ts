import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart(),
    nitro({
      preset: "vercel",
      rollupConfig: {
        treeshake: {
          moduleSideEffects: (id) => {
            if (id.includes("reflect-metadata")) return true;
            // Nitro default configs - https://nitro.build/config#modulesideeffects
            if (id.includes("unenv/polyfill/")) return true;
            if (id.includes("node-fetch-native/polyfill")) return true;
            return false;
          },
        },
      },
    }),
    react(),
    tailwindcss(),
  ],
  ssr: {
    noExternal: ["@peculiar/x509", "tsyringe", "reflect-metadata"],
  },
  worker: {
    format: "es",
  },
});

export default config;
