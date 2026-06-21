import { existsSync, cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

const distDir = resolve(root, "dist");
const publicDir = resolve(root, "public");

console.log("Checking build output...");

if (!existsSync(distDir)) {
  console.error("❌ dist folder does not exist.");
  console.error("Run: npm run build and check output.");
  process.exit(1);
}

// reset public folder
rmSync(publicDir, { recursive: true, force: true });
mkdirSync(publicDir, { recursive: true });

// copy dist → public
cpSync(distDir, publicDir, { recursive: true });

console.log("✅ Copied dist → public");