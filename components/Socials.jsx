import Link from "next/link";

import {
  RiYoutubeLine,
  RiInstagramLine,
  RiFacebookLine,
  RiDribbbleLine,
  RiGithubLine,
  RiLinkedinLine,
} from "react-icons/ri";
import { FaPatreon, FaPaypal } from "react-icons/fa";

export const socialData = [
  {
    name: "Instagram",
    link: "https://instagram.com/vipul_kaushik",
    Icon: RiInstagramLine,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/vipul-kaushik/",
    Icon: RiLinkedinLine,
  },
  {
    name: "Patreon",
    link: "https://www.patreon.com/c/VipulKaushik",
    Icon: FaPatreon,
  },
  {
    name: "PayPal",
    link: "https://paypal.me/vipulkaushik96 ",
    Icon: FaPaypal,
  },
  {
    name: "Github",
    link: "https://github.com/vipulkazz",
    Icon: RiGithubLine,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-3 xl:gap-x-5 text-base xl:text-lg">
      {socialData.map((social, i) => (
        <Link
          key={i}
          title={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer noopener"
          className={`${
            social.name === "Github"
              ? "bg-accent rounded-full p-[4px] xl:p-[5px] hover:text-white"
              : "hover:text-accent"
          } transition-all duration-300`}
        >
          <social.Icon aria-hidden />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
