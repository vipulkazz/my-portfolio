import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { FaMedium } from "react-icons/fa";

import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";
import { blogPosts, getBlogBySlug } from "../../data/blogs";

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = getBlogBySlug(params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}

const BlogPost = ({ post }) => {
  const faqSchema = post.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `https://www.vipulkaushik.com/blogs/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Vipul Kaushik",
      url: "https://www.vipulkaushik.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Vipul Kaushik",
      url: "https://www.vipulkaushik.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.vipulkaushik.com/SubjectOne.png",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-US",
  };

  return (
    <div className="h-full bg-primary/30 py-20 sm:py-36">
      <Head>
        <title>{post.title} | Vipul Kaushik</title>
        <meta name="description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta
          property="og:url"
          content={`https://www.vipulkaushik.com/blogs/${post.slug}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogPostingSchema),
          }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema),
            }}
          />
        )}
      </Head>

      <Circles />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-[800px] mx-auto">
          {/* Back link */}
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors duration-300 mb-8"
            >
              <BsArrowLeft className="text-lg" />
              <span className="font-medium">Back to Blog</span>
            </Link>
          </motion.div>

          {/* Category, date, read time */}
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="text-accent text-xs sm:text-sm font-medium bg-accent/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-white/60 text-xs sm:text-sm">
              {post.date}
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/60 text-xs sm:text-sm">
              {post.readTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Author byline */}
          <motion.p
            variants={fadeIn("up", 0.45)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-white/60 text-sm mb-8"
          >
            By{" "}
            <Link href="/about" className="text-accent hover:text-white transition-colors duration-300">
              Vipul Kaushik
            </Link>
          </motion.p>

          {/* Article body */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-12"
          >
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>

          {/* Medium link */}
          {post.mediumLink && (
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="border-t border-white/10 pt-6"
            >
              <a
                href={post.mediumLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors duration-300"
              >
                <FaMedium className="text-xl" />
                <span className="font-medium">Also available on Medium</span>
              </a>
            </motion.div>
          )}

          {/* Author bio */}
          <motion.div
            variants={fadeIn("up", 0.7)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="border-t border-white/10 pt-6 mt-6"
          >
            <p className="text-white/60 text-sm leading-relaxed">
              Written by{" "}
              <span className="text-white font-medium">Vipul Kaushik</span>
              {" "}&mdash; CTO at Rolling Around, 8+ years building React Native apps.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-3 text-accent hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              Hire me &rarr;
            </Link>
          </motion.div>

          {/* FAQ section */}
          {post.faq && (
            <motion.div
              variants={fadeIn("up", 0.75)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="border-t border-white/10 pt-6 mt-6"
            >
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <dl className="space-y-6">
                {post.faq.map((item, index) => (
                  <div key={index}>
                    <dt className="text-white font-medium mb-2">{item.question}</dt>
                    <dd className="text-white/60 text-sm leading-relaxed">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}

          {/* Free Developer Tools */}
          <div className="mt-8 border-t border-white/10 pt-8">
            <h3 className="text-lg font-semibold mb-4">Free Developer Tools</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: "JSON Formatter", path: "/tools/json-formatter" },
                { name: "Image Compressor", path: "/tools/image-compressor" },
                { name: "HEIC to JPG", path: "/tools/heic-to-jpg" },
                { name: "PDF Merger", path: "/tools/merge-pdf" },
                { name: "Word Counter", path: "/tools/word-counter" },
              ].map((tool, i) => (
                <Link key={i} href={tool.path} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/60 hover:text-accent hover:border-accent/50 transition-colors">
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
