import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

import Circles from "../../components/Circles";
import Bulb from "../../components/Bulb";
import { fadeIn } from "../../variants";

const tools = [
  {
    title: "HEIC to JPG Converter",
    description: "Convert iPhone HEIC photos to JPG or PNG instantly. No upload required — runs in your browser.",
    path: "/tools/heic-to-jpg",
    icon: "🖼️",
  },
  {
    title: "Image Compressor",
    description: "Reduce image file sizes up to 90% without losing quality. Supports JPG, PNG, and WebP.",
    path: "/tools/image-compressor",
    icon: "📦",
  },
  {
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data with syntax highlighting. Perfect for developers.",
    path: "/tools/json-formatter",
    icon: "{ }",
  },
  {
    title: "PDF Merger",
    description: "Combine multiple PDF files into one. Drag to reorder, then merge — all in your browser.",
    path: "/tools/merge-pdf",
    icon: "📄",
  },
  {
    title: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs. Includes reading time and keyword density.",
    path: "/tools/word-counter",
    icon: "🔢",
  },
];

const toolsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "url": "https://www.vipulkaushik.com/tools",
  "name": "Free Online Tools | Vipul Kaushik",
  "description": "Free browser-based tools: HEIC converter, image compressor, JSON formatter, PDF merger, word counter. No uploads, no sign-up — 100% private.",
  "isPartOf": { "@id": "https://www.vipulkaushik.com/#website" },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": tools.map((tool, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.title,
        "description": tool.description,
        "url": `https://www.vipulkaushik.com${tool.path}`,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any (Browser-based)",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      },
    })),
  },
};

const Tools = () => {
  return (
    <div className="min-h-screen bg-primary/30 py-24 md:py-32">
      <Head>
        <title>Free Online Tools | No Upload Required — Vipul Kaushik</title>
        <meta
          name="description"
          content="Free browser-based tools: HEIC to JPG converter, image compressor, JSON formatter, PDF merger, word counter. Files never leave your device."
        />
        <link rel="canonical" href="https://www.vipulkaushik.com/tools" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
        />
      </Head>
      <Circles />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sora mb-4">
            Free Online <span className="text-accent">Tools</span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
            100% free, browser-based utilities. Your files never leave your
            device — no uploads, no sign-up, no limits.
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {tools.map((tool, i) => (
            <Link href={tool.path} key={i}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:border-accent/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                <div className="text-3xl mb-4">{tool.icon}</div>
                <h2 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                  {tool.title}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-4 text-accent text-sm font-semibold flex items-center gap-1">
                  Use tool
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Privacy note */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
          className="flex justify-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 text-green-400 text-xs sm:text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            All tools run locally in your browser — your files never leave your device
          </div>
        </motion.div>

        {/* SEO Content */}
        <motion.section
          variants={fadeIn("up", 0.7)}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto mt-16 px-2"
        >
          <h2 className="text-2xl font-bold font-sora mb-4">
            Why Use These Free Tools?
          </h2>
          <div className="text-white/60 text-sm leading-relaxed space-y-4">
            <p>
              These free online tools are built to solve everyday problems without
              compromising your privacy. Unlike most online utilities that upload
              your files to remote servers, every tool on this page processes data
              entirely in your browser using client-side JavaScript. Your images,
              PDFs, and text never leave your device.
            </p>
            <p>
              Whether you need to convert iPhone HEIC photos for sharing, compress
              images for your website, format messy JSON for debugging, merge PDF
              documents for work, or count words for an essay — these tools are
              fast, free, and require no account or installation.
            </p>
          </div>
        </motion.section>
      </div>
      <Bulb />
    </div>
  );
};

export async function getStaticProps() {
  return { props: {} };
}

export default Tools;
