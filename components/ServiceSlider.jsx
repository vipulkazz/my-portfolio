import {
  RxMobile,
  RxDesktop,
  RxRocket,
  RxArrowTopRight,
  RxCode,
  RxDatabase,
  RxGlobe,
  RxShield,
  RxGear,
  RxLayers,
} from "react-icons/rx";
import { 
  FaMobile, 
  FaServer, 
  FaCreditCard, 
  FaCloud, 
  FaTools,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaBell,
  FaStore,
  FaChartLine
} from "react-icons/fa";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const serviceData = [
  {
    Icon: FaMobile,
    title: "Cross-Platform Development",
    description: "Build native iOS & Android apps with React Native (CLI & Expo), TypeScript, and modern state management (Redux, Zustand).",
  },
  {
    Icon: FaServer,
    title: "Backend & API Integration",
    description: "Node.js, Express.js, Firebase, PostgreSQL, MongoDB, REST APIs, GraphQL, and Supabase integration.",
  },
  {
    Icon: FaCreditCard,
    title: "Payment Systems",
    description: "Stripe subscriptions, PayPal, Razorpay, in-app purchases, and secure payment gateway integration.",
  },
  {
    Icon: FaShieldAlt,
    title: "Security & Compliance",
    description: "GDPR/HIPAA compliance, secure authentication, OAuth, JWT, OTP systems, and data protection.",
  },
  {
    Icon: FaMapMarkedAlt,
    title: "Location Services",
    description: "Google Maps, Mapbox integration, location tracking, and geolocation features for mobile apps.",
  },
  {
    Icon: FaBell,
    title: "Push Notifications",
    description: "Expo notifications, Firebase Cloud Messaging (FCM), OneSignal integration for real-time updates.",
  },
  {
    Icon: FaStore,
    title: "App Store Deployment",
    description: "iOS App Store & Google Play Store submission, Fastlane automation, and store optimization.",
  },
  {
    Icon: FaCloud,
    title: "Cloud & DevOps",
    description: "CI/CD with Fastlane, Bitrise, GitHub Actions, Docker, and cloud infrastructure management.",
  },
  {
    Icon: FaTools,
    title: "Testing & Debugging",
    description: "Jest, Detox, React Testing Library, Flipper, Reactotron for comprehensive testing and debugging.",
  },
  {
    Icon: FaChartLine,
    title: "SaaS & Analytics",
    description: "Multi-tenant SaaS dashboards, real-time analytics, KYC systems, and business intelligence features.",
  },
];

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      freeMode
      className="h-[280px] sm:h-[400px]"
    >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="bg-[rgba(65,47,123,0.15)] h-[200px] sm:h-[320px] rounded-lg px-6 py-8 flex flex-col group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
            {/* icon */}
            <div className="text-4xl text-accent mb-4">
              <item.Icon aria-hidden />
            </div>

            {/* title & description */}
            <div className="flex-1 flex flex-col">
              <div className="mb-2 text-lg font-semibold">{item.title}</div>
              <p className="text-sm leading-relaxed flex-1">{item.description}</p>
            </div>

            {/* arrow */}
            <div className="text-3xl mt-4">
              <RxArrowTopRight
                className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300"
                aria-hidden
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
