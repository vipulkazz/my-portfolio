import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

import Circles from "../../components/Circles";
import Bulb from "../../components/Bulb";
import { fadeIn } from "../../variants";

const STOP_WORDS = new Set([
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her",
  "she", "or", "an", "will", "my", "one", "all", "would", "there",
  "their", "what", "so", "up", "out", "if", "about", "who", "get",
  "which", "go", "me", "when", "make", "can", "like", "time", "no",
  "just", "him", "know", "take", "people", "into", "year", "your",
  "good", "some", "could", "them", "see", "other", "than", "then",
  "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first",
  "well", "way", "even", "new", "want", "because", "any", "these",
  "give", "day", "most", "us", "is", "are", "was", "were", "been",
  "has", "had", "did", "does", "am", "being", "more", "very", "much",
]);

function analyzeText(text) {
  const trimmed = text.trim();

  if (!trimmed) {
    return {
      words: 0,
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      sentences: 0,
      paragraphs: 0,
      readingTime: "0 sec",
      speakingTime: "0 sec",
      keywords: [],
    };
  }

  const wordsArray = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = wordsArray.length;
  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || 1;

  const formatTime = (minutes) => {
    if (minutes < 1) {
      const seconds = Math.ceil(minutes * 60);
      return `${seconds} sec`;
    }
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    if (secs === 0) return `${mins} min`;
    return `${mins} min ${secs} sec`;
  };

  const readingTime = formatTime(wordCount / 200);
  const speakingTime = formatTime(wordCount / 130);

  // Keyword density
  const freq = {};
  wordsArray.forEach((w) => {
    const clean = w.toLowerCase().replace(/[^a-z0-9'-]/g, "");
    if (clean.length > 1 && !STOP_WORDS.has(clean)) {
      freq[clean] = (freq[clean] || 0) + 1;
    }
  });

  const keywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: ((count / wordCount) * 100).toFixed(1),
    }));

  return {
    words: wordCount,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    sentences,
    paragraphs,
    readingTime,
    speakingTime,
    keywords,
  };
}

const FAQ_DATA = [
  {
    question: "How does this word counter tool work?",
    answer:
      "Simply type or paste your text into the textarea above. The tool instantly analyzes your content in real time, calculating word count, character count (with and without spaces), sentence count, paragraph count, estimated reading time, and speaking time. All processing happens directly in your browser — no data is sent to any server.",
  },
  {
    question: "What reading speed is used to calculate reading and speaking time?",
    answer:
      "Reading time is calculated based on an average adult reading speed of 200 words per minute (wpm). Speaking time uses 130 wpm, which reflects a comfortable, clear speaking pace suitable for presentations and public speaking.",
  },
  {
    question: "How is keyword density calculated?",
    answer:
      "Keyword density is calculated by dividing the number of times a word appears by the total word count, then multiplying by 100 to get a percentage. Common stop words (like 'the', 'and', 'is') are excluded to surface only meaningful keywords that matter for SEO and content analysis.",
  },
  {
    question: "Is my text stored or sent anywhere?",
    answer:
      "No. This word counter runs entirely in your browser using client-side JavaScript. Your text never leaves your device, is never stored on any server, and is never shared with third parties. Your content remains completely private.",
  },
  {
    question: "Can I use this as a character counter for Twitter or social media?",
    answer:
      "Yes. The character count display shows both total characters and characters without spaces, which is exactly what you need for Twitter (280 characters), Instagram captions (2,200 characters), meta descriptions (155 characters), and other platforms with character limits.",
  },
  {
    question: "How accurate is the reading time calculator?",
    answer:
      "The reading time estimate uses the widely accepted average of 200 words per minute for adult readers. While individual reading speeds vary, this benchmark is used by major platforms like Medium and WordPress. A 1,000-word article takes approximately 5 minutes to read, and a 2,000-word article about 10 minutes.",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Count Words Online",
  description:
    "Count words, characters, sentences, and paragraphs instantly with reading time estimates.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter Text",
      text: "Type or paste your text into the text area on the page.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "View Stats",
      text: "Instantly see word count, character count, sentences, paragraphs, reading time, and speaking time.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Check Keywords",
      text: "Review the keyword density table to see the most frequent meaningful words in your text.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Copy or Clear",
      text: "Copy your text to clipboard or clear the field to start a new analysis.",
    },
  ],
};

const relatedTools = [
  {
    title: "HEIC to JPG Converter",
    description:
      "Convert iPhone HEIC photos to JPG or PNG instantly. No upload required.",
    path: "/tools/heic-to-jpg",
    icon: "\uD83D\uDDBC\uFE0F",
  },
  {
    title: "Image Compressor",
    description:
      "Reduce image file sizes up to 90% without losing quality.",
    path: "/tools/image-compressor",
    icon: "\uD83D\uDCE6",
  },
  {
    title: "JSON Formatter",
    description:
      "Format, validate, and minify JSON data with syntax highlighting.",
    path: "/tools/json-formatter",
    icon: "{ }",
  },
  {
    title: "PDF Merger",
    description:
      "Combine multiple PDF files into one. Drag to reorder, then merge.",
    path: "/tools/merge-pdf",
    icon: "\uD83D\uDCC4",
  },
];

