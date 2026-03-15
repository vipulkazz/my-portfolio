import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

import { fadeIn } from "../variants";

const NotFound = () => {
  return (
    <div className="h-full bg-primary/30">
      <Head>
        <title>404 | Page Not Found — Vipul Kaushik</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="container mx-auto py-32 text-center flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <motion.span
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-[120px] md:text-[180px] font-extrabold leading-none text-accent"
          >
            404
          </motion.span>
          <motion.h1
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-white"
          >
            Page Not Found
          </motion.h1>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-white/60 max-w-md"
          >
            The page you are looking for doesn&apos;t exist or has been moved.
          </motion.p>
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <Link
              href="/"
              className="btn rounded-full border border-white/50 px-8 py-3 mt-4 inline-block transition-all duration-300 hover:border-accent hover:text-accent"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
