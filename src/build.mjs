// Renders every page to static HTML in dist/. Run: node src/build.mjs
import { mkdir, writeFile, cp, rm, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE } from "./lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "dist");
const routes = {
  "/": "home", "/launchpad/": "launchpad", "/gtm-engineering/": "gtm", "/ai-automation/": "ai",
  "/linkedin-personal-branding/": "linkedin", "/instagram-content-video/": "instagram",
  "/work/": "work", "/krish/": "krish", "/book-a-call/": "book", "/faq/": "faq", "/404": "notfound",
};

await rm(out, { recursive: true, force: true });
await cp(join(root, "public"), out, { recursive: true });
const available = new Set((await readdir(join(root, "src/pages"))).map((f) => f.replace(".mjs", "")));
const built = [];
for (const [path, mod] of Object.entries(routes)) {
  if (!available.has(mod)) continue;
  const html = (await import(`./pages/${mod}.mjs`)).default;
  const file = path === "/404" ? join(out, "404.html") : join(out, path, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  if (path !== "/404") built.push(path);
}
const today = new Date().toISOString().slice(0, 10);
await writeFile(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${built.map((p) => `  <url><loc>${SITE.url}${p}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`);
await writeFile(join(out, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
console.log(`Built ${built.length} pages → dist/`);
