import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

import Circles from "../../components/Circles";
import Bulb from "../../components/Bulb";
import { fadeIn } from "../../variants";

const SITE_URL = "https://www.vipulkaushik.com";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free JSON Formatter & Validator Online",
  url: `${SITE_URL}/tools/json-formatter`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any (Browser-based)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Vipul Kaushik",
    url: SITE_URL,
  },
  description:
    "Free online JSON formatter, validator, and minifier. Beautify, validate, and minify JSON data instantly in your browser with syntax highlighting and error detection.",
  featureList: [
    "JSON formatting with customizable indentation",
    "JSON validation with line-level error reporting",
    "JSON minification",
    "Syntax-highlighted output",
    "Copy to clipboard",
    "100% client-side processing",
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Format JSON Online",
  description:
    "Format, validate, and beautify JSON data instantly in your browser with syntax highlighting.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Paste JSON",
      text: "Paste your raw or minified JSON into the input panel on the left.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Format or Validate",
      text: "Click Format/Beautify to pretty-print, Validate to check syntax, or Minify to compress.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review Output",
      text: "View the formatted JSON with syntax highlighting and line numbers in the output panel.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Copy Result",
      text: "Click Copy to copy the formatted or minified JSON to your clipboard.",
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
    title: "PDF Merger",
    description:
      "Combine multiple PDF files into one. Drag to reorder, then merge.",
    path: "/tools/merge-pdf",
    icon: "\uD83D\uDCC4",
  },
  {
    title: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs with reading time.",
    path: "/tools/word-counter",
    icon: "\uD83D\uDD22",
  },
];

