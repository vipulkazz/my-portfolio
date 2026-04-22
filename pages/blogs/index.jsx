import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { FaMedium } from "react-icons/fa";

import Head from "next/head";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";
import { blogPosts } from "../../data/blogs";

const blogsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "url": "https://www.vipulkaushik.com/blogs",
  "name": "Blog | Vipul Kaushik",
  "description": "Technical articles on React Native, app variants, speech-to-text, and mobile development best practices by Vipul Kaushik.",
  "isPartOf": { "@id": "https://www.vipulkaushik.com/#website" },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": blogPosts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "url": `https://www.vipulkaushik.com/blogs/${post.slug}`,
        "author": { "@id": "https://www.vipulkaushik.com/#person" },
        "datePublished": post.date,
        "publisher": { "@id": "https://www.vipulkaushik.com/#person" },
        "inLanguage": "en-US"
      }
    }))
  },
  "inLanguage": "en-US"
};

const Blogs = () => {
  return (
    <div className="h-full bg-primary/30 py-20 sm:py-36 flex items-center">
      <Head>
        <title>Blog | Vipul Kaushik — React Native Tutorials & Mobile Dev Insights</title>
        <meta name="description" content="Technical articles on React Native, app variants, speech-to-text, and mobile development best practices by Vipul Kaushik." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogsSchema) }}
        />
      </Head>
      <Circles />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col xl:flex-row gap-y-8 xl:gap-x-8">
          {/* text */}
          <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0">
            <motion.h1
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-12"
            >
              My <span className="text-accent">Blog</span> Posts
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0 hidden sm:block"
            >
              Sharing knowledge and insights from my journey in mobile development.
              Explore my technical articles on React Native, app development, and emerging technologies.
            </motion.p>
          </div>

          {/* blog cards */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
          >
            <div className="flex flex-col gap-4 sm:gap-6">
              {blogPosts.map((blog, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", 0.2 + index * 0.1)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-4">
                    <span className="text-accent text-xs sm:text-sm font-medium bg-accent/10 px-2 sm:px-3 py-1 rounded-full w-fit">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                      <span>{blog.readTime}</span>
                      <span>•</span>
                      <span>{blog.date}</span>
                    </div>
                  </div>

                  <Link href={`/blogs/${blog.slug}`}>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300 leading-tight cursor-pointer">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-white/70 mb-4 leading-relaxed text-sm sm:text-base">
                    {blog.description}
                  </p>

                  {/* Article Sections */}
                  <div className="mb-4">
                    <h4 className="text-white/80 text-sm font-medium mb-2">Article Sections:</h4>
                    <div className="flex flex-wrap gap-2">
                      {blog.sections.slice(0, 4).map((section, sectionIndex) => (
                        <span
                          key={sectionIndex}
                          className="text-xs bg-white/10 text-white/70 px-3 py-1 rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300 cursor-default"
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors duration-300 group/link text-sm sm:text-base"
                    >
                      <span className="font-medium">Read Article</span>
                      <BsArrowRight className="text-xs sm:text-sm group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                    {blog.mediumLink && (
                      <a
                        href={blog.mediumLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                      >
                        <FaMedium className="text-base sm:text-lg" />
                        <span className="font-medium">Read on Medium</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Blogs;