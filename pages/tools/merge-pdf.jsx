import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";

import Circles from "../../components/Circles";
import Bulb from "../../components/Bulb";
import { fadeIn } from "../../variants";

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

async function getPdfPageCount(buffer) {
  try {
    const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
    return pdf.getPageCount();
  } catch {
    return 0;
  }
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Merge PDF Files Online for Free",
  description:
    "Combine multiple PDF documents into a single file directly in your browser with no software installation.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Add PDF Files",
      text: "Drag and drop your PDF files into the merger or click to browse and select files from your device.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Arrange Order",
      text: "Use the up and down arrows to reorder your PDFs in the desired sequence.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Merge",
      text: "Click the Merge button. All processing happens in your browser — no files are uploaded.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download",
      text: "Your merged PDF is automatically downloaded to your device.",
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
    title: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs with reading time.",
    path: "/tools/word-counter",
    icon: "\uD83D\uDD22",
  },
];

const faqItems = [
  {
    question: "Is this PDF merger free to use?",
    answer:
      "Yes, this PDF merge tool is completely free with no limits on file size or number of files. There are no watermarks, no sign-ups, and no hidden fees.",
  },
  {
    question: "Are my PDF files secure when merging online?",
    answer:
      "Absolutely. Your files never leave your device. All PDF processing happens entirely in your browser using client-side JavaScript. No files are uploaded to any server, ensuring complete privacy and security.",
  },
  {
    question: "Can I reorder PDF files before merging?",
    answer:
      "Yes. After adding your PDF files, you can use the up and down arrow buttons to rearrange them in any order you prefer before merging. The final merged PDF will follow the order you set.",
  },
  {
    question: "What is the maximum file size I can merge?",
    answer:
      "Since all processing happens in your browser, the limit depends on your device's available memory. Most modern devices can handle merging PDFs totaling several hundred megabytes without issues.",
  },
  {
    question: "Does this tool add watermarks to merged PDFs?",
    answer:
      "No. This is a completely free PDF merger with no watermarks. The merged output is a clean PDF containing exactly the pages from your source files, with no branding, watermarks, or modifications added.",
  },
  {
    question: "Can I merge password-protected PDFs?",
    answer:
      "The tool can handle many password-protected PDFs by using the ignoreEncryption option. However, some heavily encrypted PDFs may not be processable in the browser. For best results, remove password protection from your PDFs before merging.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free PDF Merger Online",
  description:
    "Merge multiple PDF files into one document for free. No upload, no server — all processing happens in your browser.",
  url: "https://www.vipulkaushik.com/tools/merge-pdf",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any (Browser-based)",
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
};

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [merging, setMerging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const fileInputRef = useRef(null);

  const addFiles = useCallback(async (fileList) => {
    const pdfFiles = Array.from(fileList).filter(
      (f) => f.type === "application/pdf"
    );
    if (pdfFiles.length === 0) return;

    const newFiles = await Promise.all(
      pdfFiles.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const pages = await getPdfPageCount(buffer);
        return {
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          pages,
          buffer,
        };
      })
    );

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e) => {
      addFiles(e.target.files);
      e.target.value = "";
    },
    [addFiles]
  );

  const removeFile = useCallback((id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const moveFile = useCallback((index, direction) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const mergePdfs = useCallback(async () => {
    if (files.length < 2) return;
    setMerging(true);
    setProgress(0);

    try {
      const merged = await PDFDocument.create();
      for (let i = 0; i < files.length; i++) {
        const donor = await PDFDocument.load(files[i].buffer, {
          ignoreEncryption: true,
        });
        const pages = await merged.copyPages(donor, donor.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      const pdfBytes = await merged.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Merge failed:", err);
      alert("Failed to merge PDFs. One or more files may be corrupted.");
    } finally {
      setMerging(false);
      setProgress(0);
    }
  }, [files]);

  const totalPages = files.reduce((sum, f) => sum + f.pages, 0);
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <>
      <Head>
        <title>
          Free PDF Merger Online | Combine PDF Files — Vipul Kaushik
        </title>
        <meta
          name="description"
          content="Merge PDF files online for free. Combine multiple PDFs into one document instantly in your browser. No upload, no sign-up. Private, fast, and unlimited PDF merger tool by Vipul Kaushik."
        />
        <meta
          name="keywords"
          content="merge pdf online, combine pdf files free, pdf merger, join pdf files, merge pdf no upload, free pdf combiner"
        />
        <link
          rel="canonical"
          href="https://www.vipulkaushik.com/tools/merge-pdf"
        />
        <meta
          property="og:title"
          content="Free PDF Merger Online | Combine PDF Files"
        />
        <meta
          property="og:description"
          content="Merge multiple PDF files into one document for free. No upload — all processing happens in your browser."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.vipulkaushik.com/tools/merge-pdf"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </Head>

      <Circles />

      <section className="min-h-screen py-28 md:py-36 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Free <span className="text-accent">PDF Merger</span> Online
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
              Combine multiple PDF files into a single document. Fast, free, and
              private — your files never leave your device.
            </p>
          </motion.div>

          {/* Privacy Badge */}
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 text-green-400 text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Your files never leave your device
            </div>
          </motion.div>

          {/* Main Tool Card */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-12"
          >
            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Drop PDF files here or click to browse"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
              className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300 ${
                dragOver
                  ? "border-accent bg-accent/10 scale-[1.01]"
                  : "border-white/20 hover:border-white/40 hover:bg-white/5"
              }`}
            >
              <svg
                className="w-12 h-12 mx-auto mb-4 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-white/70 text-lg mb-1">
                Drag &amp; drop PDF files here
              </p>
              <p className="text-white/40 text-sm">
                or click to browse your files
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                multiple
                onChange={handleFileInput}
                className="hidden"
                aria-hidden="true"
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm text-white/50 px-1">
                  <span>
                    {files.length} file{files.length !== 1 ? "s" : ""} &middot;{" "}
                    {totalPages} page{totalPages !== 1 ? "s" : ""} &middot;{" "}
                    {formatFileSize(totalSize)}
                  </span>
                  <button
                    onClick={() => setFiles([])}
                    className="text-white/40 hover:text-accent transition-colors text-sm"
                  >
                    Clear all
                  </button>
                </div>

                <ul role="list" className="space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={file.id}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3 group"
                    >
                      {/* PDF Icon */}
                      <div className="flex-shrink-0 w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-accent"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM9.5 14.5c0 .28-.22.5-.5.5h-1v1.5H7v-4h2c.28 0 .5.22.5.5v1.5zm3 .5c0 .83-.67 1.5-1.5 1.5h-1v-4h1c.83 0 1.5.67 1.5 1.5v1zm4-2h-2v1h1.5v1H13.5v1.5H12.5v-4h3v.5z" />
                        </svg>
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">
                          {file.name}
                        </p>
                        <p className="text-white/40 text-xs">
                          {file.pages} page{file.pages !== 1 ? "s" : ""}{" "}
                          &middot; {formatFileSize(file.size)}
                        </p>
                      </div>

                      {/* Reorder Buttons */}
                      <div className="flex-shrink-0 flex flex-col gap-0.5">
                        <button
                          onClick={() => moveFile(index, -1)}
                          disabled={index === 0}
                          aria-label="Move up"
                          className="p-1 text-white/30 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => moveFile(index, 1)}
                          disabled={index === files.length - 1}
                          aria-label="Move down"
                          className="p-1 text-white/30 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFile(file.id)}
                        aria-label={`Remove ${file.name}`}
                        className="flex-shrink-0 p-1.5 text-white/30 hover:text-accent transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Progress Bar */}
                {merging && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-white/50 mb-1">
                      <span>Merging PDFs...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-accent h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Merge Button */}
                <button
                  onClick={mergePdfs}
                  disabled={files.length < 2 || merging}
                  className="w-full mt-4 py-3.5 px-6 bg-accent hover:bg-accent/90 disabled:bg-white/10 disabled:text-white/30 text-white font-semibold rounded-xl transition-all duration-300 text-base"
                >
                  {merging
                    ? "Merging..."
                    : files.length < 2
                    ? "Add at least 2 PDFs to merge"
                    : `Merge ${files.length} PDFs into One`}
                </button>
              </div>
            )}
          </motion.div>

          {/* SEO Content */}
          <motion.article
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">
              Merge PDF Files Online — Fast, Free &amp; Private
            </h2>
            <div className="text-white/60 space-y-4 text-sm md:text-base leading-relaxed">
              <p>
                Need to combine multiple PDF documents into a single file? This
                free online PDF merger lets you do exactly that — directly in
                your browser, with no software to install and no files uploaded
                to any server. Simply drag and drop your PDFs, arrange them in
                your preferred order, and click merge.
              </p>
              <p>
                Whether you are combining invoices for bookkeeping, assembling
                chapters of an ebook, consolidating reports for a presentation,
                or packaging contract documents for signing, this tool handles it
                all. It works with any PDF file regardless of size or number of
                pages.
              </p>
              <p>
                Privacy matters. Unlike most online PDF tools that require you to
                upload files to remote servers, this merger processes everything
                locally using your browser&apos;s built-in capabilities. Your
                documents stay on your device at all times — nothing is
                transmitted over the internet. This makes it ideal for sensitive
                business documents, legal contracts, medical records, and
                personal files.
              </p>
              <p>
                The tool is built with{" "}
                <strong>pdf-lib</strong>, a robust open-source library for PDF
                manipulation. It preserves the original formatting, fonts,
                images, and links in your documents. You can reorder files before
                merging, remove unwanted PDFs from the list, and see page counts
                and file sizes at a glance.
              </p>
            </div>
          </motion.article>

          {/* FAQ Section */}
          <motion.section
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            className="mb-12"
            aria-labelledby="faq-heading"
          >
            <h2 id="faq-heading" className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-3">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  <dt>
                    <button
                      onClick={() =>
                        setFaqOpen(faqOpen === index ? null : index)
                      }
                      className="w-full flex items-center justify-between p-4 text-left text-white hover:text-accent transition-colors"
                      aria-expanded={faqOpen === index}
                    >
                      <span className="font-medium text-sm md:text-base">
                        {item.question}
                      </span>
                      <svg
                        className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform duration-200 ${
                          faqOpen === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </dt>
                  {faqOpen === index && (
                    <dd className="px-4 pb-4 text-white/60 text-sm leading-relaxed">
                      {item.answer}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </motion.section>

          {/* Long-tail SEO Content */}
          <motion.article
            variants={fadeIn("up", 0.65)}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">
              Combine PDF Files Online Free — No Watermark
            </h2>
            <div className="text-white/60 space-y-4 text-sm md:text-base leading-relaxed">
              <p>
                Looking for a way to combine PDF files online free without
                watermarks? This tool lets you merge PDF without watermark or
                branding of any kind. The output is a clean, professional PDF
                document containing exactly the pages from your source files.
                There is no signup, no software to install, and no hidden fees.
              </p>
              <p>
                Whether you need to join PDF files for a business presentation,
                combine invoices for tax filing, assemble chapters of a manuscript,
                or package contract documents for e-signing, this merger handles
                it all. You can add as many PDFs as you need and reorder them with
                simple drag controls before merging. The tool preserves all
                formatting, fonts, images, and hyperlinks from the original
                documents.
              </p>
              <p>
                Because this PDF merger requires no signup and processes everything
                locally in your browser, it is the most privacy-friendly option
                available. Your sensitive documents — legal contracts, medical
                records, financial statements — never leave your device. No files
                are uploaded to any server, making it ideal for confidential
                business and personal use.
              </p>
            </div>
          </motion.article>

          {/* Comparison Table */}
          <motion.section
            variants={fadeIn("up", 0.7)}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">
              Our PDF Merger vs Others
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-white/10 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-white/10 text-white">
                    <th className="px-5 py-3 font-semibold">Feature</th>
                    <th className="px-5 py-3 font-semibold text-accent">This Tool</th>
                    <th className="px-5 py-3 font-semibold">Other PDF Mergers</th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  <tr className="border-t border-white/5">
                    <td className="px-5 py-3 font-medium text-white/80">Privacy</td>
                    <td className="px-5 py-3 text-green-400">100% client-side, no upload</td>
                    <td className="px-5 py-3">Files uploaded to server</td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white/80">Cost</td>
                    <td className="px-5 py-3 text-green-400">Completely free, unlimited</td>
                    <td className="px-5 py-3">Free tier with limits / paid</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-5 py-3 font-medium text-white/80">Watermarks</td>
                    <td className="px-5 py-3 text-green-400">No watermarks ever</td>
                    <td className="px-5 py-3">Watermarks on free tier</td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white/80">File Limits</td>
                    <td className="px-5 py-3 text-green-400">No limits on size or count</td>
                    <td className="px-5 py-3">Size and file count limits</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-5 py-3 font-medium text-white/80">Account Required</td>
                    <td className="px-5 py-3 text-green-400">No sign-up needed</td>
                    <td className="px-5 py-3">Often requires registration</td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white/80">Reorder Pages</td>
                    <td className="px-5 py-3 text-green-400">Full reorder support</td>
                    <td className="px-5 py-3">Basic or paid feature</td>
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
            <h2 className="text-2xl font-bold mb-6">
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
      </section>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
