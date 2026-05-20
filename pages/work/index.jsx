import { motion } from "framer-motion";

import Head from "next/head";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import dynamic from "next/dynamic";
const WorkSlider = dynamic(() => import("../../components/WorkSlider"), { ssr: false });
import { fadeIn } from "../../variants";

const Work = () => {
  return (
    <div className="h-full bg-primary/30 py-36 flex items-center">
      <Head>
        <title>Portfolio | Vipul Kaushik — React Native Projects & Case Studies</title>
        <meta name="description" content="Explore Vipul Kaushik's portfolio of cross-platform mobile apps built with React Native for HealthTech, Fintech, eCommerce, and SaaS industries." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "url": "https://www.vipulkaushik.com/work",
          "name": "Portfolio | Vipul Kaushik",
          "description": "Cross-platform mobile applications built with React Native",
          "isPartOf": { "@id": "https://www.vipulkaushik.com/#website" },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "item": { "@type": "SoftwareApplication", "name": "Rolling Around", "applicationCategory": "MobileApplication", "operatingSystem": "iOS, Android", "url": "https://rollingaround.app" }},
              { "@type": "ListItem", "position": 2, "item": { "@type": "SoftwareApplication", "name": "Penny Profit", "applicationCategory": "MobileApplication", "operatingSystem": "iOS, Android", "url": "https://www.mypennyprofit.com/" }},
              { "@type": "ListItem", "position": 3, "item": { "@type": "WebApplication", "name": "Jardinette", "url": "https://app.jardinette.ca" }},
              { "@type": "ListItem", "position": 4, "item": { "@type": "MobileApplication", "name": "Passion TV", "url": "https://play.google.com/store/apps/details?id=com.passionpulse" }},
              { "@type": "ListItem", "position": 5, "item": { "@type": "WebApplication", "name": "Pipeline CRM", "url": "https://www.pipelinecrm.com" }},
              { "@type": "ListItem", "position": 6, "item": { "@type": "WebApplication", "name": "Nooora", "url": "https://nooora.ae" }},
              { "@type": "ListItem", "position": 7, "item": { "@type": "WebApplication", "name": "Chill Days", "url": "https://chilldays.com/" }},
              { "@type": "ListItem", "position": 8, "item": { "@type": "MobileApplication", "name": "AFA", "url": "https://www.afa.community/" }},
              { "@type": "ListItem", "position": 9, "item": { "@type": "MobileApplication", "name": "Pineapple", "url": "https://pineappleresources.com.my/" }},
              { "@type": "ListItem", "position": 10, "item": { "@type": "MobileApplication", "name": "Munchh", "url": "https://apps.apple.com/zm/app/munchh/id1192257941" }}
            ]
          }
        }) }} />
      </Head>
      <Circles />
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* text */}
          <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0">
            <motion.h1
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-12"
            >
              My work <span className="text-accent">.</span>
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0"
            >
              Explore my portfolio of cross-platform mobile applications built with React Native. Each project showcases innovative solutions for diverse industries, demonstrating scalable architecture and seamless user experiences.
            </motion.p>
          </div>

          {/* slider */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
          >
            <WorkSlider />
          </motion.div>
        </div>

        {/* Hidden crawlable content for SEO — slider uses ssr: false */}
        <section className="sr-only" aria-label="Portfolio projects list">
          <h2>Projects</h2>
          <ul>
            <li><a href="https://rollingaround.app" target="_blank" rel="noreferrer noopener">Rolling Around</a> — Bikepacking and cycling community app with 10,000+ waypoints, established routes, gear sharing, and a marketplace. Built with React Native, NestJS, and Expo for iOS and Android. Features include offline maps, GPX route imports, and social community features.</li>
            <li><a href="https://www.mypennyprofit.com/" target="_blank" rel="noreferrer noopener">Penny Profit</a> — Fintech investment tracking app for portfolio management and profit analysis. Built with React Native, featuring real-time market data, interactive charts, and smart financial insights for retail investors.</li>
            <li><a href="https://app.jardinette.ca" target="_blank" rel="noreferrer noopener">Jardinette</a> — Plant discovery platform built with Next.js, React, and TypeScript. Browse plant species, get personalized care tips, and connect with a community of plant enthusiasts. Full-stack web application with modern UI.</li>
            <li><a href="https://play.google.com/store/apps/details?id=com.passionpulse" target="_blank" rel="noreferrer noopener">Passion TV</a> — Short-form video streaming and reels platform built with React Native, Node.js, and MongoDB. Features personalized content feeds, social engagement, creator tools, and video optimization for mobile devices.</li>
            <li><a href="https://www.pipelinecrm.com" target="_blank" rel="noreferrer noopener">Pipeline CRM</a> — Sales CRM and pipeline management platform helping businesses automate sales workflows, track leads, and close deals faster. Built with React and Node.js with intelligent analytics and reporting.</li>
            <li><a href="https://nooora.ae" target="_blank" rel="noreferrer noopener">Nooora</a> — Cosmetics eCommerce storefront powered by Shopify with React and Next.js frontend. Product catalog, beauty guides, skincare routines, and seamless checkout experience for beauty lovers in the UAE.</li>
            <li><a href="https://chilldays.com/" target="_blank" rel="noreferrer noopener">Chill Days</a> — Lifestyle and leisure platform for discovering relaxing activities, events, and experiences. Built with React and Next.js, featuring location-based recommendations and seasonal activity guides.</li>
            <li><a href="https://www.afa.community/" target="_blank" rel="noreferrer noopener">AFA</a> — Sports community app for tracking matches, booking venues, earning rewards, and connecting with athletes. Built with React Native and Node.js for the Malaysian sports community.</li>
            <li><a href="https://pineappleresources.com.my/" target="_blank" rel="noreferrer noopener">Pineapple</a> — eCommerce mobile app with full product catalog, cart management, and seamless checkout. Built with React Native and Node.js for the Malaysian market with multi-language support.</li>
            <li><a href="https://apps.apple.com/zm/app/munchh/id1192257941" target="_blank" rel="noreferrer noopener">Munchh</a> — Restaurant discovery and food ordering app connecting users to local restaurants. Built with React Native and Node.js, featuring menu browsing, real-time order tracking, and delivery integration.</li>
          </ul>
        </section>
      </div>
      <Bulb />
    </div>
  );
};

export async function getStaticProps() {
  return { props: {} };
}

export default Work;
