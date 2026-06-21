// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  // Force-enable the Nitro deploy plugin so non-Lovable CI builds (e.g. Vercel)
  // produce the same `dist/server/index.mjs` handler our prepare-vercel-output
  // script imports for SSR. Without this, the build falls back to the SPA shell
  // and the deployed site renders a blank white page.
  nitro: true,
  tanstackStart: {
    server: { entry: "server" },
  },
});
