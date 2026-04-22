import { useState, useCallback, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Circles from "../../components/Circles";
import Bulb from "../../components/Bulb";

const SITE_URL = "https://www.vipulkaushik.com";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Convert HEIC to JPG Online",
  description:
    "Convert HEIC images to JPG or PNG format directly in your browser with no software installation required.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload HEIC Files",
      text: "Drag and drop your HEIC files into the converter or click to browse and select files from your device.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose Output Format",
      text: "Select JPG or PNG as your desired output format and adjust the quality slider if needed.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Convert",
      text: "Click the Convert button. All processing happens instantly in your browser — no upload required.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download",
      text: "Download your converted files individually or as a ZIP archive for batch conversions.",
    },
  ],
};

const relatedTools = [
  {
    title: "Image Compressor",
    description:
      "Reduce image file sizes up to 90% without losing quality. Supports JPG, PNG, and WebP.",
    path: "/tools/image-compressor",
    icon: "\uD83D\uDCE6",
  },
  {
    title: "JSON Formatter",
    description:
      "Format, validate, and minify JSON data with syntax highlighting. Perfect for developers.",
    path: "/tools/json-formatter",
    icon: "{ }",
  },
  {
    title: "PDF Merger",
    description:
      "Combine multiple PDF files into one. Drag to reorder, then merge — all in your browser.",
    path: "/tools/merge-pdf",
    icon: "\uD83D\uDCC4",
  },
  {
    title: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs. Includes reading time and keyword density.",
    path: "/tools/word-counter",
    icon: "\uD83D\uDD22",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free HEIC to JPG Converter",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any (Browser-based)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Convert HEIC images to JPG or PNG format directly in your browser. No uploads, no server processing — your files never leave your device.",
  url: `${SITE_URL}/tools/heic-to-jpg`,
  author: { "@type": "Person", name: "Vipul Kaushik", url: SITE_URL },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a HEIC file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HEIC (High Efficiency Image Container) is an image format adopted by Apple starting with iOS 11. It uses the HEVC (H.265) codec to store images at roughly half the file size of JPEG while maintaining the same visual quality. Because it is not universally supported, many users need to convert HEIC files to JPG or PNG for compatibility.",
      },
    },
    {
      "@type": "Question",
      name: "Is this HEIC converter safe to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This converter runs entirely in your web browser using client-side JavaScript. Your images are never uploaded to any server — all processing happens locally on your device, ensuring complete privacy.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert multiple HEIC files at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This tool supports batch conversion. You can drag and drop or select multiple HEIC files simultaneously, and they will all be converted in parallel. You can then download them individually or as a single ZIP archive.",
      },
    },
    {
      "@type": "Question",
      name: "Does converting HEIC to JPG reduce image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the quality setting you choose. At the default 92% quality, the difference is virtually imperceptible. You can adjust the quality slider from 10% to 100% to balance file size and image fidelity. Choosing PNG as the output format produces a lossless result with no quality loss at all.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert HEIC to JPG on iPhone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Open this tool in Safari or any browser on your iPhone, select your HEIC photos, and convert them to JPG directly on your device. No app installation is needed. Alternatively, you can change your iPhone camera settings to shoot in JPG by going to Settings > Camera > Formats > Most Compatible.",
      },
    },
    {
      "@type": "Question",
      name: "Is HEIC better than JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HEIC offers better compression than JPG, producing files roughly half the size at the same visual quality. It also supports features like transparency, 16-bit color depth, and multiple images in one file. However, JPG has universal compatibility across all devices, browsers, and platforms, which is why conversion is often necessary.",
      },
    },
    {
      "@type": "Question",
      name: "How to open HEIC files on Windows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Windows 10 and 11 can open HEIC files if you install the HEIF Image Extensions and HEVC Video Extensions from the Microsoft Store. Alternatively, you can use this free online converter to convert HEIC to JPG without installing any software — just open the page in your browser and convert instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Why are my iPhone photos HEIC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starting with iOS 11, Apple set HEIC as the default photo format because it produces significantly smaller files than JPG while maintaining the same image quality. This saves storage space on your device. You can change this in Settings > Camera > Formats, choosing 'Most Compatible' to shoot in JPG instead.",
      },
    },
  ],
};

