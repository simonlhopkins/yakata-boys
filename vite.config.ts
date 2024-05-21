import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Accept-Ranges": "bytes",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": ["GET", "POST", "OPTIONS"],
      "Access-Control-Allow-Headers": ["Content-Type", "Range"],
    },
  },
});