const faqData = [
  {
    question: "What is JSON formatting and why do I need it?",
    answer:
      "JSON formatting (also called pretty-printing or beautifying) adds proper indentation and line breaks to compressed JSON data, making it human-readable. Developers use it to debug API responses, inspect configuration files, and understand data structures at a glance.",
  },
  {
    question: "Is my JSON data safe when using this tool?",
    answer:
      "Yes, completely. This JSON formatter processes everything locally in your browser using JavaScript. No data is ever sent to any server. Your JSON never leaves your machine, making it safe for sensitive or proprietary data.",
  },
  {
    question: "What is the difference between JSON formatting and JSON validation?",
    answer:
      "JSON formatting restructures valid JSON with indentation for readability, while JSON validation checks whether your text is syntactically correct JSON. This tool does both: it validates your input and reports precise error locations if the JSON is invalid, then formats it if it passes validation.",
  },
  {
    question: "Can I minify JSON with this tool?",
    answer:
      "Yes. The minify feature removes all unnecessary whitespace, line breaks, and indentation from your JSON, producing the most compact representation. This is useful for reducing payload size in APIs, configuration files, and data storage.",
  },
  {
    question: "Does this JSON formatter support syntax highlighting?",
    answer:
      "Yes. The output panel displays your formatted JSON with full syntax highlighting: keys are shown in blue, strings in yellow, numbers in purple, booleans in pink, and null values in orange. Line numbers are also displayed for easy reference when debugging large JSON documents.",
  },
  {
    question: "Can I validate JSON from an API response?",
    answer:
      "Absolutely. Simply paste the raw API response into the input panel and click Validate. The tool will tell you whether the JSON is valid or pinpoint the exact line and character position of any syntax error. This is especially useful for debugging REST API responses, webhook payloads, and GraphQL queries.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/* ──────────────────────── syntax highlighter ──────────────────────── */

function syntaxHighlight(json) {
  const escaped = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(
    /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = "text-[#ae81ff]"; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-[#66d9ef]"; // key
        } else {
          cls = "text-[#e6db74]"; // string
        }
      } else if (/true|false/.test(match)) {
        cls = "text-[#f92672]"; // boolean
      } else if (/null/.test(match)) {
        cls = "text-[#fd971f]"; // null
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

/* ──────────────────────── helper: friendly error ──────────────────── */

function getFriendlyError(err) {
  const msg = err.message || String(err);
  const posMatch = msg.match(/position\s+(\d+)/i);
  const lineColMatch = msg.match(/line\s+(\d+)\s+column\s+(\d+)/i);

  if (lineColMatch) {
    return `Invalid JSON — error at line ${lineColMatch[1]}, column ${lineColMatch[2]}: ${msg}`;
  }
  if (posMatch) {
    return `Invalid JSON — error near character position ${posMatch[1]}: ${msg}`;
  }
  return `Invalid JSON — ${msg}`;
}

/* ──────────────────────── component ──────────────────────────────── */

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [tabSize, setTabSize] = useState(2);
  const outputRef = useRef(null);

  const clearStatus = () => setStatus({ type: "", message: "" });

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setStatus({ type: "error", message: "Please paste some JSON first." });
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, tabSize);
      setOutput(formatted);
      setStatus({ type: "success", message: "JSON formatted successfully." });
    } catch (err) {
      setOutput("");
      setStatus({ type: "error", message: getFriendlyError(err) });
    }
  }, [input, tabSize]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setStatus({ type: "error", message: "Please paste some JSON first." });
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setStatus({ type: "success", message: "JSON minified successfully." });
    } catch (err) {
      setOutput("");
      setStatus({ type: "error", message: getFriendlyError(err) });
    }
  }, [input]);

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setStatus({ type: "error", message: "Please paste some JSON first." });
      setOutput("");
      return;
    }
    try {
      JSON.parse(input);
      setStatus({ type: "success", message: "Valid JSON." });
    } catch (err) {
      setStatus({ type: "error", message: getFriendlyError(err) });
    }
  }, [input]);

  const handleCopy = useCallback(async () => {
    const text = output || input;
    if (!text.trim()) {
      setStatus({ type: "error", message: "Nothing to copy." });
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setStatus({ type: "success", message: "Copied to clipboard." });
    } catch {
      setStatus({ type: "error", message: "Failed to copy. Try selecting and copying manually." });
    }
  }, [output, input]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    clearStatus();
  }, []);

  /* numbered + highlighted lines */
  const renderOutput = () => {
    if (!output) return null;
    const lines = output.split("\n");
    const gutterWidth = String(lines.length).length;

    return lines.map((line, i) => {
      const num = String(i + 1).padStart(gutterWidth, " ");
      const highlighted = syntaxHighlight(line);
      return (
        <div key={i} className="flex">
          <span className="select-none text-white/20 pr-4 text-right inline-block" style={{ minWidth: `${gutterWidth + 1}ch` }}>
            {num}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-primary/30 py-20 sm:py-28 text-white">
      <Head>
        <title>Free JSON Formatter &amp; Validator Online &mdash; Vipul Kaushik</title>
        <meta
          name="description"
          content="Free online JSON formatter, validator, beautifier & minifier. Paste your JSON, format or validate it instantly in your browser. No data sent to servers. By Vipul Kaushik."
        />
        <link rel="canonical" href={`${SITE_URL}/tools/json-formatter`} />
        <meta property="og:title" content="Free JSON Formatter & Validator Online" />
        <meta property="og:description" content="Beautify, validate, and minify JSON instantly in your browser. 100% free, no sign-up." />
        <meta property="og:url" content={`${SITE_URL}/tools/json-formatter`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      </Head>

      <Circles />

      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        {/* ───── heading ───── */}
        <motion.header variants={fadeIn("down", 0.2)} initial="hidden" animate="show" exit="hidden" className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold font-sora leading-tight">
            Free <span className="text-accent">JSON Formatter</span> &amp; Validator Online
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/60 text-sm sm:text-base">
            Paste your JSON below to format, validate, or minify it instantly. Everything runs locally in your browser &mdash; your data never leaves your machine.
          </p>
        </motion.header>

        {/* ───── tool card ───── */}
        <motion.section
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          aria-label="JSON Formatter Tool"
          className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl"
        >
          {/* toolbar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={handleFormat}
              className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/80 text-white text-sm font-semibold transition-colors"
            >
              Format / Beautify
            </button>
            <button
              onClick={handleMinify}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
            >
              Minify
            </button>
            <button
              onClick={handleValidate}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
            >
              Validate
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
            >
              Copy
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
            >
              Clear
            </button>

            {/* tab size selector */}
            <div className="ml-auto flex items-center gap-2 text-sm text-white/60">
              <label htmlFor="tab-size">Indent:</label>
              <select
                id="tab-size"
                value={tabSize}
                onChange={(e) => setTabSize(Number(e.target.value))}
                className="bg-[#1a1a2e] border border-white/10 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-accent"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
              </select>
            </div>
          </div>

          {/* status bar */}
          {status.message && (
            <div
              role="status"
              className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium ${
                status.type === "error"
                  ? "bg-red-500/10 border border-red-500/30 text-red-400"
                  : "bg-green-500/10 border border-green-500/30 text-green-400"
              }`}
            >
              {status.message}
            </div>
          )}

          {/* panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* input */}
            <div className="flex flex-col">
              <label htmlFor="json-input" className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">
                Input
              </label>
              <textarea
                id="json-input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  clearStatus();
                }}
                placeholder='{"paste": "your JSON here"}'
                spellCheck={false}
                className="w-full h-72 sm:h-96 lg:h-[28rem] bg-[#1a1a2e] border border-white/10 rounded-xl p-4 text-sm text-white font-mono resize-none focus:outline-none focus:border-accent/60 placeholder:text-white/20 transition-colors"
              />
            </div>

            {/* output */}
            <div className="flex flex-col">
              <label className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">Output</label>
              <div
                ref={outputRef}
                aria-live="polite"
                className="w-full h-72 sm:h-96 lg:h-[28rem] bg-[#1a1a2e] border border-white/10 rounded-xl p-4 text-sm font-mono overflow-auto whitespace-pre"
              >
                {output ? (
                  renderOutput()
                ) : (
                  <span className="text-white/20">Formatted output will appear here...</span>
                )}
              </div>
            </div>
          </div>

          {/* privacy badge */}
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-2 text-xs text-white/40 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Processed locally in your browser
            </span>
          </div>
        </motion.section>

        {/* ───── SEO content ───── */}
        <motion.section
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mt-16 max-w-3xl mx-auto"
        >
          <article className="prose prose-invert prose-sm max-w-none text-white/60 leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Why Use an Online JSON Formatter?
            </h2>
            <p>
              JSON (JavaScript Object Notation) is the backbone of modern web communication. APIs return it,
              configuration files rely on it, and databases like MongoDB store data in it. Yet raw JSON from
              an API response or a minified config file is often a single unreadable line of text. A JSON
              formatter transforms that wall of text into neatly indented, human-readable output so you can
              quickly inspect keys, spot missing commas, and understand nested structures.
            </p>
            <p>
              This free online JSON formatter and validator parses your input entirely inside your browser
              using the native <code>JSON.parse</code> and <code>JSON.stringify</code> functions built into
              every modern JavaScript engine. That means zero network requests, zero latency, and complete
              privacy &mdash; your data never touches a remote server. Whether you are debugging a REST API
              response, cleaning up a package.json, or verifying webhook payloads, this tool gives you
              instant feedback with precise error locations when something is wrong.
            </p>
            <p>
              Beyond beautifying, the validator pinpoints the exact line and position of syntax errors,
              saving you from hunting through thousands of characters. The minifier does the opposite:
              it strips every unnecessary byte so your JSON payloads are as compact as possible for
              transmission or storage. Combined with syntax highlighting and line numbers, this tool covers
              the entire JSON workflow developers encounter daily.
            </p>
          </article>
        </motion.section>

        {/* ───── FAQ ───── */}
        <motion.section
          variants={fadeIn("up", 0.7)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mt-16 max-w-3xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((item, idx) => (
              <details
                key={idx}
                className="group backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="cursor-pointer px-5 py-4 text-sm sm:text-base font-semibold text-white flex items-center justify-between list-none">
                  {item.question}
                  <span className="ml-2 text-accent transition-transform group-open:rotate-45 text-lg leading-none">+</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-white/60 leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </motion.section>

        {/* ───── Long-tail SEO Content ───── */}
        <motion.section
          variants={fadeIn("up", 0.75)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mt-12 max-w-3xl mx-auto"
        >
          <article className="prose prose-invert prose-sm max-w-none text-white/60 leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              JSON Formatter with Syntax Highlighting
            </h2>
            <p>
              This free online JSON formatter with syntax highlighting makes it
              easy to read and debug complex JSON data structures. Whether you are
              working with API responses, configuration files, or database exports,
              the color-coded output helps you instantly identify keys, strings,
              numbers, booleans, and null values.
            </p>
            <p>
              Need to validate JSON online free? Simply paste your data and click
              Validate. The tool pinpoints the exact line and character position of
              any syntax error, saving you from manually hunting through thousands
              of characters. It works as a complete JSON beautifier and minifier in
              one tool — format for readability or compress for minimal payload
              size.
            </p>
            <p>
              Developers use this tool daily to debug REST API responses, clean up
              package.json files, verify webhook payloads, inspect MongoDB documents,
              and format JSON configuration files. Because everything runs locally in
              your browser, it is safe for sensitive data like authentication tokens,
              private API responses, and proprietary business data.
            </p>
          </article>
        </motion.section>

        {/* ───── Comparison Table ───── */}
        <motion.section
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mt-12 max-w-3xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            Our JSON Formatter vs Others
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/10 text-white">
                  <th className="px-5 py-3 font-semibold">Feature</th>
                  <th className="px-5 py-3 font-semibold text-accent">This Tool</th>
                  <th className="px-5 py-3 font-semibold">Other Formatters</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-t border-white/5">
                  <td className="px-5 py-3 font-medium text-white/80">Privacy</td>
                  <td className="px-5 py-3 text-green-400">100% client-side, no data sent</td>
                  <td className="px-5 py-3">Data sent to server for processing</td>
                </tr>
                <tr className="border-t border-white/5 bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-white/80">Cost</td>
                  <td className="px-5 py-3 text-green-400">Completely free</td>
                  <td className="px-5 py-3">Free with ads / paid premium</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-5 py-3 font-medium text-white/80">Syntax Highlighting</td>
                  <td className="px-5 py-3 text-green-400">Full color highlighting + line numbers</td>
                  <td className="px-5 py-3">Basic or none</td>
                </tr>
                <tr className="border-t border-white/5 bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-white/80">Error Reporting</td>
                  <td className="px-5 py-3 text-green-400">Exact line and position</td>
                  <td className="px-5 py-3">Generic error messages</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-5 py-3 font-medium text-white/80">Account Required</td>
                  <td className="px-5 py-3 text-green-400">No sign-up needed</td>
                  <td className="px-5 py-3">Often requires registration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* ───── Related Tools ───── */}
        <motion.section
          variants={fadeIn("up", 0.85)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mt-16 max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            Related Free Tools
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
  );
};

export async function getStaticProps() {
  return { props: {} };
}

export default JsonFormatter;
