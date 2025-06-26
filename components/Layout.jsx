import { Sora } from "next/font/google";
import Head from "next/head";

import Header from "../components/Header";
import Nav from "../components/Nav";
import TopLeftImg from "../components/TopLeftImg";

// setup font
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const Layout = ({ children }) => {
  return (
    <main
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      {/* metadata */}
      <Head>
        <title>Vipul Kaushik | Portfolio</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta
          name="description"
          content="Vipul Kaushik is a Full-stack mobile developer with 8+ years of experience."
        />
        <meta
          name="keywords"
          content="React Native, Expo & Bare Workflow Projects, Redux, REST API & GraphQL Integration"
        />
        <meta name="author" content="Vipul kaushik" />
        <meta name="theme-color" content="#f13024" />
        
        {/* Open Graph meta tags for rich previews */}
        <meta property="og:title" content="Vipul Kaushik" />
        <meta property="og:description" content="Entrepreneur, technologist, and builder. Passionate about solving real-world problems with engineering and design." />
        <meta property="og:url" content="https://www.vipulkaushik.com" />
        <meta property="og:image" content="https://www.vipulkaushik.com/SubjectOne.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vipul Kaushik" />
        
        {/* Additional meta tags for better social sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vipul Kaushik" />
        <meta name="twitter:description" content="Entrepreneur, technologist, and builder. Passionate about solving real-world problems with engineering and design." />
        <meta name="twitter:image" content="https://www.vipulkaushik.com/SubjectOne.png" />
        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Head>

      <TopLeftImg />
      <Nav />
      <Header />

      {/* main content */}
      {children}
    </main>
  );
};

export default Layout;
