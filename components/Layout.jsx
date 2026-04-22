import { Sora } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Nav from "../components/Nav";
import TopLeftImg from "../components/TopLeftImg";

// setup font
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "600", "700"],
});

const SITE_URL = "https://www.vipulkaushik.com";

const Layout = ({ children }) => {
  const router = useRouter();
  const canonicalUrl = `${SITE_URL}${router.asPath === "/" ? "" : router.asPath}`;

  const pathSegments = router.asPath.split('/').filter(Boolean);
  const pageName = pathSegments.length === 0 ? "Home" : pathSegments[pathSegments.length - 1]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const breadcrumbLd = router.asPath === "/" ? null : {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": pathSegments.length > 1
      ? [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vipulkaushik.com" },
          { "@type": "ListItem", "position": 2, "name": pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1), "item": `https://www.vipulkaushik.com/${pathSegments[0]}` },
          { "@type": "ListItem", "position": 3, "name": pageName, "item": canonicalUrl }
        ]
      : [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vipulkaushik.com" },
          { "@type": "ListItem", "position": 2, "name": pageName, "item": canonicalUrl }
        ]
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.vipulkaushik.com/#person",
        "name": "Vipul Kaushik",
        "url": "https://www.vipulkaushik.com",
        "image": "https://www.vipulkaushik.com/SubjectOne.png",
        "jobTitle": "Full-Stack Mobile Developer",
        "description": "Full-stack mobile developer with 8+ years of experience building secure, scalable apps for SaaS, Fintech, and HealthTech.",
        "sameAs": [
          "https://github.com/vipulkazz",
          "https://medium.com/@vipulkaushik96",
          "https://www.upwork.com/freelancers/~013c387b6de11f412c",
          "https://www.linkedin.com/in/vipul-kaushik/"
        ],
        "knowsAbout": ["React Native", "Expo", "Node.js", "Redux", "GraphQL", "MongoDB", "Firebase", "Supabase"]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.vipulkaushik.com/#website",
        "url": "https://www.vipulkaushik.com",
        "name": "Vipul Kaushik",
        "description": "Full-stack mobile developer portfolio",
        "publisher": { "@id": "https://www.vipulkaushik.com/#person" },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <main
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative ${
        router.asPath.startsWith("/blogs/") || router.asPath.startsWith("/tools") ? "!h-auto !min-h-screen !overflow-y-auto" : ""
      }`}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vipul Kaushik | Full-Stack Mobile Developer</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="description"
          content="Vipul Kaushik — Full-stack mobile developer with 8+ years of experience building secure, scalable apps for SaaS, Fintech, and HealthTech companies."
        />
<meta name="author" content="Vipul Kaushik" />
        <meta name="theme-color" content="#f13024" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Vipul Kaushik | Full-Stack Mobile Developer" />
        <meta property="og:description" content="Full-stack mobile developer with 8+ years of experience building secure, scalable apps for SaaS, Fintech, and HealthTech companies." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_URL}/SubjectOne.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Vipul Kaushik, Full-Stack Mobile Developer" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vipul Kaushik" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vipul Kaushik | Full-Stack Mobile Developer" />
        <meta name="twitter:description" content="Full-stack mobile developer with 8+ years of experience building secure, scalable apps for SaaS, Fintech, and HealthTech companies." />
        <meta name="twitter:image" content={`${SITE_URL}/SubjectOne.png`} />

        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {breadcrumbLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
          />
        )}
      </Head>

      <TopLeftImg />
      <Nav />
      <Header />

      {/* main content */}
      {children}

      {/* Footer — only on scrollable pages (blogs, tools) */}
      {(router.asPath.startsWith("/blogs/") || router.asPath.startsWith("/tools")) && (
        <footer className="relative z-10 border-t border-white/10 mt-auto py-6 px-4 text-center text-white/40 text-xs">
          <div className="container mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="/tools/json-formatter" className="hover:text-accent transition-colors">JSON Formatter</Link>
            <Link href="/tools/image-compressor" className="hover:text-accent transition-colors">Image Compressor</Link>
            <Link href="/tools/heic-to-jpg" className="hover:text-accent transition-colors">HEIC to JPG</Link>
            <Link href="/tools/merge-pdf" className="hover:text-accent transition-colors">PDF Merger</Link>
            <Link href="/tools/word-counter" className="hover:text-accent transition-colors">Word Counter</Link>
          </div>
          <p className="mt-3">&copy; 2026 Vipul Kaushik. All rights reserved.</p>
        </footer>
      )}
    </main>
  );
};

export default Layout;