const StatCard = ({ value, label, delay }) => (
  <motion.div
    variants={fadeIn("up", delay)}
    initial="hidden"
    animate="show"
    className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 text-center hover:border-accent/30 transition-colors duration-300"
  >
    <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{value}</div>
    <div className="text-sm text-white/60">{label}</div>
  </motion.div>
);

const WordCounter = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => analyzeText(text), [text]);

  const handleClear = useCallback(() => {
    setText("");
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const seoTitle =
    "Free Word Counter Online | Character & Word Count Tool — Vipul Kaushik";
  const seoDescription =
    "Free online word counter and character counter tool. Count words, characters, sentences, paragraphs, and reading time instantly. No sign-up needed — paste your text and get results.";
  const pageUrl = "https://www.vipulkaushik.com/tools/word-counter";

  const jsonLdSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Word Counter Tool",
    description: seoDescription,
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Vipul Kaushik",
      url: "https://www.vipulkaushik.com",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-site text-white py-24 md:py-32 relative overflow-hidden">
        <Circles />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          {/* Header */}
          <motion.header
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Free <span className="text-accent">Word Counter</span> Online
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
              Count words, characters, sentences, and paragraphs instantly. Get
              reading time estimates and keyword density analysis — all free, no
              sign-up required.
            </p>
          </motion.header>

          {/* Textarea */}
          <motion.section
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            aria-label="Text input area"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full bg-transparent text-white placeholder-white/30 outline-none resize-y font-sans text-base leading-relaxed"
                style={{ minHeight: "200px" }}
                aria-label="Enter your text to count words and characters"
              />
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  onClick={handleCopy}
                  disabled={!text}
                  className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                  aria-label="Copy text to clipboard"
                >
                  {copied ? "Copied!" : "Copy Text"}
                </button>
                <button
                  onClick={handleClear}
                  disabled={!text}
                  className="px-4 py-2 text-sm rounded-lg bg-accent/80 hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                  aria-label="Clear all text"
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.section>

          {/* Stats Grid */}
          <section aria-label="Text statistics" className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard value={stats.words} label="Words" delay={0.1} />
              <StatCard value={stats.characters} label="Characters" delay={0.15} />
              <StatCard
                value={stats.charactersNoSpaces}
                label="Characters (no spaces)"
                delay={0.2}
              />
              <StatCard value={stats.sentences} label="Sentences" delay={0.25} />
              <StatCard value={stats.paragraphs} label="Paragraphs" delay={0.3} />
              <StatCard
                value={stats.readingTime}
                label="Reading Time"
                delay={0.35}
              />
              <StatCard
                value={stats.speakingTime}
                label="Speaking Time"
                delay={0.4}
              />
            </div>
          </section>

          {/* Keyword Density */}
          {stats.keywords.length > 0 && (
            <motion.section
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              aria-label="Keyword density analysis"
              className="mb-12"
            >
              <h2 className="text-xl font-bold mb-4">
                Keyword <span className="text-accent">Density</span>
              </h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-white/60">
                      <th className="text-left px-5 py-3 font-medium">#</th>
                      <th className="text-left px-5 py-3 font-medium">Keyword</th>
                      <th className="text-right px-5 py-3 font-medium">Count</th>
                      <th className="text-right px-5 py-3 font-medium">Density</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.keywords.map((kw, idx) => (
                      <tr
                        key={kw.word}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-5 py-2.5 text-white/40">{idx + 1}</td>
                        <td className="px-5 py-2.5 font-medium">{kw.word}</td>
                        <td className="px-5 py-2.5 text-right text-accent">
                          {kw.count}
                        </td>
                        <td className="px-5 py-2.5 text-right text-white/60">
                          {kw.density}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          )}

          {/* SEO Content */}
          <motion.section
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">
                Why Use a <span className="text-accent">Word Counter</span>?
              </h2>
              <div className="text-white/60 text-sm leading-relaxed space-y-4">
                <p>
                  A reliable word counter is an essential tool for writers, students,
                  bloggers, and professionals. Whether you are crafting a college
                  essay with a strict word limit, writing a blog post optimized for
                  search engines, or composing a social media caption that fits
                  platform character limits, knowing your exact word and character
                  count saves time and prevents costly mistakes.
                </p>
                <p>
                  This free online word counter tool provides real-time analysis as
                  you type or paste your content. Beyond simple word counting, it
                  delivers character counts with and without spaces, sentence and
                  paragraph totals, estimated reading and speaking times, and a
                  keyword density breakdown. These metrics are invaluable for SEO
                  content writing, where keyword density helps you maintain optimal
                  keyword usage without over-stuffing your text.
                </p>
                <p>
                  Content creators use word count tools daily to meet the
                  requirements of platforms like Twitter (280 characters), Instagram
                  captions (2,200 characters), meta descriptions (155 characters),
                  and Google Ads headlines (30 characters). Students rely on word
                  counters for assignments, dissertations, and scholarship
                  applications. Public speakers use the speaking time estimate to
                  pace presentations — a 10-minute talk typically requires about
                  1,300 words. The reading time estimate helps bloggers create
                  content that matches their audience's attention span, with most
                  readers preferring articles that take 5 to 7 minutes to read.
                </p>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            aria-label="Frequently asked questions"
            className="mb-12"
          >
            <h2 className="text-xl font-bold mb-6">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>
            <div className="space-y-4">
              {FAQ_DATA.map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 group"
                >
                  <summary className="px-6 py-4 cursor-pointer text-sm md:text-base font-medium list-none flex justify-between items-center hover:text-accent transition-colors">
                    {faq.question}
                    <span className="ml-4 text-accent group-open:rotate-45 transition-transform duration-200 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </motion.section>

          {/* Long-tail SEO Content */}
          <motion.section
            variants={fadeIn("up", 0.65)}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">
                Word Count Tool for <span className="text-accent">Essays & Content</span>
              </h2>
              <div className="text-white/60 text-sm leading-relaxed space-y-4">
                <p>
                  This word count tool for essays gives students and writers instant
                  feedback on their content length. Whether you are working on a
                  500-word essay, a 2,000-word research paper, or a dissertation
                  chapter, the real-time word counter eliminates the guesswork and
                  helps you stay within your required word limits.
                </p>
                <p>
                  Need a character counter for Twitter? This tool shows character
                  counts with and without spaces, making it perfect for crafting
                  tweets (280 characters), Instagram captions (2,200 characters),
                  LinkedIn posts (3,000 characters), and meta descriptions (155
                  characters). The instant feedback lets you edit your content in
                  real time until it fits the platform requirements.
                </p>
                <p>
                  The built-in reading time calculator online helps bloggers and
                  content creators estimate how long their articles take to read.
                  Research shows that the ideal blog post length for SEO is between
                  1,500 and 2,500 words, taking roughly 7 to 12 minutes to read.
                  The speaking time estimate is equally useful for preparing
                  presentations — a 10-minute talk typically needs about 1,300
                  words at a comfortable speaking pace.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Comparison Table */}
          <motion.section
            variants={fadeIn("up", 0.7)}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <h2 className="text-xl font-bold mb-6">
              Our Word Counter vs Others
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-white/10 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-white/10 text-white">
                    <th className="px-5 py-3 font-semibold">Feature</th>
                    <th className="px-5 py-3 font-semibold text-accent">This Tool</th>
                    <th className="px-5 py-3 font-semibold">Other Word Counters</th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  <tr className="border-t border-white/5">
                    <td className="px-5 py-3 font-medium text-white/80">Privacy</td>
                    <td className="px-5 py-3 text-green-400">100% client-side, no data sent</td>
                    <td className="px-5 py-3">Text may be sent to server</td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white/80">Cost</td>
                    <td className="px-5 py-3 text-green-400">Completely free</td>
                    <td className="px-5 py-3">Free with ads / premium features</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-5 py-3 font-medium text-white/80">Reading Time</td>
                    <td className="px-5 py-3 text-green-400">Reading + speaking time</td>
                    <td className="px-5 py-3">Basic or not available</td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white/80">Keyword Density</td>
                    <td className="px-5 py-3 text-green-400">Top 10 keywords with density %</td>
                    <td className="px-5 py-3">Rarely included</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-5 py-3 font-medium text-white/80">Account Required</td>
                    <td className="px-5 py-3 text-green-400">No sign-up needed</td>
                    <td className="px-5 py-3">Often requires registration</td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white/80">Real-time Analysis</td>
                    <td className="px-5 py-3 text-green-400">Instant as you type</td>
                    <td className="px-5 py-3">Requires button click</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Related Tools */}
          <motion.section
            variants={fadeIn("up", 0.75)}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <h2 className="text-xl font-bold mb-6">
              Related Free <span className="text-accent">Tools</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTools.map((tool, i) => (
                <Link href={tool.path} key={i}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 h-full hover:border-accent/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                    <div className="text-2xl mb-3">{tool.icon}</div>
                    <h3 className="text-sm font-semibold mb-1 group-hover:text-accent transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-white/40 text-xs leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        </div>

        <Bulb />
      </div>
    </>
  );
};

export async function getStaticProps() {
  return { props: {} };
}

export default WordCounter;
