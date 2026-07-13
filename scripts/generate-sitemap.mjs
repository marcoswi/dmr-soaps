import fs from "node:fs";
import productListAndCategories from "../JS/product-list.js";

const SITE_URL = "https://dmrsoaps.com";
const today = new Date().toISOString().slice(0, 10);

const pages = [
  { loc: "/", priority: "1.00" },
  { loc: "/productos.html", priority: "0.90" },
  { loc: "/sobre-nosotros.html", priority: "0.80" },
];

const productPages = productListAndCategories.products.map((product) => ({
  loc: `/productos.html?producto=${product.id}`,
  priority: product.availability ? "0.70" : "0.50",
}));

const urls = [...pages, ...productPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${SITE_URL}${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync("sitemap.xml", xml);
