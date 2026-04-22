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
          title: "Rolling Around",
          path: "/projects/rollingaround-og.png",
          link: "https://rollingaround.app",
        },
        {
          title: "BatchLeads",
          path: "/projects/batchleads.png",
          link: "https://batchleads.io",
        },
        {
          title: "Penny Profit",
          path: "/projects/pennyprofit.png",
          link: "https://www.mypennyprofit.com/",
        },
        {
          title: "Jardinette",
          path: "/projects/jardinette.webp",
          link: "https://app.jardinette.ca",
        },
      ],
    },
    {
      images: [
        {
          title: "MOBE",
          path: "/projects/mobe.webp",
          link: "https://play.google.com/store/apps/details?id=com.keymouseit.mobe",
        },
        {
          title: "Passion TV",
          path: "/projects/passiontv.webp",
          link: "https://play.google.com/store/apps/details?id=com.passionpulse",
        },
        {
          title: "Outlier",
          path: "/projects/outlier.png",
          link: "https://www.outlier.org",
        },
        {
          title: "Pipeline CRM",
          path: "/projects/pipeline.png",
          link: "https://www.pipelinecrm.com",
        },
      ],
    },
    {
      images: [
        {
          title: "Authorify",
          path: "/projects/authorify.png",
          link: "https://www.authorify.com",
        },
        {
          title: "Nooora",
          path: "/projects/nooora-web.png",
          link: "https://nooora.ae",
        },
        {
          title: "Chill Days",
          path: "/projects/chilldays.png",
          link: "https://chilldays.com/",
        },
        {
          title: "Mission Efficiency",
          path: "/projects/mission-efficiency.png",
          link: "https://missionefficiency.org/",
        },
      ],
    },
    {
      images: [
        {
          title: "AFA",
          path: "/projects/afa-web.png",
          link: "https://www.afa.community/",
        },
        {
          title: "Pineapple",
          path: "/projects/pineapple-web.jpg",
          link: "https://pineappleresources.com.my/",
        },
        {
          title: "Munchh",
          path: "/projects/munchh.png",
          link: "https://apps.apple.com/zm/app/munchh/id1192257941",
        },
        {
          title: "KidAdvisor",
          path: "/projects/kidadvisor.webp",
          link: "https://kidadvisor.ca",
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
                    alt={`Screenshot of ${image.title} project`}
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
                      aria-label={`View live ${image.title} project (opens in new tab)`}
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
