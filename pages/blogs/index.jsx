import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { FaMedium } from "react-icons/fa";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

const blogData = [
  {
    title: "Mobile Application App Variants with Different Splash Screens and App Icons — React Native",
    description: "Learn how to create multiple app variants with different splash screens and app icons for React Native applications. This comprehensive guide covers the setup process and implementation details.",
    link: "https://medium.com/@vipulkaushik96/mobile-application-app-variants-with-different-splash-screens-and-app-icons-react-native-965ae6939e7d",
    readTime: "5 min read",
    category: "React Native",
    date: "2024"
  },
  {
    title: "Build a Speech-to-Text React Native App with Whisper RN",
    description: "Create a powerful speech-to-text application using React Native and Whisper RN. This tutorial covers the complete implementation from setup to deployment.",
    link: "https://medium.com/@vipulkaushik96/build-a-speech-to-text-react-native-app-with-whisper-rn-364439770728",
    readTime: "8 min read",
    category: "React Native",
    date: "2024"
  }
];

const Blogs = () => {
  return (
    <div className="h-full bg-primary/30 py-32 text-center xl:text-left">
      <Circles />
      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">
        {/* text */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            My <span className="text-accent">Blog</span> Posts
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
          >
            Sharing knowledge and insights from my journey in mobile development. 
            Explore my technical articles on React Native, app development, and emerging technologies.
          </motion.p>
        </div>

        {/* blog cards */}
        <motion.div
          variants={fadeIn("left", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex-1 flex flex-col gap-6 w-full max-w-[600px]"
        >
          {blogData.map((blog, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", 0.2 + index * 0.1)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-accent text-sm font-medium bg-accent/10 px-3 py-1 rounded-full">
                  {blog.category}
                </span>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <span>{blog.readTime}</span>
                  <span>•</span>
                  <span>{blog.date}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                {blog.title}
              </h3>
              
              <p className="text-white/70 mb-4 leading-relaxed">
                {blog.description}
              </p>
              
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors duration-300 group/link"
              >
                <FaMedium className="text-lg" />
                <span className="font-medium">Read on Medium</span>
                <BsArrowRight className="text-sm group-hover/link:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Bulb />
    </div>
  );
};

export default Blogs; 