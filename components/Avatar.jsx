import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden lg:flex lg:max-w-none pointer-events-none select-none">
      <Image
        src="/SubjectOne.png"
        alt="Vipul Kaushik, Full-Stack Mobile Developer"
        width={724}
        height={638}
        sizes="(max-width: 960px) 0px, 600px"
        className="translate-z-0 w-full h-full"
        priority
      />
    </div>
  );
};

export default Avatar;
