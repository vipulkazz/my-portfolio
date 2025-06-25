import { motion } from "framer-motion";

import TestimonialSlider from "../../components/TestimonialSlider";
import { fadeIn } from "../../variants";

const Testimonials = () => {
  return (
    <div className="h-full bg-primary/30 py-32 sm:py-52 text-center">
      <div className="container mx-auto h-full flex flex-col justify-center">
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 mb-8 xl:mb-0"
        >
          What clients <span className="text-accent">say.</span>
        </motion.h2>

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
