import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["svelte", "@sveltejs/kit"],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["sqlite3", "bcrypt"],
  },
  define: {
    global: "globalThis",
  },
})
