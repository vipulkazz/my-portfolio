import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
import {
  FaCss3,
  FaFigma,
  FaHtml5,
  FaJs,
  FaReact,
  FaWordpress,
  FaGithub,
  FaFire,
} from "react-icons/fa";
import {
  SiAdobephotoshop,
  SiAdobexd,
  SiFramer,
  SiNextdotjs,
  SiReact,
  SiExpo,
  SiRedux,
  SiZustand,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiGraphql,
  SiSupabase,
  SiStrapi,
  SiFastlane,
  SiBitrise,
  SiGithubactions,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { BiNotification } from "react-icons/bi";
import { MdAnimation, MdBugReport } from "react-icons/md";

import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

// Icon mapping for skills
const iconMap = {
  "React Native": TbBrandReactNative,
  "Expo": SiExpo,
  "Redux": SiRedux,
  "Zustand": SiZustand,
  "Animations": MdAnimation,
  "Push Notifications": BiNotification,
  "Native Modules": SiReact,
  "App Store & Google Play Submission": FaReact,
  "Fastlane, Bitrise, GitHub Actions (CI/CD)": SiGithubactions,
  "Bug Fixes, Maintenance, App Refactoring": MdBugReport,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "MongoDB": SiMongodb,
  "Firebase": SiFirebase,
  "REST API": FaJs,
  "GraphQL": SiGraphql,
  "CI/CD": SiGithubactions,
  "Supabase": SiSupabase,
  "Strapi": SiStrapi,
};

//  data
export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Mobile Development",
        icons: [
         "React Native",
         "Expo",
         "Redux",
         "Zustand",
         "Animations",
         "Push Notifications",
         "Native Modules",
         "App Store & Google Play Submission",
         "Fastlane, Bitrise, GitHub Actions (CI/CD)",
         "Bug Fixes, Maintenance, App Refactoring"
        ],
      },
      {
        title: "Backend Development",
        icons: ["Node.js", "Express.js", "MongoDB", "Firebase", "REST API", "GraphQL", "CI/CD","Supabase","Strapi"],
      },
    ],
  },
  {
  "title": "experience",
  "info": [
    {
      "title": "Engineering Manager - Key Mouse IT, Pvt Ltd",
      "stage": "01 February, 2024 - Present"
    },
    {
      "title": "Technical Lead (React Native) - Segwitz Sdn Bhd (Malaysia Remote)",
      "stage": "09 November, 2020 - 30 January, 2024"
    },
    {
      "title": "React Native Developer - Addval Solutions Pvt Ltd (Mohali)",
      "stage": "January, 2018 - October, 2020"
    }
  ]
},
  {
  "title": "credentials",
  "info": [
    {
      "title": "PMP Exam Training & 35 PDUs – Simplilearn",
      "stage": "2025"
    }
  ]
}
];

const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="h-full bg-primary/30 py-32 text-center xl:text-left">
      <Circles />

      {/* avatar img */}
      {/* <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[370px]"
      >
        <Avatar />
      </motion.div> */}

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
            Captivating <span className="text-accent">stories</span> birth
            magnificent designs.
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
          >
            8 years ago, I begin as a react native developer. Since then, I've
            done remote work for agencies, consulted for startups, and
            collabrated on digital products for business and consumer use.
          </motion.p>

          {/* counters */}
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-x-6">
              {/* experience */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={8} duration={5} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Years of experience.
                </div>
              </div>

              {/* clients */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={50} duration={5} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Satisfied clients.
                </div>
              </div>

              {/* projects */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={30} duration={5} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Finished projects.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* info */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] h-[480px]"
        >
          <div className="flex gap-x-2 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemI) => (
              <div
                key={itemI}
                className={`${
                  index === itemI &&
                  "text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300"
                } cursor-pointer capitalize text-sm xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0 px-2 xl:px-4 py-2`}
                onClick={() => setIndex(itemI)}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
            {aboutData[index].info.map((item, itemI) => (
              <div
                key={itemI}
                className="flex-1 flex flex-col max-w-full gap-y-2 text-center xl:text-left text-white/60 px-4 xl:px-0"
              >
                {/* title */}
                <div className="font-light text-sm xl:text-base break-words">{item.title}</div>
                
                {/* stage if exists */}
                {item.stage && (
                  <div className="flex flex-col xl:flex-row items-center gap-x-2 text-sm xl:text-base">
                    <div className="hidden xl:flex">-</div>
                    <div className="break-words">{item.stage}</div>
                  </div>
                )}

                {/* icons */}
                {item.icons && (
                  <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center xl:justify-start">
                    {item.icons.map((iconName, iconI) => {
                      const IconComponent = iconMap[iconName];
                      return IconComponent ? (
                        <div key={iconI} className="text-xl xl:text-2xl text-white" title={iconName}>
                          <IconComponent />
                        </div>
                      ) : (
                        <div key={iconI} className="text-xs xl:text-sm text-white/60 px-2 py-1 bg-white/10 rounded">
                          {iconName}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
