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

const outputDir = resolve(root, ".output");

console.log(".output exists:", existsSync(outputDir));

if (existsSync(outputDir)) {
  try {
    console.log(".output contents:");
    console.log(readdirSync(outputDir));
  } catch (e) {
    console.error(e);
  }
}

const clientDir = resolve(root, ".output/public");

console.log(".output/public exists:", existsSync(clientDir));

if (!existsSync(clientDir)) {
  console.error("");
  console.error("❌ BUILD FAILED");
  console.error(".output/public does not exist.");
  console.error("");
  console.error("Please check the logs above to see what Vite generated.");
  process.exit(1);
}

const target = resolve(root, "public");

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

cpSync(clientDir, target, { recursive: true });

console.log("✅ Copied .output/public -> public");

const assetsDir = join(target, "assets");

if (!existsSync(assetsDir)) {
  throw new Error("assets directory missing from build output");
}

const assetFiles = readdirSync(assetsDir);

async function renderStaticHtml() {
  const serverEntry = resolve(root, ".output/server/index.mjs");

  console.log("SSR entry exists:", existsSync(serverEntry));

  if (!existsSync(serverEntry)) {
    console.warn(
      "No SSR server entry found at .output/server/index.mjs"
    );
    return undefined;
  }

  console.log("Using SSR entry:", serverEntry);

  const mod = await import(`file://${serverEntry}`);
  const handler = mod.default;

  if (!handler?.fetch) {
    console.warn("SSR handler missing fetch()");
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

  console.log("SSR response status:", response.status);

  if (!response.ok) {
    throw new Error(`SSR render failed with status ${response.status}`);
  }

  return await response.text();
}

const indexJs = assetFiles.filter((f) =>
  /^index-.*\.js$/.test(f)
);

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

console.log("Entry JS:", entryJs);
console.log("Styles CSS:", stylesCss);

let staticHtml;

try {
  staticHtml = await renderStaticHtml();
  console.log("SSR HTML length:", staticHtml?.length);
} catch (err) {
  console.error("SSR render error:");
  console.error(err);
  throw err;
}

if (staticHtml) {
  writeFileSync(join(target, "index.html"), staticHtml);
  console.log("✅ Wrote SSR index.html");
  process.exit(0);
}

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

console.log("⚠️ Using SPA fallback");
console.log("✅ Wrote public/index.html");