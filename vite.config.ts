import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Add the target option here to specify an environment that supports top-level await
    target: "chrome91",
  },
});
