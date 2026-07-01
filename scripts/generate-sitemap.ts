import { writeFileSync } from "fs";

const SITE_URL = "https://www.bpgoncalves.pt";
const urls = ["/", "/catalogo"];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc><changefreq>weekly</changefreq><priority>${u === "/" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>`;

writeFileSync("public/sitemap.xml", sitemap);
console.log("Sitemap generated");
