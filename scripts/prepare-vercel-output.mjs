import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { resolve, join } from "node:path";

const root = process.cwd();

console.log("=== DEBUG BUILD OUTPUT ===");
console.log("Root:", root);

try {
  console.log("Root files/folders:");
  console.log(readdirSync(root));
} catch (e) {
  console.error("Unable to read root directory", e);
}

// ✅ VITE OUTPUT (FIXED)
const distDir = resolve(root, "dist");

console.log("dist exists:", existsSync(distDir));

if (!existsSync(distDir)) {
  console.error("");
  console.error("❌ BUILD FAILED");
  console.error("dist folder does not exist.");
  console.error("");
  console.error("Run: npm run build and check if dist/ is created.");
  process.exit(1);
}

console.log("dist contents:");
console.log(readdirSync(distDir));

// =====================
// COPY DIST → PUBLIC
// =====================

const target = resolve(root, "public");

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

cpSync(distDir, target, { recursive: true });

console.log("✅ Copied dist -> public");

// =====================
// FIND ENTRY FILES
// =====================

const assetFiles = readdirSync(join(target, "assets"));

const jsFiles = assetFiles.filter((f) => f.endsWith(".js"));
const cssFiles = assetFiles.filter((f) => f.endsWith(".css"));

let entryJs = jsFiles[0];
let stylesCss = cssFiles[0];

console.log("Entry JS:", entryJs);
console.log("Styles CSS:", stylesCss);

// =====================
// GENERATE SIMPLE INDEX.HTML
// =====================

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>App</title>

${stylesCss ? `<link rel="stylesheet" href="/assets/${stylesCss}" />` : ""}

<link rel="modulepreload" href="/assets/${entryJs}" />
</head>

<body>
<div id="root"></div>

<script type="module" src="/assets/${entryJs}"></script>
</body>
</html>`;

writeFileSync(join(target, "index.html"), html);

console.log("✅ Wrote public/index.html");
console.log("🚀 Build ready for Vercel");