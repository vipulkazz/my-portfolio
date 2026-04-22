import { motion } from "framer-motion";
import Head from "next/head";

import dynamic from "next/dynamic";
const ParticlesContainer = dynamic(() => import("../components/ParticlesContainer"), { ssr: false });
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";

import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="bg-primary/60 h-full">
      <Head>
        <title>Vipul Kaushik | Full-Stack Mobile Developer — React Native, Node.js, Expo</title>
        <meta name="description" content="Hire Vipul Kaushik — full-stack mobile developer with 8+ years building secure, scalable apps for SaaS, Fintech & HealthTech. React Native, Node.js, Expo expert." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://www.vipulkaushik.com/#webpage",
          "url": "https://www.vipulkaushik.com",
          "name": "Vipul Kaushik | Full-Stack Mobile Developer",
          "description": "Hire Vipul Kaushik — full-stack mobile developer with 8+ years building secure, scalable apps for SaaS, Fintech & HealthTech.",
          "isPartOf": { "@id": "https://www.vipulkaushik.com/#website" },
          "about": { "@id": "https://www.vipulkaushik.com/#person" },
          "inLanguage": "en-US"
        }) }} />
      </Head>
      {/* text */}
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="text-center flex flex-col justify-center pt-20 xl:pt-40 xl:text-left h-full container mx-auto">
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            React Native Developer <br /> for{" "}
            <span className="text-accent">Hire</span>
          </motion.h1>


          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
          I'm a full-stack engineer with 8+ years of experience building secure, scalable apps for SaaS, Fintech, and HealthTech companies worldwide. I help startups and growing teams launch MVPs, scale production platforms, and meet compliance needs like HIPAA and GDPR. Whether it's dashboards, KYC systems, or mobile apps — I deliver fast, reliable solutions users trust and investors value.
          </motion.p>


          <div className="flex justify-center xl:hidden relative">
            <ProjectsBtn />
          </div>
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex"
          >
            <ProjectsBtn />
          </motion.div>
        </div>
      </div>
      {/* image */}
      <div className="w-full xl:w-[1280px] h-full absolute right-[70px] xl:right-[80px] bottom-0">
        {/* bg img */}
        <div
          role="img"
          className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"
          aria-hidden
        />

        {/* particles */}
        <ParticlesContainer />

        {/* avatar */}
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full h-full max-w-[600px] max-h-[638px] absolute -bottom-32 lg:bottom-[-13%] lg:right-[2%] xl:right-[6%]"
        >
          <Avatar />
        </motion.div>
      </div>

      <section className="sr-only" aria-label="About Vipul Kaushik">
        <h2>Why Hire Vipul Kaushik as Your React Native Developer</h2>
        <p>Vipul Kaushik is a full-stack mobile developer and CTO at Rolling Around with over 8 years of experience building production-grade iOS and Android applications using React Native, Expo, Node.js, and modern JavaScript frameworks. He has delivered 150+ projects across SaaS, Fintech, HealthTech, eCommerce, and EdTech industries for clients worldwide.</p>

        <h3>Expertise and Technical Skills</h3>
        <p>Specializing in React Native CLI and Expo, Vipul builds cross-platform mobile applications with Redux, Zustand, and MobX for state management. His backend expertise includes Node.js, Express.js, NestJS, MongoDB, PostgreSQL, Firebase, Supabase, and GraphQL. He implements CI/CD pipelines using GitHub Actions, Fastlane, and Bitrise, and manages App Store and Google Play submissions.</p>

        <h3>Security and Compliance</h3>
        <p>Vipul has hands-on experience building HIPAA-compliant and GDPR-compliant mobile applications for HealthTech companies. He implements secure authentication with OAuth, JWT, and OTP systems, encrypted data storage, and audit-ready logging. His work on OpiRescue and other healthcare apps demonstrates real-world compliance delivery.</p>

        <h3>Featured Project Outcomes</h3>
        <ul>
          <li>Rolling Around — Built a bikepacking app with 10,000+ waypoints, established routes, community features, and a marketplace for cycling enthusiasts. React Native, NestJS, Expo.</li>
          <li>BatchLeads — Developed a real estate lead generation app used by thousands of property investors and agents across the US. React Native with complex map integrations.</li>
          <li>Penny Profit — Built a fintech investment tracking app with portfolio management, real-time market data, and profit analysis dashboards.</li>
          <li>Pipeline CRM — Contributed to a sales CRM platform helping businesses automate workflows, track leads, and close deals faster.</li>
          <li>Outlier — Worked on an online education platform making affordable college courses accessible to students worldwide.</li>
        </ul>

        <h3>How I Work</h3>
        <ol>
          <li>Discovery — Deep dive into your business goals, user needs, and technical requirements to define the right solution.</li>
          <li>Architecture — System design, tech stack selection, and sprint planning. Every decision documented and justified.</li>
          <li>Build and Ship — Agile development with weekly demos, continuous integration, and transparent communication throughout.</li>
          <li>Scale and Support — Post-launch monitoring, performance optimization, and ongoing support to keep your product thriving.</li>
        </ol>

        <h3>Industries Served</h3>
        <p>Vipul has built applications for startups and enterprises across HealthTech, Fintech, SaaS, eCommerce, EdTech, Real Estate, Food and Dining, Sports, Lifestyle, and Entertainment industries. His clients range from early-stage startups launching their first MVP to established companies scaling their mobile presence.</p>

        <h3>Availability</h3>
        <p>Vipul is currently available for freelance and contract React Native development projects. He works remotely with clients worldwide and offers flexible engagement models including hourly, fixed-price, and retainer arrangements. Contact him to discuss your project requirements.</p>
      </section>
    </div>
  );
};

export async function getStaticProps() {
  return { props: {} };
}

export default Home;
