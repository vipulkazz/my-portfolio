import { motion } from "framer-motion";

import Head from "next/head";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import dynamic from "next/dynamic";
const ServiceSlider = dynamic(() => import("../../components/ServiceSlider"), { ssr: false });
import { fadeIn } from "../../variants";

export const serviceData = [];

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://www.vipulkaushik.com/services",
  "name": "Services | Vipul Kaushik",
  "isPartOf": { "@id": "https://www.vipulkaushik.com/#website" },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Cross-Platform Development",
          "description": "Build native iOS & Android apps with React Native (CLI & Expo), TypeScript, and modern state management (Redux, Zustand).",
          "provider": { "@id": "https://www.vipulkaushik.com/#person" }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Backend & API Integration",
          "description": "Node.js, Express.js, Firebase, PostgreSQL, MongoDB, REST APIs, GraphQL, and Supabase integration.",
          "provider": { "@id": "https://www.vipulkaushik.com/#person" }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "Payment Systems",
          "description": "Stripe subscriptions, PayPal, Razorpay, in-app purchases, and secure payment gateway integration.",
          "provider": { "@id": "https://www.vipulkaushik.com/#person" }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": "Security & Compliance",
          "description": "GDPR/HIPAA compliance, secure authentication, OAuth, JWT, OTP systems, and data protection.",
          "provider": { "@id": "https://www.vipulkaushik.com/#person" }
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Service",
          "name": "Location Services",
          "description": "Google Maps, Mapbox integration, location tracking, and geolocation features for mobile apps.",
          "provider": { "@id": "https://www.vipulkaushik.com/#person" }
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Service",
          "name": "Push Notifications",
          "description": "Expo notifications, Firebase Cloud Messaging (FCM), OneSignal integration for real-time updates.",
          "provider": { "@id": "https://www.vipulkaushik.com/#person" }
        }
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "Service",
          "name": "App Store Deployment",
          "description": "iOS App Store & Google Play Store submission, Fastlane automation, and store optimization.",
          "provider": { "@id": "https://www.vipulkaushik.com/#person" }
        }
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "Service",
          "name": "Cloud & DevOps",
          "description": "CI/CD with Fastlane, Bitrise, GitHub Actions, Docker, and cloud infrastructure management.",
          "provider": { "@id": "https://www.vipulkaushik.com/#person" }
        }
      },
      {
        "@type": "ListItem",
        "position": 9,
        "item": {
          "@type": "Service",
          "name": "Testing & Debugging",
          "description": "Jest, Detox, React Testing Library, Flipper, Reactotron for comprehensive testing and debugging.",
          "provider": { "@id": "https://www.vipulkaushik.com/#person" }
        }
      },
      {
        "@type": "ListItem",
        "position": 10,
        "item": {
          "@type": "Service",
          "name": "SaaS & Analytics",
          "description": "Multi-tenant SaaS dashboards, real-time analytics, KYC systems, and business intelligence features.",
          "provider": { "@id": "https://www.vipulkaushik.com/#person" }
        }
      }
    ]
  },
  "inLanguage": "en-US"
};

const Services = () => {
  return (
    <div className="h-full bg-primary/30 py-36 flex items-center">
      <Head>
        <title>Services | Vipul Kaushik — Mobile & Backend Development</title>
        <meta name="description" content="React Native app development, backend APIs, CI/CD pipelines, and more. Vipul Kaushik offers full-stack mobile development services for startups and enterprises." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
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
              className="h2 xl:mt-8"
            >
              My services <span className="text-accent">.</span>
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0"
            >
              I'm a React Native Developer with 8+ years of experience building fast, secure, and scalable iOS & Android apps for SaaS, Fintech, HealthTech, and eCommerce companies.
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
            <ServiceSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Services;
