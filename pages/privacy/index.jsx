import { motion } from "framer-motion";
import Head from "next/head";

import { fadeIn } from "../../variants";

const sections = [
  {
    title: "1. Data We Collect",
    body: `When you submit the contact form on this website, we collect the following information you provide directly: your name, email address, subject line, and message content. No other personal data is collected automatically through this site.`,
  },
  {
    title: "2. How We Use Your Data",
    body: `The information you submit through the contact form is used solely to respond to your inquiry. We do not use your data for marketing, profiling, or any automated decision-making.`,
  },
  {
    title: "3. Data Storage and Retention",
    body: `Contact form submissions are delivered to a private email inbox and are not stored in any database on this website. Emails are retained only as long as necessary to address your inquiry and are deleted thereafter. No data is shared with third parties for commercial purposes.`,
  },
  {
    title: "4. Cookies",
    body: `This website does not use tracking cookies, advertising cookies, or analytics cookies. Functional cookies may be set by the hosting environment to maintain basic site operation; these do not identify you personally.`,
  },
  {
    title: "5. Third-Party Services",
    body: `Email delivery is handled through Google Gmail (SMTP). By submitting the contact form, your message is transmitted via Google's infrastructure. Google's own privacy policy applies to that transmission. No other third-party analytics or advertising services are embedded on this site.`,
  },
  {
    title: "6. Your GDPR Rights",
    body: `If you are located in the European Economic Area (EEA), you have the right to access, correct, or request deletion of any personal data we hold about you. You also have the right to object to or restrict processing, and the right to data portability. To exercise any of these rights, contact us at the address below. We will respond within 30 days.`,
  },
  {
    title: "7. Data Security",
    body: `We take reasonable technical measures to protect information transmitted through this site, including HTTPS encryption in transit. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "8. Changes to This Policy",
    body: `This privacy policy may be updated from time to time. Any changes will be reflected on this page with a revised effective date. Continued use of the site after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "9. Contact",
    body: `For any privacy-related questions or requests, please reach out to:\n\nVipul Kaushik\nvipulkaushik96@gmail.com`,
  },
];

const Privacy = () => {
  return (
    <div className="h-full bg-primary/30">
      <Head>
        <title>Privacy Policy | Vipul Kaushik</title>
        <meta
          name="description"
          content="Privacy policy for Vipul Kaushik's portfolio website. Learn how contact form data is collected, used, and protected."
        />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="container mx-auto py-32 xl:text-left flex items-start justify-center min-h-full">
        <div className="flex flex-col w-full max-w-[800px] px-4 xl:px-0">
          {/* heading */}
          <motion.h1
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-4"
          >
            Privacy <span className="text-accent">Policy</span>
          </motion.h1>

          {/* effective date */}
          <motion.p
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-center text-white/40 text-sm mb-12"
          >
            Effective date: March 15, 2026
          </motion.p>

          {/* intro */}
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-white/60 mb-10 leading-relaxed"
          >
            This privacy policy describes how Vipul Kaushik (&quot;I&quot;, &quot;me&quot;, or
            &quot;my&quot;) handles personal information collected through this portfolio
            website. I am committed to protecting your privacy and handling your
            data transparently.
          </motion.p>

          {/* policy sections */}
          {sections.map((section, i) => (
            <motion.div
              key={i}
              variants={fadeIn("up", 0.4 + i * 0.05)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-8"
            >
              <h2 className="text-white font-semibold text-lg mb-2">
                {section.title}
              </h2>
              <p className="text-white/60 leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