export default function HeicToJpgPage() {
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(0.92);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef(null);
  const heic2anyRef = useRef(null);

  const loadHeic2any = useCallback(async () => {
    if (!heic2anyRef.current) {
      const mod = await import("heic2any");
      heic2anyRef.current = mod.default || mod;
    }
    return heic2anyRef.current;
  }, []);

  const addFiles = useCallback((newFiles) => {
    const heicFiles = Array.from(newFiles).filter((f) => {
      const name = f.name.toLowerCase();
      return (
        name.endsWith(".heic") ||
        name.endsWith(".heif") ||
        f.type === "image/heic" ||
        f.type === "image/heif"
      );
    });
    if (heicFiles.length === 0) return;
    setFiles((prev) => [
      ...prev,
      ...heicFiles.map((f) => ({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        file: f,
        name: f.name,
        status: "pending",
        progress: 0,
        converted: null,
        thumbnail: null,
        error: null,
      })),
    ]);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
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

  const convertAll = useCallback(async () => {
    const pending = files.filter((f) => f.status === "pending");
    if (pending.length === 0) return;

    setIsConverting(true);
    const heic2any = await loadHeic2any();

    for (const item of pending) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id ? { ...f, status: "converting", progress: 30 } : f
        )
      );

      try {
        const blob = await heic2any({
          blob: item.file,
          toType: format,
          quality: format === "image/jpeg" ? quality : undefined,
        });

        const resultBlob = Array.isArray(blob) ? blob[0] : blob;
        const url = URL.createObjectURL(resultBlob);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? {
                  ...f,
                  status: "done",
                  progress: 100,
                  converted: resultBlob,
                  thumbnail: url,
                }
              : f
          )
        );
      } catch (err) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? {
                  ...f,
                  status: "error",
                  progress: 0,
                  error: err.message || "Conversion failed",
                }
              : f
          )
        );
      }
    }
    setIsConverting(false);
  }, [files, format, quality, loadHeic2any]);

  const downloadOne = useCallback(
    (item) => {
      if (!item.converted) return;
      const ext = format === "image/png" ? "png" : "jpg";
      const baseName = item.name.replace(/\.(heic|heif)$/i, "");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(item.converted);
      a.download = `${baseName}.${ext}`;
      a.click();
      URL.revokeObjectURL(a.href);
    },
    [format]
  );

  const downloadAll = useCallback(async () => {
    const done = files.filter((f) => f.status === "done" && f.converted);
    if (done.length === 0) return;

    if (done.length === 1) {
      downloadOne(done[0]);
      return;
    }

    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    const ext = format === "image/png" ? "png" : "jpg";

    done.forEach((item) => {
      const baseName = item.name.replace(/\.(heic|heif)$/i, "");
      zip.file(`${baseName}.${ext}`, item.converted);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "converted-images.zip";
    a.click();
    URL.revokeObjectURL(a.href);
  }, [files, format, downloadOne]);

  const removeFile = useCallback((id) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item?.thumbnail) URL.revokeObjectURL(item.thumbnail);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    files.forEach((f) => {
      if (f.thumbnail) URL.revokeObjectURL(f.thumbnail);
    });
    setFiles([]);
  }, [files]);

  const doneCount = files.filter((f) => f.status === "done").length;
  const pendingCount = files.filter((f) => f.status === "pending").length;

  return (
    <>
      <Head>
        <title>
          Free HEIC to JPG Converter Online | No Upload Required — Vipul
          Kaushik
        </title>
        <meta
          name="description"
          content="Convert HEIC to JPG or PNG free online. No file uploads — all conversion happens in your browser. Batch convert Apple HEIC photos instantly with privacy guaranteed."
        />
        <meta
          name="keywords"
          content="heic to jpg, heic to png, convert heic online free, heic converter, apple photos converter"
        />
        <link rel="canonical" href={`${SITE_URL}/tools/heic-to-jpg`} />
        <meta
          property="og:title"
          content="Free HEIC to JPG Converter Online | No Upload Required"
        />
        <meta
          property="og:description"
          content="Convert HEIC to JPG or PNG free online. No uploads, complete privacy. Batch convert Apple HEIC photos instantly."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/tools/heic-to-jpg`} />
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
        {/* Decorative */}
        <Circles />
        <Bulb />

        <div className="container mx-auto px-4 sm:px-6 relative z-20">
          {/* Header */}
          <motion.section
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold font-sora mb-4">
              Free <span className="text-accent">HEIC to JPG</span> Converter
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
              Convert Apple HEIC photos to JPG or PNG instantly. Everything runs
              in your browser — your files never leave your device.
            </p>
          </motion.section>

          {/* Privacy badge */}
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full px-4 py-2 text-xs sm:text-sm">
              <svg
                className="w-4 h-4 flex-shrink-0"
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
              Your files never leave your device — 100% private
            </div>
          </motion.div>

          {/* Tool Card */}
          <motion.section
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-8">
              {/* Controls row */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Format selector */}
                <div className="flex-1">
                  <label
                    htmlFor="format-select"
                    className="block text-xs text-white/50 mb-1"
                  >
                    Output Format
                  </label>
                  <select
                    id="format-select"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                  >
                    <option value="image/jpeg">JPG</option>
                    <option value="image/png">PNG</option>
                  </select>
                </div>

                {/* Quality slider */}
                {format === "image/jpeg" && (
                  <div className="flex-1">
                    <label
                      htmlFor="quality-slider"
                      className="block text-xs text-white/50 mb-1"
                    >
                      Quality: {Math.round(quality * 100)}%
                    </label>
                    <input
                      id="quality-slider"
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.01"
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full accent-accent"
                    />
                  </div>
                )}
              </div>

              {/* Drop zone */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Drop HEIC files here or click to browse"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    fileInputRef.current?.click();
                }}
                className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? "border-accent bg-accent/10 scale-[1.01]"
                    : "border-white/20 hover:border-accent/50 hover:bg-white/5"
                }`}
              >
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-white/30"
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
                <p className="text-white/60 text-sm sm:text-base mb-1">
                  Drag &amp; drop HEIC files here
                </p>
                <p className="text-white/30 text-xs">
                  or click to browse &bull; .heic and .heif supported
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".heic,.heif,image/heic,image/heif"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-white/50">
                      {files.length} file{files.length !== 1 && "s"} &bull;{" "}
                      {doneCount} converted
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={clearAll}
                        className="text-xs text-white/40 hover:text-white transition px-2 py-1"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
                    {files.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/5 border border-white/10 rounded-lg p-3 flex gap-3 items-center"
                      >
                        {/* Thumbnail or placeholder */}
                        <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 bg-white/10 flex items-center justify-center">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={`Converted ${item.name}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg
                              className="w-6 h-6 text-white/20"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white/80 truncate">
                            {item.name}
                          </p>

                          {item.status === "converting" && (
                            <div className="mt-1.5">
                              <div className="w-full bg-white/10 rounded-full h-1.5">
                                <div
                                  className="bg-accent h-1.5 rounded-full transition-all duration-500 animate-pulse"
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                              <p className="text-[10px] text-accent mt-0.5">
                                Converting...
                              </p>
                            </div>
                          )}

                          {item.status === "done" && (
                            <p className="text-[10px] text-green-400 mt-1">
                              Converted successfully
                            </p>
                          )}

                          {item.status === "error" && (
                            <p className="text-[10px] text-red-400 mt-1">
                              {item.error}
                            </p>
                          )}

                          {item.status === "pending" && (
                            <p className="text-[10px] text-white/30 mt-1">
                              Waiting...
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 flex-shrink-0">
                          {item.status === "done" && (
                            <button
                              onClick={() => downloadOne(item)}
                              aria-label={`Download ${item.name}`}
                              className="p-1.5 bg-accent/20 hover:bg-accent/40 text-accent rounded-md transition text-xs"
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
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => removeFile(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="p-1.5 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 rounded-md transition text-xs"
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
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-5">
                    {pendingCount > 0 && (
                      <button
                        onClick={convertAll}
                        disabled={isConverting}
                        className="flex-1 bg-accent hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition text-sm flex items-center justify-center gap-2"
                      >
                        {isConverting ? (
                          <>
                            <svg
                              className="w-4 h-4 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="opacity-25"
                              />
                              <path
                                d="M4 12a8 8 0 018-8"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                            </svg>
                            Converting...
                          </>
                        ) : (
                          <>
                            Convert {pendingCount} File
                            {pendingCount !== 1 && "s"}
                          </>
                        )}
                      </button>
                    )}

                    {doneCount > 0 && (
                      <button
                        onClick={downloadAll}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition text-sm flex items-center justify-center gap-2"
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download All{doneCount > 1 ? " as ZIP" : ""}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.section>

          {/* SEO Content */}
          <motion.section
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto mt-16"
          >
            <article className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold font-sora mb-4 text-white">
                What Is HEIC and Why Convert It?
              </h2>
              <div className="text-white/60 text-sm leading-relaxed space-y-4">
                <p>
                  HEIC (High Efficiency Image Container) is a modern image
                  format introduced by Apple with iOS 11 in 2017. It uses the
                  HEVC (H.265) video codec to compress still images, achieving
                  roughly 50% smaller file sizes compared to JPEG at equivalent
                  visual quality. When you take a photo on an iPhone or iPad, it
                  is saved in HEIC format by default.
                </p>
                <p>
                  While HEIC offers excellent compression, it is not universally
                  supported. Windows applications, many web platforms, older
                  image editors, and most social media upload forms still expect
                  JPEG or PNG files. This creates friction when you want to share
                  or edit your iPhone photos on non-Apple devices.
                </p>
                <p>
                  This free converter solves that problem instantly. Unlike cloud
                  based converters that require you to upload your personal
                  photos to a remote server, this tool processes everything
                  locally in your browser using JavaScript. Your images are never
                  transmitted over the internet, making it the most
                  privacy-friendly option available. Simply drop your HEIC files,
                  choose JPG or PNG, adjust the quality if needed, and download
                  the converted images. Batch conversion is fully supported — you
                  can convert dozens of photos at once and download them all as a
                  ZIP archive.
                </p>
              </div>
            </article>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto mt-12 mb-8"
          >
            <h2 className="text-2xl font-bold font-sora mb-6 text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white/5 border border-white/10 rounded-lg"
                >
                  <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-white/90 flex items-center justify-between list-none">
                    <h3 className="font-sora text-sm pr-4">{faq.name}</h3>
                    <svg
                      className="w-4 h-4 text-white/30 flex-shrink-0 transition-transform group-open:rotate-180"
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
                  </summary>
                  <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed">
                    {faq.acceptedAnswer.text}
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
            className="max-w-4xl mx-auto mt-12"
          >
            <article className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold font-sora mb-4 text-white">
                Convert HEIC to JPG Without Software
              </h2>
              <div className="text-white/60 text-sm leading-relaxed space-y-4">
                <p>
                  Looking for a way to convert HEIC to JPG without software
                  installation? This free HEIC converter online works entirely in
                  your browser, meaning there is nothing to download or install.
                  Whether you are on Windows, Mac, Linux, or even a mobile device,
                  simply open this page and start converting. It is the fastest way
                  to get your iPhone photos into a universally compatible format.
                </p>
                <p>
                  Unlike other converters that require you to upload files to a
                  server, this HEIC to JPG converter uses no upload at all. Your
                  images are processed locally using JavaScript, which means your
                  photos never leave your device. This makes it an ideal free HEIC
                  converter online for anyone concerned about privacy, whether you
                  are converting personal vacation photos or confidential work
                  images.
                </p>
                <p>
                  The tool supports batch conversion, so you can convert dozens of
                  HEIC files at once and download them all as a ZIP archive. Adjust
                  the quality slider to find the perfect balance between file size
                  and image clarity. Whether you need to share photos via email,
                  upload them to a website that does not support HEIC, or simply
                  want universal compatibility, this converter handles it all
                  instantly.
                </p>
              </div>
            </article>
          </motion.section>

          {/* Comparison Table */}
          <motion.section
            variants={fadeIn("up", 0.7)}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto mt-12"
          >
            <h2 className="text-2xl font-bold font-sora mb-6 text-white">
              Our HEIC Converter vs Others
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-white/10 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-white/10 text-white">
                    <th className="px-5 py-3 font-semibold">Feature</th>
                    <th className="px-5 py-3 font-semibold text-accent">This Tool</th>
                    <th className="px-5 py-3 font-semibold">Other Converters</th>
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
                    <td className="px-5 py-3 text-green-400">Completely free</td>
                    <td className="px-5 py-3">Free tier with limits / paid plans</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-5 py-3 font-medium text-white/80">Speed</td>
                    <td className="px-5 py-3 text-green-400">Instant, no upload wait</td>
                    <td className="px-5 py-3">Depends on upload speed</td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white/80">File Limits</td>
                    <td className="px-5 py-3 text-green-400">No limits</td>
                    <td className="px-5 py-3">File size and count limits</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-5 py-3 font-medium text-white/80">Account Required</td>
                    <td className="px-5 py-3 text-green-400">No sign-up needed</td>
                    <td className="px-5 py-3">Often requires registration</td>
                  </tr>
                  <tr className="border-t border-white/5 bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white/80">Batch Conversion</td>
                    <td className="px-5 py-3 text-green-400">Unlimited batch with ZIP download</td>
                    <td className="px-5 py-3">Limited or paid feature</td>
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
            className="max-w-4xl mx-auto mt-16 mb-8"
          >
            <h2 className="text-2xl font-bold font-sora mb-6 text-white">
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
      </main>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
