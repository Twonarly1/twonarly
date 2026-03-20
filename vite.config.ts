import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [tsconfigPaths(), tanstackStart(), react(), tailwindcss()],
  worker: {
    format: "es",
  },
  // DELETE: watch https://github.com/TanStack/router/issues/5795
  // optimizeDeps: {
  //   // Exclude TanStack Start packages from Vite's dependency optimization
  //   // to prevent issues with virtual imports (#tanstack-router-entry, etc.)
  //   exclude: [
  //     "@tanstack/start-server-core",
  //     "@tanstack/react-start",
  //     "@tanstack/react-start/client",
  //     "@tanstack/react-start/server",
  //   ],
  // },
});

export default config;
