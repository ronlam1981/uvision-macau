import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: { main: "index.html", "subpage-footer": "src/subpage-footer.tsx" },
      output: { entryFileNames: (chunk) => chunk.name === "subpage-footer" ? "assets/subpage-footer.js" : "assets/[name]-[hash].js" },
    },
  },
});
