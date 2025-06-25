import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const workSlides = {
  slides: [
    {
      images: [
        {
          title: "AFA",
          path: "/AFA.png",
          link: "https://apps.apple.com/my/app/afa-sports-venue-booking-app/id1526420132",
        },
        {
          title: "Rolling Around",
          path: "/rollingaround.png",
          link: "https://apps.apple.com/us/app/rolling-around/id6670560695",
        },
        {
          title: "Pineapple",
          path: "/Pineapple.png",
          link: "https://apps.apple.com/ca/app/pineapple-malaysia/id1626465032",
        },
        {
          title: "Everyone",
          path: "/everyone.png",
          link: "https://apps.apple.com/in/app/everyone/id6745819961", // iOS link not found
        },
      ],
    },
    {
      images: [
        {
          title: "Yodi",
          path: "/yodi.png",
          link: "https://apps.apple.com/us/app/pairs-yodi-relationship-coach/id6464098174",
        },
        {
          title: "Nooora",
          path: "/nooora.png",
          link: "https://nooora.ae",
        },
        {
          title: "Penny",
          path: "/penny.png",
          link: "https://apps.apple.com/in/app/pennyprofit/id1641343370",
        },
        {
          title: "Opirescue",
          path: "/opirescue.png",
          link: "https://apps.apple.com/in/app/opirescue/id1018614161",
        },
      ],
    },
  ],
};

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="h-[320px] sm:h-[500px]"
    >
      {workSlides.slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="grid grid-cols-2 grid-rows-2 gap-2 xl:gap-4 h-full">
            {slide.images.map((image, imageI) => (
              <div
                className="relative rounded-lg overflow-hidden flex items-center justify-center group h-[120px] sm:h-[180px] xl:h-[200px]"
                key={imageI}
              >
                <div className="flex items-center justify-center relative overflow-hidden group w-full h-full">
                  {/* image */}
                  <Image
                    src={image.path}
                    alt={image.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />

                  {/* overlay gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700"
                    aria-hidden
                  />

                  {/* title */}
                  <div className="absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300">
                    <Link
                      href={image.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-x-2 text-[13px] tracking-[0.2em]"
                    >
                      {/* title part 1 */}
                      <div className="delay-100">LIVE</div>
                      {/* title part 2 */}
                      <div className="translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                        PROJECT
                      </div>
                      {/* icon */}
                      <div className="text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                        <BsArrowRight aria-hidden />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WorkSlider;
