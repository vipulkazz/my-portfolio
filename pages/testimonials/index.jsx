import { motion } from "framer-motion";
import Head from "next/head";

import dynamic from "next/dynamic";
const TestimonialSlider = dynamic(() => import("../../components/TestimonialSlider"), { ssr: false });
import { fadeIn } from "../../variants";

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://www.vipulkaushik.com/testimonials",
  "name": "Testimonials | Vipul Kaushik",
  "isPartOf": { "@id": "https://www.vipulkaushik.com/#website" },
  "mainEntity": {
    "@type": "Person",
    "@id": "https://www.vipulkaushik.com/#person",
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Client - Cross-platform Navigation App"
        },
        "datePublished": "2024-09-26",
        "reviewBody": "Vipul never missed a deadline and always found a solution, no matter the challenge. He was proactive, thorough, and consistently delivered high-quality work — even beyond the contract. Highly recommended if you're building your first app!",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Client - Product Design System"
        },
        "datePublished": "2025-01-14",
        "reviewBody": "Great experience! Delivered a high-quality design system for our React Native app with precision and speed.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Client - Full-Stack Mobile App"
        },
        "datePublished": "2025-05-12",
        "reviewBody": "Skilled, responsive, and quick to solve problems. Vipul handled both frontend and backend seamlessly. Would definitely work with him again.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Client - Mobile App Strategy"
        },
        "datePublished": "2025-06-10",
        "reviewBody": "Vipul and his team provided critical insight into our development strategy and solved complex bugs efficiently. We'll continue working with him for years to come.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Client - SDK Update"
        },
        "datePublished": "2024-02-07",
        "reviewBody": "Outstanding communication and flawless execution. Completed the task quickly and exactly as needed. AAA+++ experience!",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Client - AI App"
        },
        "datePublished": "2024-02-11",
        "reviewBody": "Excellent developer with great communication, strong analytic skills, and high attention to detail. Highly recommended.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ]
  },
  "inLanguage": "en-US"
};

const Testimonials = () => {
  return (
    <div className="h-full bg-primary/30 py-32 sm:py-52 text-center">
      <Head>
        <title>Testimonials | Vipul Kaushik — Client Reviews & Feedback</title>
        <meta name="description" content="Read what clients say about working with Vipul Kaushik. Trusted by startups and enterprises for React Native mobile development and full-stack engineering." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      </Head>
      <div className="container mx-auto h-full flex flex-col justify-center">
        <motion.h1
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 mb-8 xl:mb-0"
        >
          What clients <span className="text-accent">say.</span>
        </motion.h1>

        {/* slider */}
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <TestimonialSlider />
        </motion.div>

        {/* note */}
        <motion.p
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="hidden sm:block text-sm text-white/60 mt-8 max-w-md mx-auto"
        >
          You can find these testimonials and more on my{" "}
          <a
            href="https://www.upwork.com/freelancers/~013c387b6de11f412c"
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent hover:text-white transition-colors duration-300"
          >
            Upwork profile
          </a>
          .
        </motion.p>
      </div>
    </div>
  );
};

export default Testimonials;
