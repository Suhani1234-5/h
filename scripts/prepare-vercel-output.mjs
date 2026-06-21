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

// Lovable/TanStack Start outputs here
const clientDir = resolve(root, ".output/public");

if (!existsSync(clientDir)) {
  throw new Error(".output/public missing — run `vite build` first.");
}

// Copy built assets into public/
const target = resolve(root, "public");

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

cpSync(clientDir, target, { recursive: true });

console.log("Copied .output/public -> public");

const assetsDir = join(target, "assets");

if (!existsSync(assetsDir)) {
  throw new Error("assets directory missing from build output");
}

const assetFiles = readdirSync(assetsDir);

async function renderStaticHtml() {
  const serverEntry = resolve(root, ".output/server/index.mjs");

  if (!existsSync(serverEntry)) {
    console.warn(
      "No SSR server entry found at .output/server/index.mjs, using SPA fallback"
    );
    return undefined;
  }

  console.log("Using SSR entry:", serverEntry);

  const mod = await import(`file://${serverEntry}`);
  const handler = mod.default;

  if (!handler?.fetch) {
    console.warn("SSR handler missing fetch(), using SPA fallback");
    return undefined;
  }

  const runtimeContext = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const response = await handler.fetch(
    new Request("https://mentorship.girlsleadingtech.com/"),
    {},
    runtimeContext
  );

  if (!response.ok) {
    throw new Error(`SSR render failed with status ${response.status}`);
  }

  return await response.text();
}

// Find TanStack client entry
const indexJs = assetFiles.filter((f) => /^index-.*\.js$/.test(f));

let entryJs =
  indexJs.find((candidate) => {
    const body = readFileSync(join(assetsDir, candidate), "utf8");

    return (
      body.includes("hydrateRoot(document") ||
      body.includes(".hydrateRoot(document")
    );
  }) ??
  indexJs.find((candidate) => {
    const body = readFileSync(join(assetsDir, candidate), "utf8");

    return (
      body.includes("__TSS_START_OPTIONS__") ||
      body.includes("$_TSR")
    );
  }) ??
  indexJs[0];

const stylesCss =
  assetFiles.find((f) => /^styles-.*\.css$/.test(f)) ??
  assetFiles.find((f) => f.endsWith(".css"));

if (!entryJs) {
  throw new Error(
    "Could not find client entry JS in .output/public/assets"
  );
}

// Try SSR first
const staticHtml = await renderStaticHtml();

if (staticHtml) {
  writeFileSync(join(target, "index.html"), staticHtml);

  console.log("Wrote public/index.html from SSR output");

  process.exit(0);
}

// SPA fallback
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Girls Leading Tech</title>

${stylesCss ? `<link rel="stylesheet" href="/assets/${stylesCss}" />` : ""}

<link rel="modulepreload" href="/assets/${entryJs}" />
</head>

<body>
<div id="root"></div>

<script type="module" src="/assets/${entryJs}"></script>
</body>
</html>`;

writeFileSync(join(target, "index.html"), html);

console.log(
  `Wrote SPA fallback public/index.html (entry=${entryJs})`
);