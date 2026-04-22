import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import imageCompression from "browser-image-compression";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILES = 20;

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function getSavingsColor(percent) {
  if (percent >= 50) return "text-green-400";
  if (percent >= 20) return "text-yellow-400";
  return "text-white/60";
}

const ImageCompressor = () => {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(75);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1920);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);

  const addFiles = useCallback(
    (newFiles) => {
      const validFiles = Array.from(newFiles)
        .filter((f) => ACCEPTED_TYPES.includes(f.type))
        .slice(0, MAX_FILES - files.length);

      const fileEntries = validFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        originalSize: file.size,
        preview: URL.createObjectURL(file),
        compressedBlob: null,
        compressedSize: null,
        status: "pending",
        error: null,
      }));

      setFiles((prev) => [...prev, ...fileEntries].slice(0, MAX_FILES));
    },
    [files.length]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e) => {
      if (e.target.files.length) addFiles(e.target.files);
      e.target.value = "";
    },
    [addFiles]
  );

  const compressAll = async () => {
    setIsCompressing(true);

    const pending = files.filter((f) => f.status === "pending");

    for (const entry of pending) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === entry.id ? { ...f, status: "compressing" } : f
        )
      );

      try {
        const options = {
          maxSizeMB: 10,
          maxWidthOrHeight: Math.max(maxWidth, maxHeight),
          initialQuality: quality / 100,
          useWebWorker: true,
          fileType: entry.file.type,
        };

        const compressedBlob = await imageCompression(entry.file, options);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id
              ? {
                  ...f,
                  status: "done",
                  compressedBlob,
                  compressedSize: compressedBlob.size,
                }
              : f
          )
        );
      } catch (err) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id
              ? { ...f, status: "error", error: err.message }
              : f
          )
        );
      }
    }

    setIsCompressing(false);
  };

  const downloadFile = (entry) => {
    if (!entry.compressedBlob) return;
    const url = URL.createObjectURL(entry.compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    const ext = entry.name.substring(entry.name.lastIndexOf("."));
    const baseName = entry.name.substring(0, entry.name.lastIndexOf("."));
    a.download = `${baseName}-compressed${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    files.filter((f) => f.status === "done").forEach(downloadFile);
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const clearAll = () => {
    files.forEach((f) => { if (f.preview) URL.revokeObjectURL(f.preview); });
    setFiles([]);
  };

  const completedFiles = files.filter((f) => f.status === "done");
  const totalOriginal = completedFiles.reduce(
    (sum, f) => sum + f.originalSize,
    0
  );
  const totalCompressed = completedFiles.reduce(
    (sum, f) => sum + (f.compressedSize || 0),
    0
  );
  const totalSavingsPercent =
    totalOriginal > 0
      ? Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100)
      : 0;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Image Compressor Online",
    url: "https://www.vipulkaushik.com/tools/image-compressor",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (Browser-based)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online image compressor that reduces JPG, PNG, and WebP file sizes up to 90% while maintaining quality. All processing happens in your browser — files never leave your device.",
    author: {
      "@type": "Person",
      name: "Vipul Kaushik",
      url: "https://www.vipulkaushik.com",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does online image compression work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Online image compression reduces file size by removing unnecessary metadata, optimizing color data, and applying lossy or lossless algorithms. Our tool uses browser-based processing so your images are compressed directly on your device without uploading them to any server.",
        },
      },
      {
        "@type": "Question",
        name: "What image formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This free image compressor supports JPEG (JPG), PNG, and WebP formats. These are the most widely used image formats on the web, covering virtually all use cases for websites, blogs, social media, and email.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data safe when compressing images online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely. Unlike most online image compressors that upload your files to a server, this tool processes everything locally in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and data security.",
        },
      },
      {
        "@type": "Question",
        name: "How much can I reduce my image file size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Compression results vary depending on the image content and quality settings. Typically, JPEG images can be reduced by 50-80%, PNG images by 30-60%, and WebP images by 20-50%. You can adjust the quality slider to find the perfect balance between file size and visual quality.",
        },
      },
      {
        "@type": "Question",
        name: "Can I compress images without losing quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. At higher quality settings (80-100%), the visual difference is virtually imperceptible to the human eye while still achieving meaningful file size reductions. PNG compression in this tool is lossless by nature, meaning zero quality loss. For JPEG and WebP, you control the quality-to-size tradeoff with the slider.",
        },
      },
      {
        "@type": "Question",
        name: "How do I reduce image size for email?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Upload your images to this compressor, set the quality to around 70-80%, and optionally set a maximum width of 1200px. This typically reduces images to under 200KB while keeping them perfectly clear for email. Most email clients have a 25MB attachment limit, and smaller images also load faster for recipients.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Compress Images Online for Free",
    description:
      "Reduce image file sizes up to 90% while maintaining quality using this free browser-based compressor.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Upload Images",
        text: "Drag and drop your JPG, PNG, or WebP images into the compressor, or click to browse files.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Adjust Settings",
        text: "Set the quality level and optional maximum dimensions to control compression strength.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Compress",
        text: "Click Compress All. Processing happens instantly in your browser with no upload required.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Download",
        text: "Download each compressed image individually or download all at once.",
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
    {
      title: "Word Counter",
      description:
        "Count words, characters, sentences, and paragraphs with reading time.",
      path: "/tools/word-counter",
      icon: "\uD83D\uDD22",
    },
  ];

  return (
    <>
      <Head>
        <title>
          Free Image Compressor Online | Reduce Image Size — Vipul Kaushik
        </title>
        <meta
          name="description"
          content="Compress image online free — reduce JPG, PNG, and WebP file sizes up to 90%. Fast, private, browser-based image compressor. No uploads, no sign-up required."
        />
        <meta
          name="keywords"
          content="compress image online, reduce image size, image compressor free, compress jpg, compress png, compress webp, online image optimizer"
        />
        <link
          rel="canonical"
          href="https://www.vipulkaushik.com/tools/image-compressor"
        />
        <meta
          property="og:title"
          content="Free Image Compressor Online | Reduce Image Size"
        />
        <meta
          property="og:description"
          content="Compress images in your browser for free. Supports JPG, PNG, WebP. No uploads — 100% private."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.vipulkaushik.com/tools/image-compressor"
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

      <main className="min-h-screen bg-site text-white py-24 md:py-32 relative overflow-hidden">
        <Circles />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <motion.header
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sora mb-4">
              Free Image <span className="text-accent">Compressor</span> Online
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
              Reduce image file sizes up to 90% without losing visible quality.
              Supports JPG, PNG, and WebP. Everything runs in your browser.
            </p>
          </motion.header>

          {/* Privacy badge */}
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 text-green-400 text-xs sm:text-sm">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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

          {/* Tool Card */}
          <motion.section
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto"
            aria-label="Image compression tool"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8">
              {/* Drop Zone */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Drop images here or click to browse files"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? "border-accent bg-accent/10 scale-[1.01]"
                    : "border-white/20 hover:border-accent/50 hover:bg-white/5"
                }`}
              >
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-white/70 text-sm sm:text-base mb-2">
                  <span className="text-accent font-semibold">
                    Click to upload
                  </span>{" "}
                  or drag and drop images here
                </p>
                <p className="text-white/40 text-xs">
                  JPG, PNG, WebP — up to {MAX_FILES} images at once
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple
                  onChange={handleFileInput}
                  className="hidden"
                  aria-hidden="true"
                />
              </div>

              {/* Settings */}
              {files.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="quality-slider"
                      className="block text-xs text-white/50 mb-1"
                    >
                      Quality:{" "}
                      <span className="text-white font-semibold">
                        {quality}%
                      </span>
                    </label>
                    <input
                      id="quality-slider"
                      type="range"
                      min="1"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-accent h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="max-width"
                      className="block text-xs text-white/50 mb-1"
                    >
                      Max Width (px)
                    </label>
                    <input
                      id="max-width"
                      type="number"
                      min="100"
                      max="10000"
                      value={maxWidth}
                      onChange={(e) => setMaxWidth(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="max-height"
                      className="block text-xs text-white/50 mb-1"
                    >
                      Max Height (px)
                    </label>
                    <input
                      id="max-height"
                      type="number"
                      min="100"
                      max="10000"
                      value={maxHeight}
                      onChange={(e) => setMaxHeight(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {files.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={compressAll}
                    disabled={
                      isCompressing ||
                      !files.some((f) => f.status === "pending")
                    }
                    className="bg-accent hover:bg-accent/80 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
                  >
                    {isCompressing ? "Compressing..." : "Compress All"}
                  </button>

                  {completedFiles.length > 1 && (
                    <button
                      onClick={downloadAll}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
                    >
                      Download All ({completedFiles.length})
                    </button>
                  )}

                  <button
                    onClick={clearAll}
                    className="bg-white/5 hover:bg-white/10 text-white/60 hover:text-white px-6 py-2.5 rounded-lg text-sm transition-colors ml-auto"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Summary bar */}
              {completedFiles.length > 0 && (
                <div className="mt-6 bg-white/5 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-sm">
                  <div className="flex gap-6">
                    <div>
                      <span className="text-white/50">Original:</span>{" "}
                      <span className="font-semibold">
                        {formatBytes(totalOriginal)}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/50">Compressed:</span>{" "}
                      <span className="font-semibold">
                        {formatBytes(totalCompressed)}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`font-bold text-lg ${getSavingsColor(
                      totalSavingsPercent
                    )}`}
                  >
                    Reduced by {totalSavingsPercent}%
                  </div>
                </div>
              )}

              {/* File Cards */}
              {files.length > 0 && (
                <ul className="mt-6 space-y-3" aria-label="Queued images">
                  {files.map((entry) => {
                    const savingsPercent =
                      entry.compressedSize != null
                        ? Math.round(
                            ((entry.originalSize - entry.compressedSize) /
                              entry.originalSize) *
                              100
                          )
                        : null;

                    return (
                      <li
                        key={entry.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                      >
                        {/* Preview thumbnail */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                          <img
                            src={entry.preview}
                            alt={`Preview of ${entry.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* File info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {entry.name}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50 mt-1">
                            <span>
                              Original: {formatBytes(entry.originalSize)}
                            </span>
                            {entry.compressedSize != null && (
                              <span>
                                Compressed:{" "}
                                {formatBytes(entry.compressedSize)}
                              </span>
                            )}
                            {savingsPercent != null && (
                              <span
                                className={`font-semibold ${getSavingsColor(
                                  savingsPercent
                                )}`}
                              >
                                {savingsPercent > 0
                                  ? `Reduced by ${savingsPercent}%`
                                  : "No reduction"}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Status / Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {entry.status === "compressing" && (
                            <span className="text-xs text-accent animate-pulse">
                              Compressing...
                            </span>
                          )}
                          {entry.status === "error" && (
                            <span className="text-xs text-red-400">
                              Error
                            </span>
                          )}
                          {entry.status === "done" && (
                            <button
                              onClick={() => downloadFile(entry)}
                              className="bg-accent/20 hover:bg-accent/30 text-accent px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                              aria-label={`Download compressed ${entry.name}`}
                            >
                              Download
                            </button>
                          )}
                          <button
                            onClick={() => removeFile(entry.id)}
                            className="text-white/30 hover:text-white/70 p-1 transition-colors"
                            aria-label={`Remove ${entry.name}`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.section>

          {/* SEO Content */}
          <motion.section
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto mt-16 px-2"
            aria-label="About this image compressor"
          >
            <h2 className="text-2xl font-bold font-sora mb-4">
              Why Compress Images Online?
            </h2>
            <div className="text-white/60 text-sm leading-relaxed space-y-4">
              <p>
                Image compression is essential for faster websites, better SEO
                rankings, and improved user experience. Large, unoptimized
                images are one of the biggest causes of slow page loads, which
                directly affects bounce rates and search engine rankings. Our
                free image compressor helps you reduce image file sizes by up to
                90% while maintaining visual quality that is virtually
                indistinguishable from the original.
              </p>
              <p>
                This tool supports the three most popular web image formats:
                <strong className="text-white/80"> JPEG</strong> for
                photographs and complex images,
                <strong className="text-white/80"> PNG</strong> for graphics
                with transparency, and
                <strong className="text-white/80"> WebP</strong> for modern,
                highly efficient compression. Whether you are optimizing images
                for a blog, e-commerce store, portfolio, or social media, this
                compressor handles it all.
              </p>
              <p>
                Unlike most online tools that upload your files to remote
                servers, this image compressor runs entirely in your browser
                using client-side JavaScript. Your images are never transmitted
                over the internet, ensuring complete privacy and security. There
                is no file size limit imposed by server uploads, no account
                required, and no watermarks added to your compressed images.
              </p>
              <p>
                Use the quality slider to find the perfect balance between file
                size and image quality. For most web use cases, a quality
                setting between 60-80% delivers excellent results with
                significant file size savings. You can also set maximum
                width and height to automatically resize oversized images during
                compression.
              </p>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto mt-16 px-2"
            aria-label="Frequently asked questions"
          >
            <h2 className="text-2xl font-bold font-sora mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-4">
              {faqSchema.mainEntity.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <dt className="font-semibold text-sm sm:text-base mb-2">
                    {item.name}
                  </dt>
                  <dd className="text-white/60 text-sm leading-relaxed">
                    {item.acceptedAnswer.text}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.section>

          {/* Long-tail SEO Content */}
          <motion.section
            variants={fadeIn("up", 0.65)}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto mt-12 px-2"
          >
            <h2 className="text-2xl font-bold font-sora mb-4">
              Bulk Image Compressor Online Free
            </h2>
            <div className="text-white/60 text-sm leading-relaxed space-y-4">
              <p>
                Need to compress images without losing quality for your website or
                blog? This bulk image compressor online free tool lets you optimize
                up to 20 images at once, all processed directly in your browser.
                There is no server upload, no file size cap, and no watermarks on
                your compressed images.
              </p>
              <p>
                Whether you need to reduce image size for email attachments,
                optimize product photos for an e-commerce store, or prepare blog
                images for faster page loads, this compressor handles it all. The
                adjustable quality slider lets you find the sweet spot between
                visual clarity and file size reduction. For most web images, a
                quality setting between 60-80% delivers excellent results that are
                visually indistinguishable from the original.
              </p>
              <p>
                Image optimization is one of the most impactful things you can do
                for website performance. Google uses page speed as a ranking factor,
                and large unoptimized images are the number one cause of slow page
                loads. By compressing your images before uploading them to your
                website, you improve Core Web Vitals scores, reduce bounce rates,
                and provide a better user experience on mobile devices with limited
                bandwidth.
              </p>
            </div>
          </motion.section>

          {/* Comparison Table */}
          <motion.section
            variants={fadeIn("up", 0.7)}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto mt-12 px-2"
          >
            <h2 className="text-2xl font-bold font-sora mb-6">
              Our Image Compressor vs Others
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-white/10 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-white/10 text-white">
                    <th className="px-5 py-3 font-semibold">Feature</th>
                    <th className="px-5 py-3 font-semibold text-accent">This Tool</th>
                    <th className="px-5 py-3 font-semibold">Other Compressors</th>
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
                    <td className="px-5 py-3 text-green-400">Completely free, no limits</td>
                    <td className="px-5 py-3">Free tier with limits / paid</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-5 py-3 font-medium text-white/80">Speed</td>
                    <td className="px-5 py-3 text-green-400">Instant, no upload wait</td>
                    <td className="px-5 py-3">Depends on upload/download speed</td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white/80">Batch Support</td>
                    <td className="px-5 py-3 text-green-400">Up to 20 images at once</td>
                    <td className="px-5 py-3">Often limited or paid</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-5 py-3 font-medium text-white/80">Account Required</td>
                    <td className="px-5 py-3 text-green-400">No sign-up needed</td>
                    <td className="px-5 py-3">Often requires registration</td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white/80">Resize Control</td>
                    <td className="px-5 py-3 text-green-400">Quality + max dimensions</td>
                    <td className="px-5 py-3">Basic quality only</td>
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
            className="max-w-4xl mx-auto mt-16 px-2 mb-16"
          >
            <h2 className="text-2xl font-bold font-sora mb-6">
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
      </main>
    </>
  );
};

export async function getStaticProps() {
  return { props: {} };
}

export default ImageCompressor;
