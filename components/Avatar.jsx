import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden lg:flex lg:max-w-none pointer-events-none select-none">
      <Image
        src="/SubjectOne.png"
        alt="avatar"
        width={737}
        height={678}
        className="translate-z-0 w-full h-full"
      />
    </div>
  );
};

export default Avatar;
