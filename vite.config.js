import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/bungie": {
        target: "https://www.bungie.net/Platform",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bungie/, ""),
      },
    },
  },
});
