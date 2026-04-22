import { blogPosts } from "../data/blogs";

function generateSiteMap() {
  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: "", lastmod: today },
    { url: "/about", lastmod: today },
    { url: "/services", lastmod: today },
    { url: "/work", lastmod: today },
    { url: "/testimonials", lastmod: today },
    { url: "/blogs", lastmod: today },
    { url: "/contact", lastmod: today },
    { url: "/tools", lastmod: today },
    { url: "/tools/heic-to-jpg", lastmod: today },
    { url: "/tools/image-compressor", lastmod: today },
    { url: "/tools/json-formatter", lastmod: today },
    { url: "/tools/merge-pdf", lastmod: today },
    { url: "/tools/word-counter", lastmod: today },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    ({ url, lastmod }) => `  <url>
    <loc>https://www.vipulkaushik.com${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
${blogPosts
  .map(
    (post) => `  <url>
    <loc>https://www.vipulkaushik.com/blogs/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default function SiteMap() {
  return null;
}
