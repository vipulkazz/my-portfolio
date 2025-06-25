import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonialData = [
  {
    name: "Client – Cross-platform Navigation App",
    position: "Founder",
    date: "May 16, 2024 – Sep 26, 2024",
    message:
      "Vipul never missed a deadline and always found a solution, no matter the challenge. He was proactive, thorough, and consistently delivered high-quality work — even beyond the contract. Highly recommended if you're building your first app!",
  },
  {
    name: "Client – Product Design System",
    position: "Startup Designer",
    date: "Jan 6, 2025 – Jan 14, 2025",
    message:
      "Great experience! Delivered a high-quality design system for our React Native app with precision and speed.",
  },
  {
    name: "Client – Full-Stack Mobile App",
    position: "Tech Lead",
    date: "Nov 6, 2024 – May 12, 2025",
    message:
      "Skilled, responsive, and quick to solve problems. Vipul handled both frontend and backend seamlessly. Would definitely work with him again.",
  },
  {
    name: "Client – Mobile App Strategy",
    position: "Product Manager",
    date: "Dec 20, 2024 – Jun 10, 2025",
    message:
      "Vipul and his team provided critical insight into our development strategy and solved complex bugs efficiently. We'll continue working with him for years to come.",
  },
  {
    name: "Client – SDK Update",
    position: "Project Owner",
    date: "Feb 4, 2024 – Feb 7, 2024",
    message:
      "Outstanding communication and flawless execution. Completed the task quickly and exactly as needed. AAA+++ experience!",
  },
  {
    name: "Client – AI App",
    position: "Founder",
    date: "Feb 7, 2024 – Feb 11, 2024",
    message:
      "Excellent developer with great communication, strong analytic skills, and high attention to detail. Highly recommended.",
  },
];


const TestimonialSlider = () => {
  return (
    <Swiper
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="h-[480px] sm:h-[520px]"
    >
      {testimonialData.map((person, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center md:flex-row gap-x-8 h-full px-16">
            {/* name, position, date */}
            <div className="w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0">
              <div className="flex flex-col justify-center text-center">
                {/* name */}
                <div className="text-base sm:text-lg font-semibold mb-2">{person.name}</div>

                {/* position */}
                <div className="text-[12px] uppercase font-extralight tracking-widest mb-3">
                  {person.position}
                </div>

                {/* date */}
                <div className="text-sm text-accent font-medium">
                  {person.date}
                </div>
              </div>
            </div>

            {/* quote & message */}
            <div className="flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pl-20">
              {/* quote icon */}
              <div className="mb-4">
                <FaQuoteLeft
                  className="text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0"
                  aria-aria-hidden
                />
              </div>

              {/* message */}
              <div className="xl:text-lg text-center md:text-left">
                {person.message}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
