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
      vercel: {
        functions: {
          runtime: "nodejs24.x",
        },
      },
    }),
    react(),
    tailwindcss(),
  ],
  worker: {
    format: "es",
  },
});

export default config;
