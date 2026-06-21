// Vercel's outputDirectory is `public/`, and our build script writes the final
// bundle there. But Vite ALSO treats `public/` as a static-source folder during
// `vite build` — meaning any leftover files from a previous build (a stale
// index.html, old hashed assets, etc.) get copied into `dist/client`, which can
// override Vite's freshly generated output. Result: deployments serve old code.
//
// Fix: wipe everything in `public/` except the small set of files we
// intentionally keep there as static source (favicon, robots, etc.).
import { readdirSync, rmSync, statSync } from "node:fs";
import { resolve, join } from "node:path";

const root = process.cwd();
const publicDir = resolve(root, "public");

// Files we keep as static source. Add favicon.ico/robots.txt/etc. here if added later.
const KEEP = new Set([".assetsignore", ".gitkeep"]);

let entries;
try {
  entries = readdirSync(publicDir);
} catch {
  console.log("public/ does not exist — nothing to clean.");
  process.exit(0);
}

for (const name of entries) {
  if (KEEP.has(name)) continue;
  const p = join(publicDir, name);
  rmSync(p, { recursive: true, force: true });
  console.log(`removed ${p}`);
}
console.log("public/ cleaned for fresh build.");
