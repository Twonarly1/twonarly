import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [tsconfigPaths(), tanstackStart(), nitro(), react(), tailwindcss()],
  worker: {
    format: "es",
  },
  ssr: {
    external: ["better-auth", "@better-auth/core", "@better-auth/passkey", "@better-auth/stripe"],
  },
});

export default config;
