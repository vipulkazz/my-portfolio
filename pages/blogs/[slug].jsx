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
      "@type": "Person",
      name: "Vipul Kaushik",
      url: "https://www.vipulkaushik.com",
    },
    datePublished: "2024-01-01",
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
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Article body */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-12 overflow-y-auto max-h-[60vh] sm:max-h-[65vh] pr-2"
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
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
